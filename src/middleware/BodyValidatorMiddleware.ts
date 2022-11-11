import { Middleware } from '@decorators/express';
import { NextFunction, Request, Response } from 'express';
import { validate, ValidatorOptions } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ClassTransformOptions } from 'class-transformer/types/interfaces/class-transformer-options.interface';
import ValidatorInterface, { ValidatedObject } from '@validators/ValidatorInterface';

const BodyValidatorMiddleware = <T extends ValidatorInterface>(
    validationClass: ClassType<T>,
    validatorOptionsOverride?: ValidatorOptions,
    transformOptionsOverride?: ClassTransformOptions,
) =>
    class implements Middleware {
        public use(request: Request, response: Response, next: NextFunction): void {
            const validator = new validationClass();

            const validatorOptions = {
                ...validator.validatorOptions,
                ...validatorOptionsOverride,
            };
            const transformOptions = {
                ...validator.transformOptions,
                ...transformOptionsOverride,
            };

            const instance = plainToInstance(validationClass, request.body, transformOptions);
            validate(instance, validatorOptions).then(errors => {
                request.body = new ValidatedObject<T>(instance, errors);
                next();
            });
        }
    };

export default BodyValidatorMiddleware;
