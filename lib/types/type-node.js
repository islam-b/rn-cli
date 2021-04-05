"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeNode = void 0;
const parser_1 = require("../parser");
class TypeNode {
    constructor(name) {
        this.toStringNamespace = (showPlaceholder) => this.stringifyToNs(this, 0, 0, showPlaceholder);
        this.toStringType = (showPlaceholder) => this.stringifyToType(this, 0, 0, showPlaceholder);
        this.name = name;
        this.typeArgs = [];
    }
    extractTypes() {
        let res = [];
        if (!this.isPrimitive) {
            res = [this.name.split(".").pop()];
            this.typeArgs.forEach((element) => {
                res = [...res, ...element.extractTypes()];
            });
        }
        return res;
    }
    extractNamespaces() {
        let res = [];
        if (!this.isPrimitive) {
            res = [this.name];
            this.typeArgs.forEach((element) => {
                res = [...res, ...element.extractNamespaces()];
            });
        }
        return res;
    }
    get isPrimitive() {
        return parser_1.Parser.isPrimitive(this.name);
    }
    stringifyToNs(node, level, index, showPlaceholder) {
        let str = (!showPlaceholder || level < 1) ? node.name : ("T" + index);
        let generics = node.typeArgs.map((element, index) => {
            return this.stringifyToNs(element, level + 1, index, showPlaceholder);
        }).join(',');
        return generics == "" ? str : str + "<" + generics + ">";
    }
    stringifyToType(node, level, index, showPlaceholder) {
        let str = (!showPlaceholder || level < 1) ? node.name.split(".").pop() : ("T" + index);
        let generics = node.typeArgs.map((element, index) => {
            return this.stringifyToType(element, level + 1, index, showPlaceholder);
        }).join(',');
        return (generics == "" ? str : str + "<" + generics + ">");
    }
}
exports.TypeNode = TypeNode;
//# sourceMappingURL=type-node.js.map