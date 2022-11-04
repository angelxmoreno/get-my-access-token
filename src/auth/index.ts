import passport, { AuthenticateOptions } from 'passport';
import express, { Application, Request, Response } from 'express';
import { AuthorizationChecker } from 'routing-controllers/types/AuthorizationChecker';
import { CurrentUserChecker } from 'routing-controllers/types/CurrentUserChecker';
import { Action } from 'routing-controllers';

export const authorizationChecker: AuthorizationChecker = async ({ request }: Action, roles: string[]) => {
    return new Promise(resolve => {
        passport.authenticate('jwt', { session: false }, (w, user, error) => {
            request.user = user;
            if (!user || error) resolve(false);
            if (!!user && (roles.length === 0 || roles.includes(user.role))) resolve(true);
        })(request);
    });
};

export const currentUserChecker: CurrentUserChecker = async ({ request }: Action) => {
    return !!request.user ? request.user : false;
};

const afterCallback = ({ user }: Request, res: Response) => {
    res.send({
        success: true,
        code: 200,
        content: user,
    });
};

export const applyAuth = (app: Application) => {
    const routes = express();

    const strategies = {};

    const options: AuthenticateOptions = { session: false };
    Object.entries(strategies).forEach(([name, strategy]) => {
        const path = `/auth/${name}`;
        routes.get(path + '/callback', passport.authenticate(name, options), afterCallback);
        routes.get(path, passport.authenticate(name, options), afterCallback);
        console.log({ strategy });
        //passport.use(strategy);
    });

    app.use(passport.initialize());
    app.use(routes);
};
