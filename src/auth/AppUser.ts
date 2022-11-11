import { randomUUID } from 'crypto';
import RandomUsername from '@services/rnd-user/RandomUsername';

export type AppUser = {
    id: string;
    username: string;
    role: string;
};

export const createUser = (): AppUser => ({
    id: randomUUID(),
    username: RandomUsername({ maxLength: 8 }),
    role: 'guest',
});
