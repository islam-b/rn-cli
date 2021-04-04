import { AxiosInstance, AxiosRequestConfig } from "axios"

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