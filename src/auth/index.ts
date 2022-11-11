import passport from 'passport';
import { Application } from 'express';

export const applyAuth = (app: Application) => {
    passport.serializeUser((user, cb) => {
        console.log('serializeUser', user);
        cb(null, user);
    });
    passport.deserializeUser((user, cb) => {
        console.log('deserializeUser', user);
        cb(null, user);
    });
    app.use((req, res, next) => {
        req.passport = passport;
        res.locals.currentUser = req.session.user;
        next();
    });
    app.use(passport.initialize());
    app.use(passport.session());
};
