type LookupPropertyFunc = (obj: object, prop: string) => unknown | undefined;
type Data = {
    exphbs: object;
    _parent: object;
    root: object;
};

type LocationItem = { line: number; column: number };
type Location = { start: LocationItem; end: LocationItem };

export type HelperParams<Params = Record<string, unknown>> = {
    name: string;
    lookupProperty: LookupPropertyFunc;
    hash: Params;
    data: Data;
    loc: Location;
};

export interface HelperBlockParams<Params = Record<string, unknown>> extends HelperParams<Params> {
    fn: unknown;
    inverse: () => void;
}

export const extractParams = <H extends object>(obj: H, allParams: unknown[]): [H, HelperParams<H>] => {
    const helperParams = allParams.pop() as HelperParams<H>;
    const objKeys = Object.keys(obj);
    allParams.forEach((value, i) => {
        const key = objKeys[i];
        obj[key] = value;
    });

    return [
        {
            ...obj,
            ...helperParams.hash,
        },
        helperParams,
    ];
};
