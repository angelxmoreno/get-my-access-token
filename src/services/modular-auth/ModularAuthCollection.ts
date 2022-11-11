import ModularAuthInterface, { ModularAuthClass } from '@services/modular-auth/ModularAuthInterface';
import appConfig from '@config/index';

export class ModularAuthCollectionClass {
    protected collection: Map<string, ModularAuthInterface> = new Map();

    constructor(data: ModularAuthClass[] = []) {
        data.forEach(modularAuthClass => {
            const instance = new modularAuthClass();
            this.collection.set(instance.key, instance);
        });
    }

    get asArray(): ModularAuthInterface[] {
        return Array.from(this.collection.values());
    }

    get(name: string): ModularAuthInterface | undefined {
        return this.collection.get(name);
    }
}

const ModularAuthCollection = new ModularAuthCollectionClass(appConfig.modularClasses);
export default ModularAuthCollection;
