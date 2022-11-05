import { Strategy, StrategyCreatedStatic } from 'passport';

export type PassportParamType = 'string' | 'number';
export type PassportParam = {
    name: string;
    type: PassportParamType;
    validation: [];
};

export default interface ModularAuthInterface {
    key: string;
    name: string;
    description: string;
    strategyClass?: StrategyCreatedStatic;
    passportParams: PassportParam[];
}
