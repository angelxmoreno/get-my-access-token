import AuthFormData from '@validators/AuthFormData';
import { AppUser } from '@auth/AppUser';
import { Profile } from 'passport';
import { ValidationReport } from '@validators/ValidationReportBuilder';
import ValidatorInterface from '@validators/ValidatorInterface';

export default interface AppSessionData {
    user?: AppUser;
    modularAuthParams?: Record<string, AuthFormData>;
    modularAuthProfiles?: Record<string, { accessToken?: string; refreshToken?: string; profile: Profile }>;
    csrfSecret?: string;
    validation?: {
        data: ValidatorInterface;
        errors: ValidationReport;
    };
}
