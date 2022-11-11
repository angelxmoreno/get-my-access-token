import { Middleware } from '@decorators/express';
import { NextFunction, Request, Response } from 'express';

export class AuthenticateMiddleware implements Middleware {
    public async use(request: Request, response: Response, next: NextFunction) {
        if (request.session.user) {
            request.user = request.session.user;
            next();
        } else {
            await request.flash('error', 'You must create a secure session first');
            response.redirect('/');
        }
    }
}
