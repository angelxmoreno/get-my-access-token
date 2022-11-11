import ModularAuthInterface from '@services/modular-auth/ModularAuthInterface';
import AuthFormData from '@validators/AuthFormData';
import * as FacebookPassport from 'passport-facebook';
import ModularAuthBase from '@services/modular-auth/adapters/ModularAuthBase';
import { Strategy } from 'passport';

export default class FacebookModularAuth extends ModularAuthBase implements ModularAuthInterface {
    key = 'facebook';
    name = 'Facebook';
    defaultScopes = '';
    description =
        'Facebook is an online social media and social networking service owned by American company Meta Platforms.';

    buildStrategy(params: AuthFormData): Strategy {
        const strategyClass = FacebookPassport.Strategy;

        const options: FacebookPassport.StrategyOptionWithRequest = {
            clientID: params.clientId,
            clientSecret: params.clientSecret,
            callbackURL: this.callbackURL,
            passReqToCallback: true,
        };

        const verify: FacebookPassport.VerifyFunctionWithRequest = (req, accessToken, refreshToken, profile, done) => {
            done(null, this.buildModularAuthResponse(accessToken, refreshToken, profile));
        };

        return new strategyClass(options, verify);
    }
}
