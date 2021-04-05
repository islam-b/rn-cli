"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
const dto_metadata_1 = require("./dto-metadata");
const parser_1 = require("./parser");
const service_metadata_1 = require("./service-metadata");
const models_metadata_1 = require("./models-metadata");
class Factory {
    // Main Factory options root ns, module, ... 
    constructor(options, modules, types) {
        this.options = options;
        this.types = types;
        this.dtos = {};
        this.services = [];
        this.models = {};
        this.parser = new parser_1.Parser();
        this.module = modules[options.module];
        if (!this.module) {
            throw new Error("Module not found");
        }
    }
    resolveServices() {
        var _a;
        for (const key in this.module.controllers) {
            let controller = this.module.controllers[key];
            let metadata = new service_metadata_1.ServiceMetadata(controller, this.module.rootPath, this.options, this);
            (_a = this.services) === null || _a === void 0 ? void 0 : _a.push(metadata);
        }
    }
    resolveDto(fullTypeDeclaration) {
        let key = this.parser.getKeyFromNamespace(fullTypeDeclaration);
        if (this.dtos[key] == undefined) {
            let dto = this.types[key];
            if (dto) {
                this.dtos[key] = new dto_metadata_1.DtoMetadata(dto, this.options, fullTypeDeclaration, this);
            }
        }
        let composites = this.parser.getCompositeTypes(fullTypeDeclaration);
        composites.forEach(piece => {
            if (piece != fullTypeDeclaration && !parser_1.Parser.isPrimitive(piece)) {
                this.resolveDto(piece);
            }
        });
        return [...composites, key];
    }
    groupDtosByNamespace() {
        for (let key in this.dtos) {
            let dto = this.dtos[key];
            if (this.models[dto.directory]) {
                this.models[dto.directory].addDto(dto);
            }
            else {
                this.models[dto.directory] = new models_metadata_1.ModelsMetadata(dto, this.options, this.types);
            }
        }
        for (let key in this.models) {
            this.models[key].generateImportsMetadata();
        }
    }
}
exports.Factory = Factory;
//# sourceMappingURL=factory.js.map