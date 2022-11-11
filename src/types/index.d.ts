import { AppUser } from '@auth/AppUser';
import { PassportStatic } from 'passport';
import AppSessionData from '@utils/session/AppSessionData';

declare global {
    export type ClassType<T> = new (...args: unknown[]) => T;

    namespace Express {
        type User = AppUser;
        interface Request {
            passport: PassportStatic;
            generateCsrfToken: () => Promise<string>;
        }
    }
}

declare module 'express-session' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface SessionData extends AppSessionData {}
}
export {};
