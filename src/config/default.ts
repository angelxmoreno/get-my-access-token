import Env from '@utils/Env';
import ModularAuthInterface from '@services/modular-auth/ModularAuthInterface';

const modularAuth: ModularAuthInterface[] = [
    {
        key: 'google',
        name: 'Google',
        description:
            'Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics',
        passportParams: [
            {
                name: 'clientId',
                type: 'string',
                validation: [],
            },
        ],
    },
    {
        key: 'facebook',
        name: 'Facebook',
        description:
            'Facebook is an online social media and social networking service owned by American company Meta Platforms.',
        passportParams: [
            {
                name: 'clientId',
                type: 'string',
                validation: [],
            },
        ],
    },
    {
        key: 'pinterest',
        name: 'Pinterest',
        description:
            'Pinterest is an image sharing and social media service designed to enable saving and discovery of information on the internet using images, and on a smaller scale, animated GIFs and videos, in the form of pinboards.',
        passportParams: [
            {
                name: 'clientId',
                type: 'string',
                validation: [],
            },
        ],
    },
];
export default {
    node: {
        baseUrl: Env.asString('BASE_URL'),
        port: Env.asNumber('PORT'),
    },
    sessionSecret: Env.asString('SESSION_SECRET'),
    modularAuth,
};
