import 'reflect-metadata';
import appConfig from '@config/index';
import { createServer } from './server';

const PORT = appConfig.node.port;
const BASE_URL = appConfig.node.baseUrl;
console.time('serverStart');
(async () => {
    createServer(PORT, () => {
        console.info(`Starting server on ${BASE_URL}`);
    });
})()
    .then(() => console.timeEnd('serverStart'))
    .catch(console.error);
