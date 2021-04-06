"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
const axios_1 = require("axios");
const factory_1 = require("./factory");
const renderer_1 = require("./renderer");
const fs = require("fs");
const https_1 = require("https");
class Executor {
    constructor(options) {
        this.options = options;
        this.appConfig = {};
        this.axiosInstance = axios_1.default.create({
            httpsAgent: new https_1.Agent({
                rejectUnauthorized: false
            })
        });
    }
    getApiDefinition() {
        console.log("INFO: Getting Api definition...");
        return this.axiosInstance.get(this.options.url).then((response) => {
            this.appConfig = response.data;
            return this;
        }).catch(error => {
            throw new Error("ERROR: Could not get api definition");
        });
    }
    configureServicesAndDtos() {
        console.log("INFO: Configure services and dtos...");
        this.factory = new factory_1.Factory(this.options, this.appConfig.modules, this.appConfig.types);
        this.factory.resolveServices();
        this.factory.groupDtosByNamespace();
        return this;
    }
    renderFiles() {
        var _a, _b;
        console.log("INFO: Rendering files...");
        this.renderer = new renderer_1.Renderer((_a = this.factory) === null || _a === void 0 ? void 0 : _a.services, (_b = this.factory) === null || _b === void 0 ? void 0 : _b.models);
        return this;
    }
    saveFiles() {
        var _a, _b;
        console.log("INFO: Saving into directory...");
        (_a = this.renderer) === null || _a === void 0 ? void 0 : _a.services.forEach(service => {
            var dir = './src/' + this.options.targetFolder + '/proxy/services/' + service.directory;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(dir + "/" + service.fileName, service.content);
        });
        (_b = this.renderer) === null || _b === void 0 ? void 0 : _b.models.forEach(model => {
            var dir = './src/' + this.options.targetFolder + '/proxy/dtos/' + model.directory;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(dir + "/" + model.fileName, model.content);
        });
        return this;
    }
}
exports.Executor = Executor;
//# sourceMappingURL=executor.js.map