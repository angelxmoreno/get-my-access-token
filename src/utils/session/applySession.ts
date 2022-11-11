import { Application } from 'express';
import session, { MemoryStore, SessionOptions } from 'express-session';
import appConfig from '@config/index';
import Env from '@utils/Env';
import session_file_store, { Options } from 'session-file-store';

const applySession = (server: Application) => {
    const FileStore = session_file_store(session);
    const fileStoreOptions: Options = {
        path: './sessions',
        secret: appConfig.sessionSecret,
        fileExtension: '.json',
    };

    const sessionStore = Env.isDev() ? new FileStore(fileStoreOptions) : new MemoryStore();
    const sessionOptions: SessionOptions = {
        store: sessionStore,
        secret: appConfig.sessionSecret,
        resave: true,
        saveUninitialized: true,
        cookie: { secure: true },
    };

    server.set('trust proxy', 1);
    server.use(session(sessionOptions));
};

export default applySession;
