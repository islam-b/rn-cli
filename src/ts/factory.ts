import { DtoBuilder } from "./dto-builder";
import Options from "./executor";
import { Parser } from "./parser";
import { ServiceMetadata } from "./service-metadata";
import { DtoType, PropertyType } from "./types";

export interface Dtos {
    [key:string]: DtoType
}
export type Services = ServiceMetadata[]

export class Factory {

    dtos: Dtos= {}
    services: Services = []
    private module  
    private parser = new Parser()

    // Main Factory options root ns, module, ... 
    constructor(private options:Options, private modules:any, private types:any) {
        this.module = modules[options.module]
        if (!this.module) {
            throw new Error("Module not found")
        }
    }

    resolveServices() {
        for (const key in this.module.controllers) {
            let controller = this.module.controllers[key]
            let metadata = new ServiceMetadata(
                controller,
                this.module.rootPath,
                this.options,
                this,
                this.resolveDto)
            this.services?.push(metadata)
        }
    } 

    resolveDto(_this: Factory,fullTypeDeclaration:string) { 

        let key = _this.parser.getKeyFromNamespace(fullTypeDeclaration)
        console.log(key)
        let rootNamespace = _this.options.rootNamespace
        if (_this.dtos[key]==undefined) {
            let dto = _this.types[key]
            if (dto) {

                let name = _this.parser.getLabelFromNamespace(fullTypeDeclaration, dto.genericArguments)
                let directory = _this.parser.getDirectory(fullTypeDeclaration, rootNamespace )
                
                let config = {
                    fileName: _this.parser.getFileName(name,""),
                    directory: directory,
                    ns: _this.parser.getNamespace(fullTypeDeclaration),
                    dtoName: name,
                    isEnum: dto.isEnum,
                    baseType: dto.baseType ? _this.parser.getTypeTree(dto.baseType).toStringType(false)  : '',
                    genericArguments: dto.genericArguments,
                    imports: [],
                    properties: [],
                    dependencies: []
                } as DtoType
                if (dto.isEnum) {
                    dto.enumNames.forEach((name, index) => {
                        config.properties.push({
                            name,
                            type: dto.enumValues[index],
                            isOptional: false
                        } as PropertyType)
                    })
                } else {
                    dto.properties ? dto.properties.forEach(prop => {
                        if (!Parser.isPrimitive(prop.typeSimple)) {
                            config.dependencies = _this.addDependicies(config.dependencies, _this.resolveDto( _this,prop.typeSimple))
                        }
                        config.properties.push({
                            name: Parser.toCamelCase(prop.name),
                            type: _this.parser.getTypeTree(prop.typeSimple).toStringType(false),
                            isOptional: prop.typeSimple.includes("?")
                        } as PropertyType)
                    }) : true
    
    
                    if (config.baseType) {
                        config.dependencies = _this.addDependicies(config.dependencies, _this.resolveDto( _this,dto.baseType))
                    }
                }
    
                _this.dtos[key] = config
    
            }
        }
        let composites = _this.parser.getCompositeTypes(fullTypeDeclaration)
        composites.forEach(piece => {
            if (piece != fullTypeDeclaration &&  !Parser.isPrimitive(piece)) {
                _this.resolveDto(_this,piece)
            }
        })
        return composites
    }

    addDependicies(deps, elements){
        if (elements) {
            elements.forEach(el => {
                if (!Parser.isPrimitive(el) && deps.indexOf(el) < 0) {
                    deps.push(el)
                }
            })
        }
        return deps
    }
}