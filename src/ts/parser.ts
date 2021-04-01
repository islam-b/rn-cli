import jsConvert from "js-convert-case"
import { Queue } from "./helpers/queue"
import { TypeNode } from "./types/type-node"

export class Parser {

    queue: Queue

    static systemTypesMapping = {
        "System.Int32": "number",
        "System.String": "string",
        "System.Void":  "void",
        "System.Boolean": "boolean",
        "Int32": "number",
        "String": "string",
        "Void":  "void",
        "Boolean": "boolean"
    }

    static primitiveTypes = ["number","string","void","boolean"]

    constructor() {
        
    }

    getKeyFromNamespace(fullTypeDeclaration:string) {
        fullTypeDeclaration = fullTypeDeclaration.replace(/\[/g, '').replace(/\]/g, '')
        let head = this.getTypeTree(fullTypeDeclaration)
        return head.toStringNamespace(true)
    }

    getLabelFromNamespace(fullTypeDeclaration:string, genericArgs: string[]) { 
        if (fullTypeDeclaration.includes("<")) {
            let parts = fullTypeDeclaration.split("<")
            let res = parts[0].split(".").pop() 
            return res +"<"+genericArgs.join(',')+">"
    
        } else {
            return fullTypeDeclaration.split('.').pop()
        }
    }
    
    getDirectory(fullTypeDeclaration:string, rootNamespace: string) {
        fullTypeDeclaration = fullTypeDeclaration.replace(rootNamespace + ".", "")
        let parts = fullTypeDeclaration.split(".")
        parts.pop()
        let res = parts.map(p => this.pascalToSnakeCase(p))
        return res.join("/")
    }

    getFileName(label: string, suffix:string) { 
        return this.pascalToSnakeCase(label.replace("Dto", "")) + "."+ suffix+".ts"
    }

    getCompositeTypes(fullTypeDeclaration:string) {
        fullTypeDeclaration = fullTypeDeclaration.replace(/\[/g,'').replace(/]/g,'')
        if (fullTypeDeclaration.includes("<")) {
            let node = this.getTypeTree(fullTypeDeclaration)
            return node.extractNamespaces()
        } else return [this.mapSystemTypes(fullTypeDeclaration)];
    }
    
    private getTypeTree(namespace:string): TypeNode {
        let ns = this.mapSystemTypes(namespace)
        this.queue = new Queue()
        this.buildTree(ns,0)
        return this.queue.tree
    }

    // construct type tree from namespace
    private buildTree(namespace:string, index:number) { 
        let parts = namespace.split("")
        let exit = false
        let i = index
        while (!exit) { 
            switch (parts[i]) {
                case ("<"): {  
                    let item = new TypeNode(namespace.substring(index, i))
                    this.queue.current.typeArgs.push(item)
                    this.queue.push(item)
                    this.buildTree(namespace, i+1)
                    exit = true;
                    break;
                }
                case (","): {
                    let item = new TypeNode(namespace.substring(index, i))
                    this.queue.current.typeArgs.push(item)
                    this.buildTree(namespace, i+1)
                    exit = true;
                    break;
                } 
                case (">"): {
                    let item = new TypeNode(namespace.substring(index, i))
                    this.queue.current.typeArgs.push(item)
                    this.queue.pop() 
                    break;
                }  
            } 
            i++
            if(i==namespace.length) {
                exit= true
            }
        }
    }

    private mapSystemTypes(namespace:string) {
        // map system types to simple js/ts types
        let res = namespace
        for (origin in Parser.systemTypesMapping) {
            res = res.replace(origin, Parser.systemTypesMapping[origin])
        }
        // convert "[type]" to "type[]""
        return res.replace(/\[/g,'').replace(/]/g,'') 
    }

    private pascalToSnakeCase(str) {
        return jsConvert.toCamelCase(str).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    }
 
    static isPrimitive(type:string) {
        return this.primitiveTypes.indexOf(type.replace("?",""))>=0
    }

    

}