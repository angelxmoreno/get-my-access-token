import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import get from 'lodash/get';

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const asString = (path: string): string => String(get(process.env, path, ''));
const asBoolean = (path: string): boolean => String(get(process.env, path, 'false')) === 'true';
const asNumber = (path: string): number => Number(get(process.env, path, 0));
const isDev = () => process.env.NODE_ENV === 'development';
const Env ={ asString, asBoolean, asNumber, isDev }
export default Env;