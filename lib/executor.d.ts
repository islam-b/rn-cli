export default interface Options {
    url: string;
    module: string;
    rootNamespace: string;
    targetFolder: string;
}
export declare class Executor {
    private options;
    private appConfig;
    private axiosInstance;
    private factory?;
    private renderer?;
    constructor(options: Options);
    getApiDefinition(): Promise<this>;
    configureServicesAndDtos(): this;
    renderFiles(): this;
    saveFiles(): this;
}
