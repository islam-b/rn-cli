import { DtoMetadata } from "./dto-metadata";
import Options from "./executor";
import { ServiceMetadata } from "./service-metadata";
import { ModelsMetadata } from "./models-metadata";
export interface Dtos {
    [key: string]: DtoMetadata;
}
export interface Models {
    [key: string]: ModelsMetadata;
}
export declare type Services = ServiceMetadata[];
export declare class Factory {
    private options;
    private types;
    private dtos;
    services: Services;
    models: Models;
    private module;
    private parser;
    constructor(options: Options, modules: any, types: any);
    resolveServices(): void;
    resolveDto(fullTypeDeclaration: string): string[];
    groupDtosByNamespace(): void;
}
