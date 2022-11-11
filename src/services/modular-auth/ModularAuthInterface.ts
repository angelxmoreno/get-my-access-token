import { Strategy } from 'passport';
import AuthFormData from '@validators/AuthFormData';
import { Request, Response } from 'express';

export default interface ModularAuthInterface {
    key: string;
    name: string;
    description: string;
    defaultScopes: string;
    callbackURL: string;
    authenticateUrl: string;
    formUrl: string;
    buildStrategy: (params: AuthFormData) => Strategy;
    authenticate: (request: Request, response: Response) => Promise<ModularAuthResponse>;
}

export type ModularAuthClass = { new (): ModularAuthInterface };

export type ModularAuthResponse = {
    accessToken: string;
    refreshToken?: string;
    identifier: string;
    name?: string;
    email?: string;
};
