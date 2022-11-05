import ModularAuthInterface from '@services/modular-auth/ModularAuthInterface';
import appConfig from '@config/index';

export class ModularAuthCollectionClass {
    collection: Record<string, ModularAuthInterface> = {};

    constructor(data: ModularAuthInterface[] = []) {
        data.forEach(datum => {
            this.collection[datum.key] = datum;
        });
    }
}

const ModularAuthCollection = new ModularAuthCollectionClass(appConfig.modularAuth);
export default ModularAuthCollection;
