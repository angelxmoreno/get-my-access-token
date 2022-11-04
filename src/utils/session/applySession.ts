import { Application } from 'express';
import session, { MemoryStore, SessionOptions } from 'express-session';
import appConfig from '@config/index';
import Env from '@utils/Env';
import session_file_store, { Options } from 'session-file-store';

const applySession = (server: Application) => {
    const makeSecure = !Env.isDev();

    const FileStore = session_file_store(session);
    const fileStoreOptions: Options = {
        path: './sessions',
        secret: appConfig.sessionSecret,
        fileExtension: '.json',
    };

    const sessionStore = makeSecure ? new MemoryStore() : new FileStore(fileStoreOptions);
    const sessionOptions: SessionOptions = {
        store: sessionStore,
        secret: appConfig.sessionSecret,
        resave: true,
        saveUninitialized: false,
        cookie: { secure: makeSecure },
    };

    server.set('trust proxy', makeSecure ? 1 : 0);
    server.use(session(sessionOptions));
};

export default applySession;
