import axios, { AxiosInstance } from "axios";
import { Factory } from "./factory";
import { Renderer } from "./renderer";
import * as fs from 'fs';
import { Agent } from "https";
import * as chalk from 'chalk';
import * as ora from 'ora';

export interface EnvVars {
    apis: {
        [key: string]: {
            baseUrl: string,
            rootNamespace: string,
        }
    },
    oAuthConfig: {
        issuer: string,
        clientId: string,
        clientSecret: string,
        scope: string,
    },
    localization: any
}

export interface Options {
    url: string,
    module: string,
    rootNamespace: string,
    targetFolder: string
}

export class Executor {


    private appConfig = {} as { modules, types }
    private axiosInstance: AxiosInstance
    private factory?: Factory
    private renderer?: Renderer
    private options?: Options
    spinner = ora('')

    constructor(private env: EnvVars, private moduleName: string, private targetFolder: string) {
        this.axiosInstance = axios.create({
            httpsAgent: new Agent({
                rejectUnauthorized: false
            })
        });
    }

    initialize() {
        this.spinner.color = 'yellow';
	    this.spinner.text = 'Initializing';
        this.spinner.start()
        let config = !!this.env.apis ? this.env.apis[this.moduleName] : null
        if (!config) {
            this.spinner.stop()
            throw new Error(chalk.bgRed("Unable to get module configuration from environment."))
        }
        let prefix = config.baseUrl.lastIndexOf("/") == config.baseUrl.length-1 ? "" : "/"
        this.options = {
            url: config.baseUrl+prefix+"api/abp/api-definition?IncludeTypes=true",
            module: this.moduleName,
            rootNamespace: config.rootNamespace,
            targetFolder: this.targetFolder
        }
        return this
    }

    getApiDefinition() {
	    this.spinner.text = 'Getting Api definition';
        return this.axiosInstance.get(this.options?.url!).then((response) => {
            this.appConfig = response.data
            return this
        }).catch(error => {
            this.spinner.stop()
            throw new Error(chalk.bgRed("Unable to get api definition"))
        })
        
    }

    configureServicesAndDtos() {
	    this.spinner.text = 'Configuring services and dtos';
        this.factory = new Factory(this.options!, this.appConfig.modules, this.appConfig.types)
        this.factory.resolveServices()
        this.factory.groupDtosByNamespace() 
        return this
    }

    renderFiles() {
	    this.spinner.text = 'Rendering files';
        this.renderer = new Renderer(this.factory?.services!, this.factory?.models!)
        return this
    }

    saveFiles() {
	    this.spinner.text = 'Saving into directory';
        this.renderer?.services.forEach(service => {
            var dir = './src/' + this.options?.targetFolder + '/proxy/services/' + service.directory;

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(dir + "/" + service.fileName, service.content)
        })
        this.renderer?.models.forEach(model => {
            var dir = './src/' + this.options?.targetFolder + '/proxy/dtos/' + model.directory;

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(dir + "/" + model.fileName, model.content)
        }) 
	    this.spinner.succeed("Proxy files saved successfully.")
        return this
    }

}