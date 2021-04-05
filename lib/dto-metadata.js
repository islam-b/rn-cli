"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtoMetadata = void 0;
const parser_1 = require("./parser");
class DtoMetadata {
    constructor(dto, options, fullTypeDeclaration, factory) {
        this.dto = dto;
        this.options = options;
        this.fullTypeDeclaration = fullTypeDeclaration;
        this.factory = factory;
        this.parser = new parser_1.Parser();
        this.dtoName = this.parser.getLabelFromNamespace(fullTypeDeclaration, dto.genericArguments);
        this.fileName = this.parser.getFileName(this.dtoName, "");
        this.directory = this.parser.getDirectory(fullTypeDeclaration, options.rootNamespace);
        this.ns = this.parser.getNamespace(fullTypeDeclaration);
        this.isEnum = dto.isEnum,
            this.baseType = dto.baseType ? this.parser.getTypeTree(dto.baseType).toStringType(false) : '';
        this.genericArguments = dto.genericArguments;
        this.dependencies = [];
        this.properties = this.isEnum ? this.generateEnumValuesMetadata() : this.generatePropertiesMetadata();
    }
    generatePropertiesMetadata() {
        let properties = [];
        this.dto.properties.forEach(prop => {
            if (!parser_1.Parser.isPrimitive(prop.typeSimple)) {
                this.addDependencies(this.factory.resolveDto(prop.typeSimple));
            }
            properties.push({
                name: parser_1.Parser.toCamelCase(prop.name),
                type: this.parser.getTypeTree(prop.typeSimple).toStringType(false).replace("?", ""),
                isOptional: prop.typeSimple.includes("?")
            });
        });
        if (this.baseType) {
            this.addDependencies(this.factory.resolveDto(this.dto.baseType));
        }
        return properties;
    }
    generateEnumValuesMetadata() {
        let values = [];
        this.dto.enumNames.forEach((name, index) => {
            values.push({
                name,
                type: this.dto.enumValues[index],
                isOptional: false
            });
        });
        return values;
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
}
exports.DtoMetadata = DtoMetadata;
//# sourceMappingURL=dto-metadata.js.map