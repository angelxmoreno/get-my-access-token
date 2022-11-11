import express from 'express';
import compression from 'compression';
import { applyAuth } from '@auth/index';
import applySession from '@utils/session/applySession';
import logger from 'morgan';
import { flash } from 'express-flash-message';
import { registerView } from '@views/engine';
import { attachControllers } from '@decorators/express';
import { IndexController } from '@controllers/IndexController';
import { AuthController } from '@controllers/AuthController';
import https, { ServerOptions } from 'https';
import fs from 'fs';
import { GuestUserController } from '@controllers/GuestUserController';

const server = express();

applySession(server);
applyAuth(server);
server.use(compression());
server.use(logger('combined'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

registerView(server);

server.use(flash({ sessionKeyName: 'flashMessage', useCookieSession: false }));
server.use(async (req, res, next) => {
    res.locals.flashMessages = [];
    const promises = ['info', 'success', 'error', 'warning'].map(async type => {
        const messages = await req.consumeFlash(type);
        messages.forEach(message => res.locals.flashMessages.push({ type, message }));
    });
    await Promise.all(promises);
    next();
});

attachControllers(server, [IndexController, AuthController, GuestUserController]);

export const createServer = (port, cb) => {
    const options: ServerOptions = {
        key: fs.readFileSync('./certs/key.pem'),
        cert: fs.readFileSync('./certs/cert.pem'),
        passphrase: 'somerandom123',
    };
    const httpServer = https.createServer(options, server);
    httpServer.once('listening', () => cb());
    httpServer.listen(port);
};
export default server;
