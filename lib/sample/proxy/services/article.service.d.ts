import { GetArticlesInputDto } from "../dtos/models";
import { RestService } from "@itcomp/abp-rn";
export declare class ArticleService {
    private restService;
    apiName: string;
    constructor(restService: RestService);
    get: (id: string) => any;
    getList: (input: GetArticlesInputDto) => any;
}
