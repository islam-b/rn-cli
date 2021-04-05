import { AxiosInstance, AxiosRequestConfig } from "axios"
import { Executor } from "./executor"

export abstract class RestService {
    abstract getApi(apiName: string): AxiosInstance 
    request<T, R>(request: AxiosRequestConfig, config: Config): Promise<R> {
        let apiName=config.apiName
        return this.getApi(apiName).request(request).then(response=> {
            return response.data
        })
    }
}

interface Config {
    readonly apiName: string
}


let options = {
    url: "https://localhost:44357/api/abp/api-definition?IncludeTypes=true",
    module: "blog",
    rootNamespace: "Blog.Code.App",
    targetFolder: "sample",
}
var executor = new Executor(options);

executor.getApiDefinition().then(()=>{
    executor.configureServicesAndDtos()
            .renderFiles()
            .saveFiles()
}).catch(error=>{ 
    console.error(error)
})