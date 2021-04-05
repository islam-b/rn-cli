import { AxiosInstance, AxiosRequestConfig } from "axios";
export declare abstract class RestService {
    abstract getApi(apiName: string): AxiosInstance;
    request<T, R>(request: AxiosRequestConfig, config: Config): Promise<R>;
}
interface Config {
    readonly apiName: string;
}
export {};
