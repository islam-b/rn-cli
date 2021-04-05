"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const js_convert_case_1 = require("js-convert-case");
const queue_1 = require("./helpers/queue");
const type_node_1 = require("./types/type-node");
class Parser {
    constructor() {
        this.queue = new queue_1.Queue();
    }
    getKeyFromNamespace(fullTypeDeclaration) {
        fullTypeDeclaration = fullTypeDeclaration.replace(/\[/g, '').replace(/\]/g, '');
        let head = this.getTypeTree(fullTypeDeclaration);
        return head.toStringNamespace(true);
    }
    getLabelFromNamespace(fullTypeDeclaration, genericArgs) {
        fullTypeDeclaration = fullTypeDeclaration.replace(/\[/, "").replace(/\]/, "");
        if (fullTypeDeclaration.includes("<")) {
            let parts = fullTypeDeclaration.split("<");
            let res = parts[0].split(".").pop();
            return res + "<" + genericArgs.join(',') + ">";
        }
        else {
            return fullTypeDeclaration.split('.').pop();
        }
    }
    getDirectory(fullTypeDeclaration, rootNamespace) {
        fullTypeDeclaration = fullTypeDeclaration.replace(rootNamespace + ".", "");
        let parts = fullTypeDeclaration.split(".");
        parts.pop();
        let res = parts.map(p => Parser.toSnakeCase(p));
        return res.join("/");
    }
    getFileName(label, suffix) {
        return Parser.toSnakeCase(label) + suffix + ".ts";
    }
    getCompositeTypes(fullTypeDeclaration) {
        fullTypeDeclaration = fullTypeDeclaration.replace(/\[/g, '').replace(/]/g, '');
        if (fullTypeDeclaration.includes("<")) {
            let node = this.getTypeTree(fullTypeDeclaration);
            return node.extractNamespaces();
        }
        else
            return [this.mapSystemTypes(fullTypeDeclaration)];
    }
    getServiceName(name) {
        return name + "Service";
    }
    getNamespace(fullTypeDeclaration) {
        let ns = fullTypeDeclaration.replace(fullTypeDeclaration + ".", "").split('.');
        return ns.pop();
    }
    getTypeTree(namespace) {
        let ns = this.mapSystemTypes(namespace);
        if (ns.includes("<")) {
            this.queue = new queue_1.Queue();
            this.buildTree(ns, 0);
        }
        else {
            this.queue = new queue_1.Queue();
            this.queue.data[0].typeArgs.push(new type_node_1.TypeNode(ns));
        }
        return this.queue.tree;
    }
    // construct type tree from namespace
    buildTree(namespace, index) {
        let parts = namespace.split("");
        let exit = false;
        let i = index;
        while (!exit) {
            switch (parts[i]) {
                case ("<"): {
                    let item = new type_node_1.TypeNode(namespace.substring(index, i));
                    this.queue.current.typeArgs.push(item);
                    this.queue.push(item);
                    this.buildTree(namespace, i + 1);
                    exit = true;
                    break;
                }
                case (","): {
                    let item = new type_node_1.TypeNode(namespace.substring(index, i));
                    this.queue.current.typeArgs.push(item);
                    this.buildTree(namespace, i + 1);
                    exit = true;
                    break;
                }
                case (">"): {
                    let item = new type_node_1.TypeNode(namespace.substring(index, i));
                    this.queue.current.typeArgs.push(item);
                    this.queue.pop();
                    break;
                }
            }
            i++;
            if (i == namespace.length) {
                exit = true;
            }
        }
    }
    mapSystemTypes(namespace) {
        // map system types to simple js/ts types
        let res = namespace;
        for (let origin in Parser.systemTypesMapping) {
            res = res.replace(origin, Parser.systemTypesMapping[origin]);
        }
        // convert "[type]" to "type[]""
        return res.replace(/\[/g, '').replace(/\]/g, '[]');
    }
    static toSnakeCase(str) {
        return js_convert_case_1.default.toCamelCase(str).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    }
    static toCamelCase(str) {
        return js_convert_case_1.default.toCamelCase(str);
    }
    static isPrimitive(type) {
        return this.primitiveTypes.indexOf(type.replace("?", "")) >= 0;
    }
}
exports.Parser = Parser;
Parser.systemTypesMapping = {
    "System.Int32": "number",
    "System.String": "string",
    "System.Void": "void",
    "System.Boolean": "boolean",
    "System.Guid": "string",
    "Int32": "number",
    "String": "string",
    "Void": "void",
    "Boolean": "boolean"
};
Parser.primitiveTypes = ["number", "string", "void", "boolean"];
//# sourceMappingURL=parser.js.map