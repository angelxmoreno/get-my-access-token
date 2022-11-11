import { Middleware } from '@decorators/express';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { AppUser } from '@auth/AppUser';

export class AuthenticateMiddleware implements Middleware {
    public use(request: Request, response: Response, next: NextFunction): void {
        passport.authenticate('guest-user', { session: true }, (w, user: AppUser, error) => {
            if (user) {
                request.session.user = user;
                next();
            } else {
                next(error);
            }
        })(request);
    }
}
