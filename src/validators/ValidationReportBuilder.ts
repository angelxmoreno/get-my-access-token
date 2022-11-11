import { ValidationError } from 'class-validator';
import { ValidatedObject } from '@validators/ValidatorInterface';

type ValidationReportItem = {
    isValid: boolean;
    cssClass: string;
    errorMessages: string[];
};
export type ValidationReport = Record<string, ValidationReportItem>;

export default class ValidationReportBuilder<T extends object = object> {
    cssClasses = ['is-invalid', 'is-valid'];
    validatedData: ValidatedObject<T>;

    constructor(validatedData: ValidatedObject<T>) {
        this.validatedData = validatedData;
    }

    get report(): ValidationReport {
        return this.buildValidation();
    }

    protected getItem(field: string): ValidationError | undefined {
        return this.validatedData.errors.find(errorItem => errorItem.property === field);
    }

    isValid(field: string): boolean {
        return this.getItem(field) === undefined;
    }

    getError(field: string) {
        const errorItem = this.getItem(field);
        return errorItem ? Object.values(errorItem.constraints) : [];
    }

    fieldClass(field: string): string {
        return this.isValid(field) ? this.cssClasses[1] : this.cssClasses[0];
    }

    get hasErrors(): boolean {
        return this.validatedData.hasErrors;
    }

    get data() {
        return this.validatedData.target;
    }

    buildValidation(): ValidationReport {
        const validation: ValidationReport = {};
        Object.keys(this.validatedData.target).forEach(field => {
            validation[field] = {
                isValid: this.isValid(field),
                cssClass: this.fieldClass(field),
                errorMessages: this.getError(field),
            };
        });
        return validation;
    }
}
