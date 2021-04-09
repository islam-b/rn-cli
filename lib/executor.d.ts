import * as ora from 'ora';
export interface EnvVars {
    apis: {
        [key: string]: {
            baseUrl: string;
            rootNamespace: string;
        };
    };
    oAuthConfig: {
        issuer: string;
        clientId: string;
        clientSecret: string;
        scope: string;
    };
    localization: any;
}
export interface Options {
    url: string;
    module: string;
    rootNamespace: string;
    targetFolder: string;
}
export declare class Executor {
    private env;
    private moduleName;
    private targetFolder;
    private appConfig;
    private axiosInstance;
    private factory?;
    private renderer?;
    private options?;
    spinner: ora.Ora;
    constructor(env: EnvVars, moduleName: string, targetFolder: string);
    initialize(): this;
    getApiDefinition(): Promise<this>;
    configureServicesAndDtos(): this;
    renderFiles(): this;
    saveFiles(): this;
}
