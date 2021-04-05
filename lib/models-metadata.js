"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelsMetadata = void 0;
const parser_1 = require("./parser");
class ModelsMetadata {
    constructor(dto, options, types) {
        this.dto = dto;
        this.options = options;
        this.types = types;
        this.parser = new parser_1.Parser();
        this.fileName = "models.ts",
            this.directory = dto.directory;
        this.ns = dto.ns;
        this.imports = [];
        this.content = "";
        this.dtos = [dto];
        this.dependencies = [...dto.dependencies];
    }
    addDto(dto) {
        this.dtos.push(dto);
        this.addDependencies(dto.dependencies);
    }
    addDependencies(elements) {
        if (elements) {
            elements.forEach(el => {
                if (!parser_1.Parser.isPrimitive(el) && this.dependencies.indexOf(el) < 0) {
                    this.dependencies.push(el);
                }
            });
        }
    }
    generateImportsMetadata() {
        this.cleanDependencies();
        let imports = {};
        let rootNamespace = this.options.rootNamespace;
        let prefix = this.dto.fullTypeDeclaration.replace(rootNamespace + ".", '').split('.').map(x => "..");
        prefix.length > 0 ? prefix.pop() : true;
        this.dependencies.forEach(dep => {
            let el = dep.replace(rootNamespace + ".", '');
            let parts = el.split(".");
            let obj = parts.pop();
            let pieces = parts.map(x => parser_1.Parser.toSnakeCase(x));
            let path = (prefix.length > 0 ? prefix.join("/") : ".") + "/" + pieces.join('/') + (pieces.length > 0 ? '/' : '') + "models";
            if (imports[path] && !parser_1.Parser.isPrimitive(obj)) {
                imports[path].names.push(obj);
            }
            else {
                if (!parser_1.Parser.isPrimitive(obj)) {
                    imports[path] = {
                        path,
                        names: [obj],
                    };
                }
            }
        });
        let response = [];
        for (let key in imports) {
            let item = {
                obj: imports[key].names.join(", "),
                path: imports[key].path
            };
            response.push(item);
        }
        this.imports = response;
    }
    cleanDependencies() {
        let clone = [];
        this.dependencies.forEach(dep => {
            let key = this.parser.getTypeTree(dep.replace(/\[/g, '').replace(/\]/g, '')).toStringNamespace(true);
            if (this.types[key]) {
                let typename = this.parser.getTypeTree(dep.replace(/\[/g, '').replace(/\]/g, '')).toStringType(true);
                let found = this.dtos.find(x => {
                    let s = this.parser.getTypeTree(x.dtoName.replace(/\[/g, '').replace(/\]/g, '')).toStringType(true);
                    return typename == s;
                });
                if (!found) {
                    let temp = dep.replace(/<.*>/, '');
                    clone.indexOf(temp) < 0 ? clone.push(temp) : true;
                }
            }
        });
        this.dependencies = clone;
    }
}
exports.ModelsMetadata = ModelsMetadata;
//# sourceMappingURL=models-metadata.js.map