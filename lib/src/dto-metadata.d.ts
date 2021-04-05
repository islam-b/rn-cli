import Options from "./executor";
import { Factory } from "./factory";
import { PropertyType } from "./types";
export declare class DtoMetadata {
    private dto;
    private options;
    fullTypeDeclaration: string;
    private factory;
    fileName: string;
    directory: string;
    ns: string;
    dtoName: string;
    isEnum: boolean;
    baseType: string;
    genericArguments: string;
    properties: PropertyType[];
    dependencies: string[];
    private parser;
    constructor(dto: any, options: Options, fullTypeDeclaration: string, factory: Factory);
    private generatePropertiesMetadata;
    private generateEnumValuesMetadata;
    private addDependencies;
}
