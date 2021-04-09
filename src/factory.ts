import { DtoMetadata } from "./dto-metadata";
import {Options} from "./executor";
import { Parser } from "./parser";
import { ServiceMetadata } from "./service-metadata";
import { DtoType, ModelsType, PropertyType } from "./types";
import { ModelsMetadata } from "./models-metadata";

export interface Dtos {
    [key:string]: DtoMetadata
}
export interface Models {
    [key:string]: ModelsMetadata
}
export type Services = ServiceMetadata[]

export class Factory {

    private dtos: Dtos= {}
    services: Services = []
    models: Models={}
    private module  
    private parser = new Parser()

    // Main Factory options root ns, module, ... 
    constructor(private options:Options, modules:any, private types:any) {
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
                this)
            this.services?.push(metadata)
        }
    } 

    resolveDto(fullTypeDeclaration:string) { 

        let key = this.parser.getKeyFromNamespace(fullTypeDeclaration)
        if (this.dtos[key]==undefined) {
            let dto = this.types[key]
            if (dto) {
                this.dtos[key] = new DtoMetadata(dto, this.options, fullTypeDeclaration, this)
            }
        }
        let composites = this.parser.getCompositeTypes(fullTypeDeclaration)
        composites.forEach(piece => {
            if (piece != fullTypeDeclaration &&  !Parser.isPrimitive(piece)) {
                this.resolveDto(piece)
            }
        })
        return [...composites, key]
    }

    groupDtosByNamespace() { 
        for (let key in this.dtos) {
            let dto = this.dtos[key]
            if (this.models[dto.directory]) {
                this.models[dto.directory].addDto(dto)
            } else {
                this.models[dto.directory] = new ModelsMetadata(dto,this.options,this.types)
            }
        }
        for (let key in this.models) { 
            this.models[key].generateImportsMetadata()
        }
    }
    
    
 
}