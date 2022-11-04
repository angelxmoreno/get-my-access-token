import passport from 'passport';
import { Application } from 'express';
import { AuthorizationChecker } from 'routing-controllers/types/AuthorizationChecker';
import { CurrentUserChecker } from 'routing-controllers/types/CurrentUserChecker';
import { Action } from 'routing-controllers';
import guestUserStrategy from '@auth/guestUserStrategy';

export const authorizationChecker: AuthorizationChecker = async ({ request }: Action, roles: string[]) => {
    return new Promise(resolve => {
        passport.authenticate('guest-user', { session: true }, (w, user, error) => {
            request.session.user = user;
            if (!user || error) resolve(false);
            if (!!user && (roles.length === 0 || roles.includes(user.role))) resolve(true);
        })(request);
    });
};

export const currentUserChecker: CurrentUserChecker = async ({ request }: Action) => {
    return !!request.session.user ? request.session.user : false;
};

export const applyAuth = (app: Application) => {
    passport.use('guest-user', guestUserStrategy);

    app.use(passport.initialize());
    app.use(passport.session());
};
