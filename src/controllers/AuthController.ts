import ModularAuthCollection from '@services/modular-auth/ModularAuthCollection';
import AuthFormData from '@validators/AuthFormData';
import ValidationReportBuilder from '@validators/ValidationReportBuilder';
import ModularAuthInterface from '@services/modular-auth/ModularAuthInterface';
import * as e from 'express';
import { Controller, Get, Post, Request, Response } from '@decorators/express';
import { AuthenticateMiddleware } from '../middleware/AuthenticateMiddleware';
import { ValidatedObject } from '@validators/ValidatorInterface';
import BodyValidatorMiddleware from '../middleware/BodyValidatorMiddleware';
import { CsrfMiddleware } from '../middleware/CsrfMiddleware';

@Controller('/auth')
export class AuthController {
    @Get('/form/:authKey', [AuthenticateMiddleware, CsrfMiddleware])
    async authForm(@Request() req: e.Request, @Response() res: e.Response) {
        const modularAuth = this.getModularAuthFromRequest(req);
        const validation = req.session.validation;
        const errors = validation?.errors;
        const postData = validation?.data || {
            clientId: '',
            clientSecret: '',
            callbackUrl: modularAuth.callbackURL,
            scopes: modularAuth.defaultScopes,
        };
        const csrfToken = await req.generateCsrfToken();
        req.session.validation = undefined;
        const responseBody = {
            modularAuth,
            postData,
            errors,
            csrfToken,
        };

        return res.render('authForm', responseBody);
    }

    @Post('/form-verify/:authKey', [AuthenticateMiddleware, CsrfMiddleware, BodyValidatorMiddleware(AuthFormData)])
    async authFormVerify(@Request() req: e.Request, @Response() res: e.Response) {
        const modularAuth = this.getModularAuthFromRequest(req);
        const validatedAuthForm: ValidatedObject<AuthFormData> = req.body;
        const validator = new ValidationReportBuilder(validatedAuthForm);
        const sess = req.session;

        if (validator.hasErrors) {
            await req.flash('error', 'Error: can not submit!');
            sess.validation = {
                errors: validator.report,
                data: validator.data,
            };
            return res.redirect(modularAuth.formUrl);
        } else {
            sess.modularAuthParams = sess.modularAuthParams || {};
            sess.modularAuthParams[this.getModularAuthKeyRequest(req)] = validatedAuthForm.target;
            return res.redirect(modularAuth.authenticateUrl);
        }
    }

    @Get('/callback/:authKey')
    @Get('/authenticate/:authKey')
    async authenticate(@Request() req: e.Request, @Response() res: e.Response) {
        try {
            const authResponse = await this.getModularAuthFromRequest(req).authenticate(req, res);
            return res.render('authResponse', {
                postData: {
                    accessToken: authResponse.accessToken,
                    refreshToken: authResponse.refreshToken,
                    id: authResponse.identifier,
                    name: authResponse.name,
                    email: authResponse.email,
                },
            });
        } catch (error) {
            await req.flash('error', error.message);
            if (!res.headersSent) {
                return res.redirect(this.getModularAuthFromRequest(req).formUrl);
            }
        }
    }

    getModularAuthKeyRequest(req: e.Request): string {
        const { authKey } = req.params;
        if (!authKey) {
            throw new Error(`Unable to determine "authKey"`);
        }

        return authKey;
    }

    getModularAuthFromRequest(req: e.Request): ModularAuthInterface {
        const authKey = this.getModularAuthKeyRequest(req);
        const modularAuth = ModularAuthCollection.get(authKey);
        if (!modularAuth) throw new Error(`"${authKey}" is not configured in app`);

        return modularAuth;
    }
}
