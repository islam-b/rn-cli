import Options from "./executor"
import { Factory } from "./factory"
import { Parser } from "./parser"
import { FunctionType, ImportType, InputFnType, ParamType } from "./types"

export class ServiceMetadata {

    fileName: string
    directory: string
    serviceName:string
    path:string= ""
    apiName:string 
    imports: ImportType[]
    functions: FunctionType[]
    dependencies: string[]

    private parser:Parser

    // service proxy builder 
    constructor(private controller, apiName:string,
                private options:Options, 
                private factory: Factory) {
        this.parser = new Parser()
        this.serviceName = this.parser.getServiceName(controller.controllerName)
        this.fileName = this.parser.getFileName(controller.controllerName,".service")
        this.directory = this.parser.getDirectory(this.serviceName,options.rootNamespace)
        this.apiName = apiName
        this.dependencies = []
        this.functions = this.generateFunctionsMetadata()
        this.imports = this.generateImportsMetadata() 
    }

    private generateFunctionsMetadata() {
        let functions = [] as FunctionType[]
        for (const action in this.controller.actions) {
            let fn = this.controller.actions[action]
            let fonction = {} as FunctionType
            fonction.T = 'any'
            fonction.R = this.parser.getTypeTree(fn.returnValue.typeSimple).toStringType(false)
            fonction.name = this.parser.getServiceName(fn.name)
            fonction.method = fn.httpMethod
            fonction.url = "/" + fn.url
            fonction.inputType = [] as InputFnType[]
            fn.parametersOnMethod.forEach(arg => {
                this.addDependencies(this.factory.resolveDto(arg.typeSimple))
                fonction.inputType.push({
                    name: arg.name,
                    type: this.parser.getTypeTree(arg.typeSimple).toStringType(false),
                    optional: arg.isOptional ? '?' : ''
                } as InputFnType)
            })
            fonction.paramsType = [] 
            fn.parameters.forEach(param => {
                switch (param.bindingSourceId) {
                    case "Body": {
                        fonction.body = param.name
                        break;
                    }
                    case "Path": {
                        break;
                    }
                    default: {
                        fonction.paramsType.push({
                            value: (param.descriptorName == "" ? "" : param.descriptorName + ".") + Parser.toCamelCase(param.name),
                            key: Parser.toCamelCase(param.name),
                        } as ParamType)
                        break;
                    }

                }

            })

            this.addDependencies(this.factory.resolveDto(fn.returnValue.typeSimple))
            functions.push(fonction)
        }
        return functions
    }

    private generateImportsMetadata() {
        let imports = {}
        let rootNamespace = this.options.rootNamespace
        let prefix = this.controller.type.replace(rootNamespace + ".", '').split('.').map(x => "..")
        
        this.dependencies.forEach(dep => {
            let el = dep.replace(rootNamespace + ".", '')
            let parts = el.split(".")
            let obj = parts.pop() as string
            let pieces = parts.map(x => Parser.toSnakeCase(x))
            let path = prefix.join("/") + "/dtos/" + pieces.join('/') + (pieces.length > 0 ? '/' : '') + "models"
            if (imports[path] && !Parser.isPrimitive(obj)) {
                imports[path].names.push(obj)
            } else {
                if (!Parser.isPrimitive(obj)) {
                    imports[path] = {
                        path,
                        names: [obj],
                    }
                }
            }
        })
        let response = [] as ImportType[];
        for (let key in imports) {
            let item = {
                obj: imports[key].names.join(", "),
                path: imports[key].path
            } as ImportType
            response.push(item)
        }
        return response
    }

    private addDependencies(elements) {
        if (elements) {
            elements.forEach(el => {
                if (!Parser.isPrimitive(el) && this.dependencies.indexOf(el) < 0) {
                    this.dependencies.push(el)
                }
            })
        }
    }

}