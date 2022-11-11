import ModularAuthInterface from '@services/modular-auth/ModularAuthInterface';
import AuthFormData from '@validators/AuthFormData';
import * as PinterestPassport from 'passport-pinterest';

import ModularAuthBase from '@services/modular-auth/adapters/ModularAuthBase';
import { Profile, Strategy } from 'passport';
import { Request } from 'express';
import { isString } from 'lodash';

export default class PinterestModularAuth extends ModularAuthBase implements ModularAuthInterface {
    key = 'pinterest';
    name = 'Pinterest';
    defaultScopes = 'read_public, read_relationships';
    description =
        'Pinterest is an image sharing and social media service designed to enable saving and discovery of information on the internet using images, and on a smaller scale, animated GIFs and videos, in the form of pinboards.';

    buildStrategy(params: AuthFormData): Strategy {
        const strategyClass = PinterestPassport.Strategy;

        const options: PinterestPassport.StrategyOptionsWithRequest = {
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
            done: PinterestPassport.VerifyCallback,
        ) => {
            done(null, this.buildModularAuthResponse(accessToken, refreshToken, profile));
        };

        return new strategyClass(options, verify);
    }
}
