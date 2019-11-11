// tslint:disable-next-line:interface-name
interface StringMap<T> {
    [key: string]: T;
}

// tslint:disable-next-line:interface-name
interface ReadonlyStringMap<T> {
    readonly [key: string]: T;
}
