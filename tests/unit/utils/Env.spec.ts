import { expect } from 'chai';
import 'mocha';
import { EnvClass } from '../../../src/utils/Env';

const data: NodeJS.Dict<string> = {
    aNumber: '5',
    aFloat: '3.14',
    aString: 'hello',
    aTruthyBoolean: 'true',
    aFalsyBoolean: 'false',
    anUndefined: undefined,
};

const Env = new EnvClass(data);

describe('Env', () => {
    it('can get strings', () => {
        expect(Env.asString('aString')).to.eq('hello');

        Object.entries(data).forEach(([k, v]) => {
            const result = Env.asString(k);
            expect(result).to.be.a('string');
            expect(result).to.eq(v ? String(v) : '');
        });
    });

    it('can get booleans', () => {
        expect(Env.asBoolean('aTruthyBoolean')).to.eq(true);
        expect(Env.asBoolean('aFalsyBoolean')).to.eq(false);

        Object.entries(data).forEach(([k, v]) => {
            const result = Env.asBoolean(k);
            expect(result).to.be.a('boolean');
            expect(result).to.eq(String(v) === 'true');
        });
    });

    it('can get numbers', () => {
        expect(Env.asNumber('aNumber')).to.eq(5);
        expect(Env.asNumber('aFloat')).to.eq(3.14);

        Object.entries(data).forEach(([k, v]) => {
            const result = Env.asNumber(k);
            expect(result).to.be.a('number');
            expect(result, `${k} - ${v} - ${result}`).to.eq(isNaN(Number(v)) ? 0 : Number(v));
        });
    });

    it('can detect the NODE_ENV', () => {
        expect(new EnvClass({ NODE_ENV: 'testing' }).isDev()).to.eq(false);
        expect(new EnvClass({ NODE_ENV: 'development' }).isDev()).to.eq(true);
    });
});
