"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestService = void 0;
const executor_1 = require("./executor");
class RestService {
    request(request, config) {
        let apiName = config.apiName;
        return this.getApi(apiName).request(request).then(response => {
            return response.data;
        });
    }
}
exports.RestService = RestService;
let options = {
    url: "https://localhost:44357/api/abp/api-definition?IncludeTypes=true",
    module: "blog",
    rootNamespace: "Blog.Code.App",
    targetFolder: "sample",
};
var executor = new executor_1.Executor(options);
executor.getApiDefinition().then(() => {
    executor.configureServicesAndDtos()
        .renderFiles()
        .saveFiles();
}).catch(error => {
    console.error(error);
});
//# sourceMappingURL=index.js.map