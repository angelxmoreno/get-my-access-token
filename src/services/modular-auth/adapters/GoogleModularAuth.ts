import ModularAuthInterface from '@services/modular-auth/ModularAuthInterface';
import AuthFormData from '@validators/AuthFormData';
import * as GooglePassport from 'passport-google-oauth20';

import ModularAuthBase from '@services/modular-auth/adapters/ModularAuthBase';
import { Profile, Strategy } from 'passport';
import { Request } from 'express';
import { isString } from 'lodash';

export default class GoogleModularAuth extends ModularAuthBase implements ModularAuthInterface {
    key = 'google';
    name = 'Google';
    defaultScopes = 'email,profile';
    description =
        'Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics.';

    buildStrategy(params: AuthFormData): Strategy {
        const strategyClass = GooglePassport.Strategy;

        const options: GooglePassport.StrategyOptionsWithRequest = {
            clientID: params.clientId,
            clientSecret: params.clientSecret,
            callbackURL: this.callbackURL,
            passReqToCallback: true,
            scope: isString(params.scopes) ? params.scopes.split(',') : params.scopes,
            state: true,
        };

        const verify = (
            req: Request,
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: GooglePassport.VerifyCallback,
        ) => {
            done(null, this.buildModularAuthResponse(accessToken, refreshToken, profile));
        };

        return new strategyClass(options, verify);
    }
}
