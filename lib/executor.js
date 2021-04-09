"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
const axios_1 = require("axios");
const factory_1 = require("./factory");
const renderer_1 = require("./renderer");
const fs = require("fs");
const https_1 = require("https");
const chalk = require("chalk");
const ora = require("ora");
class Executor {
    constructor(env, moduleName, targetFolder) {
        this.env = env;
        this.moduleName = moduleName;
        this.targetFolder = targetFolder;
        this.appConfig = {};
        this.spinner = ora('');
        this.axiosInstance = axios_1.default.create({
            httpsAgent: new https_1.Agent({
                rejectUnauthorized: false
            })
        });
    }
    initialize() {
        this.spinner.color = 'yellow';
        this.spinner.text = 'Initializing';
        this.spinner.start();
        let config = this.env.apis[this.moduleName];
        if (!config) {
            this.spinner.stop();
            throw new Error(chalk.bgRed("Unable to get module configuration from environment."));
        }
        this.options = {
            url: config.baseUrl + "/api/abp/api-definition?IncludeTypes=true",
            module: this.moduleName,
            rootNamespace: config.rootNamespace,
            targetFolder: this.targetFolder
        };
        return this;
    }
    getApiDefinition() {
        var _a;
        this.spinner.text = 'Getting Api definition';
        return this.axiosInstance.get((_a = this.options) === null || _a === void 0 ? void 0 : _a.url).then((response) => {
            this.appConfig = response.data;
            return this;
        }).catch(error => {
            this.spinner.stop();
            throw new Error(chalk.bgRed("Unable to get api definition"));
        });
    }
    configureServicesAndDtos() {
        this.spinner.text = 'Configuring services and dtos';
        this.factory = new factory_1.Factory(this.options, this.appConfig.modules, this.appConfig.types);
        this.factory.resolveServices();
        this.factory.groupDtosByNamespace();
        return this;
    }
    renderFiles() {
        var _a, _b;
        this.spinner.text = 'Rendering files';
        this.renderer = new renderer_1.Renderer((_a = this.factory) === null || _a === void 0 ? void 0 : _a.services, (_b = this.factory) === null || _b === void 0 ? void 0 : _b.models);
        return this;
    }
    saveFiles() {
        var _a, _b;
        this.spinner.text = 'Saving into directory';
        (_a = this.renderer) === null || _a === void 0 ? void 0 : _a.services.forEach(service => {
            var _a;
            var dir = './src/' + ((_a = this.options) === null || _a === void 0 ? void 0 : _a.targetFolder) + '/proxy/services/' + service.directory;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(dir + "/" + service.fileName, service.content);
        });
        (_b = this.renderer) === null || _b === void 0 ? void 0 : _b.models.forEach(model => {
            var _a;
            var dir = './src/' + ((_a = this.options) === null || _a === void 0 ? void 0 : _a.targetFolder) + '/proxy/dtos/' + model.directory;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(dir + "/" + model.fileName, model.content);
        });
        this.spinner.succeed("Proxy files saved successfully.");
        return this;
    }
}
exports.Executor = Executor;
//# sourceMappingURL=executor.js.map