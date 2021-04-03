import Options from "./executor"
import { Factory } from "./factory"
import { Parser } from "./parser"
import { ImportType, PropertyType } from "./types"

export class DtoMetadata {

    fileName: string
    directory: string
    ns: string
    dtoName:string
    isEnum: boolean
    baseType: string
    genericArguments: string
    imports: ImportType[]
    properties: PropertyType[]
    dependencies: string[]

    private parser:Parser


    constructor(private dto:any, private options:Options, public fullTypeDeclaration:string, private factory: Factory) {
        this.parser = new Parser()

        this.dtoName = this.parser.getLabelFromNamespace(fullTypeDeclaration, dto.genericArguments)
        this.fileName =  this.parser.getFileName(this.dtoName,"")
        this.directory = this.parser.getDirectory(fullTypeDeclaration, options.rootNamespace )
        this.ns =  this.parser.getNamespace(fullTypeDeclaration)
        this.isEnum = dto.isEnum,
        this.baseType = dto.baseType ? this.parser.getTypeTree(dto.baseType).toStringType(false)  : ''
        this.genericArguments = dto.genericArguments
        this.dependencies = [] 
        this.properties = this.isEnum ? this.generateEnumValuesMetadata() : this.generatePropertiesMetadata()
        this.imports = this.generateImportsMetadata()  
    }

    
    private generatePropertiesMetadata() {
        let properties= [] as PropertyType[]
        this.dto.properties.forEach(prop => {
            if (!Parser.isPrimitive(prop.typeSimple)) {
                this.addDependencies( this.factory.resolveDto( prop.typeSimple))
            }
            properties.push({
                name: Parser.toCamelCase(prop.name),
                type: this.parser.getTypeTree(prop.typeSimple).toStringType(false),
                isOptional: prop.typeSimple.includes("?")
            } as PropertyType)
        })

        if (this.baseType) {
            this.addDependencies(this.factory.resolveDto( this.dto.baseType))
        }
        return properties
    }

    private generateEnumValuesMetadata() {
        let values= [] as PropertyType[]
        this.dto.enumNames.forEach((name, index) => {
            values.push({
                name,
                type: this.dto.enumValues[index],
                isOptional: false
            } as PropertyType)
        })
        return values
    }

    private generateImportsMetadata() {
        let imports = {}
        let rootNamespace = this.options.rootNamespace
        let prefix = this.fullTypeDeclaration.replace(rootNamespace + ".", '').split('.').map(x => "..")
        prefix.length>0 ? prefix.pop() : true
        this.dependencies.forEach(dep => {
            let el = dep.replace(rootNamespace + ".", '')
            let parts = el.split(".")
            let obj = parts.pop() as string
            let pieces = parts.map(x => Parser.toSnakeCase(x))
            let path = prefix.join("/") + "/" + pieces.join('/') + (pieces.length > 0 ? '/' : '') + "models"
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