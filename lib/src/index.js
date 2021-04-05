"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProxy = void 0;
const executor_1 = require("./executor");
// export var options = {
//     url: "http://sgscore/api/abp/api-definition?IncludeTypes=true",
//     module : 'config',
//     rootNamespace : 'Itcomp.Sgs.Config', 
//     targetFolder: ""
// } as Options
function generateProxy(options) {
    var executor = new executor_1.Executor(options);
    executor.getApiDefinition().then(() => {
        executor.configureServicesAndDtos()
            .renderFiles()
            .saveFiles();
    }).catch(error => {
        console.error(error);
    });
}
exports.generateProxy = generateProxy;
//# sourceMappingURL=index.js.map