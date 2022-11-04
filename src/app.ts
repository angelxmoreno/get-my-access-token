import 'reflect-metadata';
import appConfig from '@config/index';
import server from './server';

const PORT = appConfig.node.port;
const BASE_URL = appConfig.node.baseUrl;
console.time('serverStart');
(async () => {
    server.listen(PORT, () => {
        console.info(`Starting server on ${BASE_URL}:${PORT}`);
    });
})()
    .then(() => console.timeEnd('serverStart'))
    .catch(console.error);
