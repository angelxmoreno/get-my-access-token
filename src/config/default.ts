import Env from '@utils/Env';
import { ModularAuthClass } from '@services/modular-auth/ModularAuthInterface';
import FacebookModularAuth from '@services/modular-auth/adapters/FacebookModularAuth';
import GoogleModularAuth from '@services/modular-auth/adapters/GoogleModularAuth';
import PinterestModularAuth from '@services/modular-auth/adapters/PinterestModularAuth';

const modularClasses: ModularAuthClass[] = [GoogleModularAuth, FacebookModularAuth, PinterestModularAuth];

export default {
    node: {
        host: Env.asString('HOST'),
        port: Env.asNumber('PORT'),
        baseUrl: `${Env.asString('HOST')}:${Env.asString('PORT')}`,
    },
    sessionSecret: Env.asString('SESSION_SECRET'),
    modularClasses,
};
