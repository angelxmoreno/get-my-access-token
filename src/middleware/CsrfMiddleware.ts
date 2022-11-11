import { Middleware } from '@decorators/express';
import { NextFunction, Request, Response } from 'express';
import Tokens from 'csrf';

const tokens = new Tokens();

const generateCsrfToken = async (req: Request): Promise<string> => {
    const secret = await tokens.secret();
    req.session.csrfSecret = secret;

    return tokens.create(secret);
};

const verifyCsrfToken = async (req: Request): Promise<boolean> => {
    const secret = req.session.csrfSecret;
    const token = req.body._csrf;

    return tokens.verify(secret, token);
};

export class CsrfMiddleware implements Middleware {
    public async use(request: Request, response: Response, next: NextFunction): Promise<unknown> {
        if (request.method !== 'POST' || (await verifyCsrfToken(request))) {
            request.generateCsrfToken = () => generateCsrfToken(request);
            return next();
        }

        await request.flash('error', 'Error submitting your data. Please try again');
        return response.status(403).redirect(request.header('referer'));
    }
}
