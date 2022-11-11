import passportCustom from 'passport-custom';
import { randomUUID } from 'crypto';
import RandomUsername from '@services/rnd-user/RandomUsername';
import { AppUser } from '@auth/AppUser';

const createUser = (): AppUser => ({
    id: randomUUID(),
    username: RandomUsername({ maxLength: 8 }),
    role: 'guest',
});
const verify = function (req, callback) {
    callback(null, req.session.user || createUser());
};
const guestUserStrategy = new passportCustom.Strategy(verify);
export default guestUserStrategy;
