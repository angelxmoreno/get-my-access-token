import { ValidationError, ValidatorOptions } from 'class-validator';
import { ClassTransformOptions } from 'class-transformer';

export default interface ValidatorInterface {
    validatorOptions?: ValidatorOptions;
    transformOptions?: ClassTransformOptions;
}

export class ValidatedObject<T> {
    target: T;
    errors: ValidationError[];

    constructor(target: T, errors: ValidationError[] = []) {
        this.target = target;
        this.errors = errors;
    }

    get hasErrors() {
        return this.errors.length > 0;
    }
}
