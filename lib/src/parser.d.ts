import { Queue } from "./helpers/queue";
import { TypeNode } from "./types/type-node";
export declare class Parser {
    queue: Queue;
    static systemTypesMapping: {
        "System.Int32": string;
        "System.String": string;
        "System.Void": string;
        "System.Boolean": string;
        "System.Guid": string;
        Int32: string;
        String: string;
        Void: string;
        Boolean: string;
    };
    static primitiveTypes: string[];
    constructor();
    getKeyFromNamespace(fullTypeDeclaration: string): string;
    getLabelFromNamespace(fullTypeDeclaration: string, genericArgs: string[]): string;
    getDirectory(fullTypeDeclaration: string, rootNamespace: string): string;
    getFileName(label: string, suffix: string): string;
    getCompositeTypes(fullTypeDeclaration: string): string[];
    getServiceName(name: string): string;
    getNamespace(fullTypeDeclaration: string): string;
    getTypeTree(namespace: string): TypeNode;
    private buildTree;
    private mapSystemTypes;
    static toSnakeCase(str: string): string;
    static toCamelCase(str: any): string;
    static isPrimitive(type: string): boolean;
}
