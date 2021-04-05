import { Dtos, Models, Services } from "./factory";
import {render} from "mustache"
interface FileContent {
    directory:string, 
    fileName:string, 
    content:string
}
export class Renderer {

    services : FileContent[]= [] 
    models: FileContent[] = []
    constructor(services: Services, dtos: Models) {
        this.services = services.map(meta => { 
            let output = this.renderProxyService(meta)
            output = output.replace(/&quot;/g, '\"')
                .replace(/amp;/g, '')
                .replace(/&#x2F;/g, '/')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&#x3D;/g, '=')
                .replace(/&#x60;/g, '\`')
            return {
                directory: meta.directory,
                fileName: meta.fileName,
                content: output
            } as FileContent
        })
         
        for (let key in dtos) {
            let group = dtos[key]
            let imports = this.renderImports(group.imports) +"\n\n"
            group.content = imports + group.dtos.map(dto=>{
                return dto.isEnum ? this.renderEnum(dto) : this.renderDto(dto) 
            }).join('')
    
            group.content = group.content.replace(/&quot;/g, '\"')
                .replace(/amp;/g, '')
                .replace(/&#x2F;/g, '/')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&#x3D;/g, '=')
                .replace(/&#x60;/g, '\`')
     
            this.models.push({
                directory: group.directory,
                fileName: group.fileName,
                content: group.content
            })
        } 
    }

    private renderImports(imports) {
        const template = `import { {{obj}} } from "{{path}}";`

        let response = ""
        imports.forEach(im => {
            let res = render(template, im)
            response = response + '\n' + res
        })
        return response
    }

    private renderFunctions(functions) {
        const template = `
    {{name}} = ({{inputs}}) =>
        this.restService.request<{{T}} , {{R}}> ({
            method: "{{method}}",
            url: \`{{ url }}\`, {{params}} {{body}}
        },
        { apiName: this.apiName });
    `
        let response = ""
        functions.forEach(fn => {

            fn.url = this.renderUrl(fn.url)
            fn.inputs = this.renderFunctionInputs(fn.inputType)
            fn.params = this.renderParams(fn.paramsType)
            fn.body = this.renderBody(fn.body)
            fn.body == "" ? "" : "," + fn.body
            response = response + "\n" + render(template, fn)
        })
        return response
    }

    private renderFunctionInputs(inputs) {
        const template = `{{name}}{{optional}} : {{type}}`
        let response = ""
        inputs.forEach((input, index) => {
            let prefix = index == 0 ? '' : ", "
            response = response + prefix + render(template, input)
        })
        return response
    }

    private renderParams(params) {
        if (params.length == 0) {
            return ''
        }
        const template = `{{key}}:{{value}}`
        let response = ""
        params.forEach((param, index) => {
            let prefix = index == 0 ? '' : ", "
            response = response + prefix + render(template, param)
        })

        response = `\n \t \t \tparams: { ` + response + `}`
        return response

    }

    private renderBody(body) {
        return body == null ? '' : '\n \t \t \tdata: ' + body
    }

    private renderUrl(url) {
        return url.replace(/{/g, "${")
    }


    private renderProxyService(service) {
        let template = `{{imports}} \n
export class {{serviceName}}  {
    
    apiName = "{{apiName}}"
    
    constructor(private restService: RestService) {}
    {{functions}}
}
    `
        service.imports.push({
            obj: "RestService",
            path: "@itcomp/abp-rn"
        })
        let imports = this.renderImports(service.imports)
        let functions = this.renderFunctions(service.functions)

        let response = render(template, {
            serviceName: service.serviceName,
            apiName: service.apiName,
            imports,
            functions
        })
        return response.toString()

    }

    private renderDtoProperties(properties) {

        let template = `\n \t{{name}}: {{type}}`
        let res = ""
        properties.forEach((prop, index) => {
            prop.name = prop.name + (prop.isOptional ? '?' : '')
            res = res + render(template, prop)
        })
        return res

    }

    private renderEnumValues(properties) {

        let template = `\n \t{{name}} = {{type}},`
        let res = ""
        properties.forEach((prop, index) => {
            res = res + render(template, prop)
        })
        return res

    }

    private renderEnum(enumeration) {
        let template = `export enum {{dtoName}} { {{properties}} \n}\n\n`

        let properties = this.renderEnumValues(enumeration.properties)
        return render(template, {
            dtoName: enumeration.dtoName,
            properties
        })
    }

    private renderDto(dto) {
        let template = `export interface {{dtoName}} {{baseType}} { {{properties}} \n}\n\n`

        let imports = ""
        let properties = this.renderDtoProperties(dto.properties)
        let baseType = dto.baseType ? "extends " + dto.baseType : ''
        return render(template, {
            dtoName: dto.dtoName,
            baseType,
            imports,
            properties
        })
    }

}