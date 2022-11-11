import adjectives from './adjectives';
import colors from './colors';
import animals from './animals';
import { sample } from 'lodash';

export type RandomUsernameParams = {
    useAdjectives: boolean;
    useColors: boolean;
    useAnimals: boolean;
    maxLength: number;
    padWithNumbers: boolean;
};

export const defaultRandomUsernameParams: RandomUsernameParams = {
    useAdjectives: true,
    useColors: true,
    useAnimals: true,
    maxLength: 24,
    padWithNumbers: true,
};

const normalizedSample = (data: string[]): string =>
    sample(data)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-');

const RandomUsername = (params?: Partial<RandomUsernameParams>): string => {
    const { useAdjectives, useColors, useAnimals, maxLength, padWithNumbers } = {
        ...defaultRandomUsernameParams,
        ...params,
    };

    let username = '';

    if (useAdjectives) username += '.' + normalizedSample(adjectives);
    if (useColors) username += '.' + normalizedSample(colors);
    if (useAnimals) username += '.' + normalizedSample(animals);

    username = username
        .replace(/^[^a-z]+/, '')
        .replace(/[^a-z]+$/, '')
        .substring(0, maxLength)
        .replace(/[^a-z]+$/, '');
    if (padWithNumbers && username.length < maxLength) {
        const suffixLength = maxLength - username.length;
        const suffix = Math.floor(
            Math.pow(10, suffixLength - 1) +
                Math.random() * (Math.pow(10, suffixLength) - Math.pow(10, suffixLength - 1) - 1),
        );
        username += suffix;
    }
    return username;
};

export default RandomUsername;
