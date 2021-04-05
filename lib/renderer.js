"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
const mustache_1 = require("mustache");
class Renderer {
    constructor(services, dtos) {
        this.services = [];
        this.models = [];
        this.services = services.map(meta => {
            let output = this.renderProxyService(meta);
            output = output.replace(/&quot;/g, '\"')
                .replace(/amp;/g, '')
                .replace(/&#x2F;/g, '/')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&#x3D;/g, '=')
                .replace(/&#x60;/g, '\`');
            return {
                directory: meta.directory,
                fileName: meta.fileName,
                content: output
            };
        });
        for (let key in dtos) {
            let group = dtos[key];
            let imports = this.renderImports(group.imports) + "\n\n";
            group.content = imports + group.dtos.map(dto => {
                return dto.isEnum ? this.renderEnum(dto) : this.renderDto(dto);
            }).join('');
            group.content = group.content.replace(/&quot;/g, '\"')
                .replace(/amp;/g, '')
                .replace(/&#x2F;/g, '/')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&#x3D;/g, '=')
                .replace(/&#x60;/g, '\`');
            this.models.push({
                directory: group.directory,
                fileName: group.fileName,
                content: group.content
            });
        }
    }
    renderImports(imports) {
        const template = `import { {{obj}} } from "{{path}}";`;
        let response = "";
        imports.forEach(im => {
            let res = mustache_1.render(template, im);
            response = response + '\n' + res;
        });
        return response;
    }
    renderFunctions(functions) {
        const template = `
    {{name}} = ({{inputs}}) =>
        this.restService.request<{{T}} , {{R}}> ({
            method: "{{method}}",
            url: \`{{ url }}\`, {{params}} {{body}}
        },
        { apiName: this.apiName });
    `;
        let response = "";
        functions.forEach(fn => {
            fn.url = this.renderUrl(fn.url);
            fn.inputs = this.renderFunctionInputs(fn.inputType);
            fn.params = this.renderParams(fn.paramsType);
            fn.body = this.renderBody(fn.body);
            fn.body == "" ? "" : "," + fn.body;
            response = response + "\n" + mustache_1.render(template, fn);
        });
        return response;
    }
    renderFunctionInputs(inputs) {
        const template = `{{name}}{{optional}} : {{type}}`;
        let response = "";
        inputs.forEach((input, index) => {
            let prefix = index == 0 ? '' : ", ";
            response = response + prefix + mustache_1.render(template, input);
        });
        return response;
    }
    renderParams(params) {
        if (params.length == 0) {
            return '';
        }
        const template = `{{key}}:{{value}}`;
        let response = "";
        params.forEach((param, index) => {
            let prefix = index == 0 ? '' : ", ";
            response = response + prefix + mustache_1.render(template, param);
        });
        response = `\n \t \t \tparams: { ` + response + `}`;
        return response;
    }
    renderBody(body) {
        return body == null ? '' : '\n \t \t \tdata: ' + body;
    }
    renderUrl(url) {
        return url.replace(/{/g, "${");
    }
    renderProxyService(service) {
        let template = `{{imports}} \n
export class {{serviceName}}  {
    
    apiName = "{{apiName}}"
    
    constructor(private restService: RestService) {}
    {{functions}}
}
    `;
        service.imports.push({
            obj: "RestService",
            path: "@itcomp/abp-rn"
        });
        let imports = this.renderImports(service.imports);
        let functions = this.renderFunctions(service.functions);
        let response = mustache_1.render(template, {
            serviceName: service.serviceName,
            apiName: service.apiName,
            imports,
            functions
        });
        return response.toString();
    }
    renderDtoProperties(properties) {
        let template = `\n \t{{name}}: {{type}}`;
        let res = "";
        properties.forEach((prop, index) => {
            prop.name = prop.name + (prop.isOptional ? '?' : '');
            res = res + mustache_1.render(template, prop);
        });
        return res;
    }
    renderEnumValues(properties) {
        let template = `\n \t{{name}} = {{type}},`;
        let res = "";
        properties.forEach((prop, index) => {
            res = res + mustache_1.render(template, prop);
        });
        return res;
    }
    renderEnum(enumeration) {
        let template = `export enum {{dtoName}} { {{properties}} \n}\n\n`;
        let properties = this.renderEnumValues(enumeration.properties);
        return mustache_1.render(template, {
            dtoName: enumeration.dtoName,
            properties
        });
    }
    renderDto(dto) {
        let template = `export interface {{dtoName}} {{baseType}} { {{properties}} \n}\n\n`;
        let imports = "";
        let properties = this.renderDtoProperties(dto.properties);
        let baseType = dto.baseType ? "extends " + dto.baseType : '';
        return mustache_1.render(template, {
            dtoName: dto.dtoName,
            baseType,
            imports,
            properties
        });
    }
}
exports.Renderer = Renderer;
//# sourceMappingURL=renderer.js.map