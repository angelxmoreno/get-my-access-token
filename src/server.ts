import { useExpressServer } from 'routing-controllers';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { applyAuth, authorizationChecker, currentUserChecker } from '@auth/index';
import CustomErrorHandler from '@server/CustomErrorHandler';
import { registerView } from './views/engine';

const server = express();
server.use(compression());
server.use(cors());
registerView(server);

applyAuth(server);
useExpressServer(server, {
    authorizationChecker,
    currentUserChecker,
    controllers: [__dirname + '/controllers/*Controller.{js,ts}'],
    defaultErrorHandler: false,
    middlewares: [CustomErrorHandler],
    classTransformer: true,
    validation: true,
    defaults: {
        paramOptions: {
            required: true,
        },
    },
});

export default server;
