import { DtoBuilder } from "./dto-builder";
import { ServiceBuilder } from "./service-builder";

interface Dtos {
    [key:string]: DtoBuilder
}
type Services = ServiceBuilder[]

export class Factory {

    dtos: Dtos
    services: Services
    rootNameSpace: string

    // Main Factory options root ns, module, ... 
    constructor(rootNameSpace, modules, types) {
        this.rootNameSpace = rootNameSpace
    }

    setupServices(modules) {

    } 

    setupDtos(types) {

    }

    private resolveDto(fullTypeDeclaration, types) {
        
    }
}