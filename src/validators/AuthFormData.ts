import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import ValidatorBase from '@validators/ValidatorBase';
import ValidatorInterface from '@validators/ValidatorInterface';

export default class AuthFormData extends ValidatorBase implements ValidatorInterface {
    @IsNotEmpty()
    @IsString()
    clientId: string;

    @IsNotEmpty()
    @IsString()
    clientSecret: string;

    @IsOptional()
    @IsString()
    scopes: string;
}
