import ValidatorInterface from '@validators/ValidatorInterface';
import { ClassTransformOptions } from 'class-transformer/types/interfaces/class-transformer-options.interface';
import { ValidatorOptions } from 'class-validator';

export default abstract class ValidatorBase implements ValidatorInterface {
    transformOptions: ClassTransformOptions = {};
    validatorOptions: ValidatorOptions = {
        whitelist: true,
        forbidNonWhitelisted: false,
    };
}
