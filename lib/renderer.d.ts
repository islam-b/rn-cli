import { Models, Services } from "./factory";
interface FileContent {
    directory: string;
    fileName: string;
    content: string;
}
export declare class Renderer {
    services: FileContent[];
    models: FileContent[];
    constructor(services: Services, dtos: Models);
    private renderImports;
    private renderFunctions;
    private renderFunctionInputs;
    private renderParams;
    private renderBody;
    private renderUrl;
    private renderProxyService;
    private renderDtoProperties;
    private renderEnumValues;
    private renderEnum;
    private renderDto;
}
export {};
