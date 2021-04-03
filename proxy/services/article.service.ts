
import { ArticleDto, GetArticlesInputDto } from "../dtos/models";
import { RestService } from "@itcomp/abp-rn"; 

export class ArticleService  {
    
    apiName = "blog"
    
    constructor(private restService: RestService) {}
    

    GetService = (id : string) =>
        this.restService.request<any , ArticleDto> ({
            method: "GET",
            url: `/api/blog/articles/${id}`,  
        },
        { apiName: this.apiName });
    

    GetListService = (input : GetArticlesInputDto) =>
        this.restService.request<any , PagedResultDto<ArticleDto>> ({
            method: "GET",
            url: `/api/blog/articles`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    
}
    