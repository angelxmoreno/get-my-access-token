import { expect } from 'chai';
import 'mocha';
import RandomUsername, { defaultRandomUsernameParams } from '../../../../src/services/rnd-user/RandomUsername';

describe('RandomUsername', () => {
    it('returns a string', () => {
        const result = RandomUsername();
        expect(result).to.be.a('string');
    });

    it('adheres to a max length', () => {
        expect(RandomUsername()).to.have.lengthOf(defaultRandomUsernameParams.maxLength);
        expect(RandomUsername({ maxLength: 8 })).to.have.lengthOf(8);
        expect(RandomUsername({ maxLength: 32 })).to.have.lengthOf(32);
    });
});
