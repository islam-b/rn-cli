
import { ArticleCreateOrUpdateDto, ArticleDto, AuthorDto, AuthorRegisterDto, AuthorUpdateDto } from "../dtos/models";
import { IFormFile } from "../dtos/microsoft/asp-net-core/http/models";
import { RestService } from "@itcomp/abp-rn"; 

export class AuthorService  {
    
    apiName = "blog"
    
    constructor(private restService: RestService) {}
    

    AddArticleService = (id : string, input : ArticleCreateOrUpdateDto) =>
        this.restService.request<any , ArticleDto> ({
            method: "POST",
            url: `/api/blog/authors/${id}/articles`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    UpdateArticleService = (id : string, articleId : string, input : ArticleCreateOrUpdateDto) =>
        this.restService.request<any , ArticleDto> ({
            method: "PUT",
            url: `/api/blog/authors/${id}/articles/${articleId}`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    DeleteArticleService = (id : string, articleId : string) =>
        this.restService.request<any , void> ({
            method: "DELETE",
            url: `/api/blog/authors/${id}/articles/${articleId}`,  
        },
        { apiName: this.apiName });
    

    GetProfileService = (username : string) =>
        this.restService.request<any , AuthorDto> ({
            method: "GET",
            url: `/api/blog/authors/${username}`,  
        },
        { apiName: this.apiName });
    

    RegisterService = (input : AuthorRegisterDto) =>
        this.restService.request<any , AuthorDto> ({
            method: "POST",
            url: `/api/blog/authors/signup`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    SetProfilePictureService = (username : string, picture : IFormFile) =>
        this.restService.request<any , AuthorDto> ({
            method: "PUT",
            url: `/api/blog/authors/${username}/picture`, 
 	 	 	params: { picture:picture} 
        },
        { apiName: this.apiName });
    

    UpdateProfileService = (username : string, info : AuthorUpdateDto) =>
        this.restService.request<any , AuthorDto> ({
            method: "PUT",
            url: `/api/blog/authors/${username}`,  
 	 	 	body: info
        },
        { apiName: this.apiName });
    

    GetLatestPublishedArticlesService = (authorId : string) =>
        this.restService.request<any , ArticleDto[]> ({
            method: "GET",
            url: `/api/blog/authors/${authorId}/latest-published`,  
        },
        { apiName: this.apiName });
    

    GetOnReviewArticlesService = (authorId : string) =>
        this.restService.request<any , ArticleDto[]> ({
            method: "GET",
            url: `/api/blog/authors/${authorId}/latest-onreview`,  
        },
        { apiName: this.apiName });
    
}
    