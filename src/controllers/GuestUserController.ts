import * as e from 'express';
import { Controller, Get, Next, Request, Response } from '@decorators/express';
import { AuthenticateMiddleware } from '../middleware/AuthenticateMiddleware';
import { createUser } from '@auth/AppUser';

@Controller('/guest-user')
export class GuestUserController {
    @Get('/login')
    async login(@Request() req: e.Request, @Response() res: e.Response) {
        if (req.session.user) {
            await req.flash('info', 'You already have a secure session');
            res.redirect('/');
        } else {
            req.session.user = createUser();
            await req.flash('success', 'Secure session established');
            res.redirect('/');
        }
    }

    @Get('/logout', [AuthenticateMiddleware])
    async logout(@Request() req: e.Request, @Response() res: e.Response, @Next() next: e.NextFunction) {
        req.session.regenerate(async error => {
            if (error) return next(error);
            await req.flash('success', 'Secure session cleared');
            res.redirect('/');
        });
    }
}
