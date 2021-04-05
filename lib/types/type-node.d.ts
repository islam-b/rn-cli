export declare class TypeNode {
    name: string;
    typeArgs: TypeNode[];
    constructor(name: any);
    toStringNamespace: (showPlaceholder: boolean) => string;
    toStringType: (showPlaceholder: boolean) => string;
    extractTypes(): string[];
    extractNamespaces(): string[];
    get isPrimitive(): boolean;
    private stringifyToNs;
    private stringifyToType;
}
