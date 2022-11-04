import Env from '@utils/Env';

export default {
    node: {
        baseUrl: Env.asString('BASE_URL'),
        port: Env.asNumber('PORT'),
    },
    sessionSecret: Env.asString('SESSION_SECRET'),
    auth: {
        passport: {
            callbackBaseUrl: Env.asString('CALLBACK_BASE_URL'),
            strategies: {
                google: {
                    clientID: Env.asString('GOOGLE_CLIENT_ID'),
                    clientSecret: Env.asString('GOOGLE_CLIENT_SECRET'),
                },
                facebook: {
                    clientID: Env.asString('FACEBOOK_CLIENT_ID'),
                    clientSecret: Env.asString('FACEBOOK_CLIENT_SECRET'),
                },
            },
        },
    },
    redis: {
        url: Env.asString('REDIS_URL'),
    },
};
