import { useExpressServer } from 'routing-controllers';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { applyAuth, authorizationChecker, currentUserChecker } from '@auth/index';
import CustomErrorHandler from '@server/CustomErrorHandler';

const server = express();
server.use(compression());
server.use(cors());
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
