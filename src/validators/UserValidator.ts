import ValidatorInterface from '@validators/ValidatorInterface';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import ValidatorBase from '@validators/ValidatorBase';

export default class UserValidator extends ValidatorBase implements ValidatorInterface {
    @IsString()
    name: string;

    @IsOptional()
    @IsInt()
    age: number;

    @IsOptional()
    @IsDate()
    dob: Date;
}
