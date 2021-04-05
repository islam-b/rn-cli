import Options from "./executor";
import { Factory } from "./factory";
import { FunctionType, ImportType } from "./types";
export declare class ServiceMetadata {
    private controller;
    private options;
    private factory;
    fileName: string;
    directory: string;
    serviceName: string;
    path: string;
    apiName: string;
    imports: ImportType[];
    functions: FunctionType[];
    dependencies: string[];
    private parser;
    constructor(controller: any, apiName: string, options: Options, factory: Factory);
    private generateFunctionsMetadata;
    private generateImportsMetadata;
    private addDependencies;
}
