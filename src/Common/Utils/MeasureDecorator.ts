import { Log } from "./Logger";

export const measure = (
    _target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args) {
        const startTime = Date.now();
        const result = originalMethod.apply(this, args);
        const endTime = Date.now();
        Log.verbose("measure", propertyKey, `Execution time: ${endTime - startTime} ms`);
        return result;
    }
};
