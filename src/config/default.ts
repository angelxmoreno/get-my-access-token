import env from '@utils/Env';

export default {
    node: {
        baseUrl: env.asString('BASE_URL'),
        port: env.asNumber('PORT'),
    },
    auth: {
        passport: {
            callbackBaseUrl: env.asString('CALLBACK_BASE_URL'),
            strategies: {
                google: {
                    clientID: env.asString('GOOGLE_CLIENT_ID'),
                    clientSecret: env.asString('GOOGLE_CLIENT_SECRET'),
                },
                facebook: {
                    clientID: env.asString('FACEBOOK_CLIENT_ID'),
                    clientSecret: env.asString('FACEBOOK_CLIENT_SECRET'),
                },
            },
        },
    },
    redis: {
        url: env.asString('REDIS_URL'),
    },
};