import { ImportType } from "./types";
import { DtoMetadata } from "./dto-metadata";
import { Options } from "./executor";
export declare class ModelsMetadata {
    private dto;
    private options;
    private types;
    fileName: string;
    directory: string;
    imports: ImportType[];
    content: string;
    ns: string;
    dtos: DtoMetadata[];
    dependencies: string[];
    private parser;
    constructor(dto: DtoMetadata, options: Options, types: any);
    addDto(dto: DtoMetadata): void;
    private addDependencies;
    generateImportsMetadata(): void;
    private cleanDependencies;
}
