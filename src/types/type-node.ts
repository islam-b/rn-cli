import { Parser } from "../parser"

export class TypeNode {
    name: string
    typeArgs: TypeNode[]
    
    constructor(name) {
        this.name =name
        this.typeArgs = []
    } 

    toStringNamespace = (showPlaceholder:boolean) => this.stringifyToNs(this,0,0,showPlaceholder) 

    toStringType = (showPlaceholder:boolean) => this.stringifyToType(this,0,0,showPlaceholder)

    extractTypes():string[] {
        let res = [] as string[]
        if (!this.isPrimitive) {
            res = [this.name.split(".").pop() as string]
            this.typeArgs.forEach((element) => {
                res = [...res, ...element.extractTypes()]
            }); 
        } 
        return res
    }

    extractNamespaces():string[]  {
        let res = [] as string[]
        if (!this.isPrimitive) {
            res = [this.name]
            this.typeArgs.forEach((element) => {
                res = [...res, ...element.extractNamespaces()]
            }); 
        } 
        return res
    }

    get isPrimitive() {
        return Parser.isPrimitive(this.name)
    }

    private stringifyToNs(node: TypeNode, level, index, showPlaceholder): string {
        let str = (!showPlaceholder || level<1) ? node.name : ("T"+index)
        let generics = node.typeArgs.map((element,index) => {
            return this.stringifyToNs(element,level+1,index,showPlaceholder)
        }).join(','); 
        return generics=="" ? str : str+"<"+generics+">"  
    }

    private stringifyToType(node: TypeNode, level, index, showPlaceholder): string {
        let str = (!showPlaceholder || level<=1) ? node.name.split(".").pop() : ("T"+index)
        let generics = node.typeArgs.map((element,index) => {
            return this.stringifyToType(element,level+1,index,showPlaceholder)
        }).join(',');
        return (generics=="" ? str : str+"<"+generics+">") as string;
    }
}