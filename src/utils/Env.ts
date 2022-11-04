import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import get from 'lodash/get';

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

export class EnvClass {
    data: NodeJS.ProcessEnv | NodeJS.Dict<string>;

    constructor(data?: NodeJS.ProcessEnv | NodeJS.Dict<string>) {
        this.data = data || process.env;
    }

    asString(path: string): string {
        return String(get(this.data, path, ''));
    }
    asBoolean(path: string): boolean {
        return String(get(this.data, path, 'false')).toLowerCase() === 'true';
    }
    asNumber(path: string): number {
        const result = Number(get(this.data, path, 0));
        return isNaN(result) ? 0 : result;
    }
    isDev() {
        return this.data.NODE_ENV === 'development';
    }
}

const Env = new EnvClass();
export default Env;
