import { Parser } from "./parser"
import { ImportType, PropertyType } from "./types"
import { DtoMetadata} from "./dto-metadata"
import {Options} from "./executor"


export class ModelsMetadata {

    fileName: string
    directory: string
    imports: ImportType[]
    content: string
    ns:string
    dtos: DtoMetadata[]
    dependencies: string[]

    private parser:Parser

    constructor(private dto:DtoMetadata,  private options:Options, private types:any) {
        this.parser = new Parser()

        this.fileName = "models.ts",
        this.directory = dto.directory
        this.ns  = dto.ns
        this.imports = []
        this.content = ""
        this.dtos = [dto]
        this.dependencies = [...dto.dependencies]
    }

    addDto(dto:DtoMetadata) { 
        this.dtos.push(dto)
        this.addDependencies(dto.dependencies)
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


    generateImportsMetadata() {
        this.cleanDependencies()
        let imports = {}
        let rootNamespace = this.options.rootNamespace
        let prefix = this.dto.fullTypeDeclaration.replace(rootNamespace + ".", '').split('.').map(x => "..")
        prefix.length>0 ? prefix.pop() : true
        this.dependencies.forEach(dep => {
            let el = dep.replace(rootNamespace + ".", '')
            let parts = el.split(".")
            let obj = parts.pop() as string
            let pieces = parts.map(x => Parser.toSnakeCase(x))
            let path = (prefix.length>0 ? prefix.join("/") : ".") + "/" + pieces.join('/') + (pieces.length > 0 ? '/' : '') + "models"
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
        this.imports = response
    }
    
    private cleanDependencies() {
        let clone = [] as string[]
        this.dependencies.forEach(dep => {
            let key = this.parser.getTypeTree(dep.replace(/\[/g, '').replace(/\]/g, '')).toStringNamespace(true)
            if (this.types[key]) {
                let typename =  this.parser.getTypeTree(dep.replace(/\[/g, '').replace(/\]/g, '')).toStringType(true)
                let found = this.dtos.find(x => {
                    let s = this.parser.getTypeTree(x.dtoName.replace(/\[/g, '').replace(/\]/g, '')).toStringType(true)
                    return typename == s
                })
                if (!found) {
                    let temp = dep.replace(/<.*>/,'')
                    clone.indexOf(temp)<0 ? clone.push(temp) : true
                }
            }
        })
        this.dependencies = clone 
    }
}