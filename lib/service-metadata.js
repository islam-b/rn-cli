"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceMetadata = void 0;
const parser_1 = require("./parser");
class ServiceMetadata {
    // service proxy builder 
    constructor(controller, apiName, options, factory) {
        this.controller = controller;
        this.options = options;
        this.factory = factory;
        this.path = "";
        this.parser = new parser_1.Parser();
        this.serviceName = this.parser.getServiceName(controller.controllerName);
        this.fileName = this.parser.getFileName(controller.controllerName, ".service");
        this.directory = this.parser.getDirectory(controller.type, options.rootNamespace);
        this.apiName = apiName;
        this.dependencies = [];
        this.functions = this.generateFunctionsMetadata();
        this.imports = this.generateImportsMetadata();
    }
    generateFunctionsMetadata() {
        let functions = [];
        for (const action in this.controller.actions) {
            let fn = this.controller.actions[action];
            let fonction = {};
            fonction.T = 'any';
            fonction.R = this.parser.getTypeTree(fn.returnValue.typeSimple).toStringType(false);
            fonction.name = parser_1.Parser.toCamelCase(fn.name.replace("Async", ""));
            fonction.method = fn.httpMethod;
            fonction.url = "/" + fn.url;
            fonction.inputType = [];
            fn.parametersOnMethod.forEach(arg => {
                this.addDependencies(this.factory.resolveDto(arg.typeSimple));
                fonction.inputType.push({
                    name: arg.name,
                    type: this.parser.getTypeTree(arg.typeSimple).toStringType(false).replace("?", ""),
                    optional: (arg.typeSimple.includes("?") || arg.isOptional) ? '?' : ''
                });
            });
            fonction.paramsType = [];
            fn.parameters.forEach(param => {
                switch (param.bindingSourceId) {
                    case "Body": {
                        fonction.body = param.name;
                        break;
                    }
                    case "Path": {
                        break;
                    }
                    default: {
                        fonction.paramsType.push({
                            value: (param.descriptorName == "" ? "" : param.descriptorName + ".") + parser_1.Parser.toCamelCase(param.name),
                            key: parser_1.Parser.toCamelCase(param.name),
                        });
                        break;
                    }
                }
            });
            this.addDependencies(this.factory.resolveDto(fn.returnValue.typeSimple));
            functions.push(fonction);
        }
        return functions;
    }
    generateImportsMetadata() {
        let imports = {};
        let rootNamespace = this.options.rootNamespace;
        let prefix = this.controller.type.replace(rootNamespace + ".", '').split('.').map(x => "..");
        this.dependencies.forEach(dep => {
            let el = dep.replace(rootNamespace + ".", '');
            let parts = el.split(".");
            let obj = parts.pop();
            let pieces = parts.map(x => parser_1.Parser.toSnakeCase(x));
            let path = prefix.join("/") + "/dtos/" + pieces.join('/') + (pieces.length > 0 ? '/' : '') + "models";
            if (imports[path] && !parser_1.Parser.isPrimitive(obj)) {
                imports[path].names.push(obj);
            }
            else {
                if (!parser_1.Parser.isPrimitive(obj)) {
                    imports[path] = {
                        path,
                        names: [obj],
                    };
                }
            }
        });
        let response = [];
        for (let key in imports) {
            let item = {
                obj: imports[key].names.join(", "),
                path: imports[key].path
            };
            response.push(item);
        }
        return response;
    }
    addDependencies(elements) {
        if (elements) {
            elements.forEach(el => {
                let temp = el.replace(/<.*>/, '');
                if (!parser_1.Parser.isPrimitive(el) && this.dependencies.indexOf(temp) < 0) {
                    this.dependencies.push(el);
                }
            });
        }
    }
}
exports.ServiceMetadata = ServiceMetadata;
//# sourceMappingURL=service-metadata.js.map