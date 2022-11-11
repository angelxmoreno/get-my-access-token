import appConfig from '@config/index';
import { Request, Response } from 'express';
import { Profile, Strategy } from 'passport';
import ModularAuthInterface, { ModularAuthResponse } from '@services/modular-auth/ModularAuthInterface';
import { isArray } from 'lodash';
import AuthFormData from '@validators/AuthFormData';

export default abstract class ModularAuthBase implements ModularAuthInterface {
    name: string;
    description: string;
    key: string;
    defaultScopes: string;

    buildStrategy(params: AuthFormData): Strategy {
        throw new Error(`not implemented ${params}`);
    }

    get callbackURL() {
        return `${appConfig.node.baseUrl}/auth/callback/${this.key}`;
    }

    get authenticateUrl() {
        return `${appConfig.node.baseUrl}/auth/authenticate/${this.key}`;
    }

    get formUrl() {
        return `${appConfig.node.baseUrl}/auth/form/${this.key}`;
    }

    buildModularAuthResponse(accessToken: string, refreshToken: string, profile: Profile): ModularAuthResponse {
        return {
            accessToken,
            refreshToken,
            identifier: profile.id,
            name: profile.displayName,
            email: isArray(profile.emails) ? profile.emails.pop().value : profile.emails,
        };
    }

    async authenticate(request: Request, response: Response): Promise<ModularAuthResponse> {
        return new Promise((resolve, reject) => {
            try {
                const passport = request.passport;
                const params = request.session.modularAuthParams[this.key];
                const strategy = this.buildStrategy(params);

                request.session.modularAuthParams = undefined;

                passport.use(this.key, strategy);
                passport.authenticate(this.key, { session: true }, async (error, authResponse) => {
                    if (error) return reject(error);

                    return resolve(authResponse);
                })(request, response);
            } catch (error) {
                reject(error);
            }
        });
    }
}
