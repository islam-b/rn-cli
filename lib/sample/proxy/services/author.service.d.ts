import { ArticleCreateOrUpdateDto, AuthorRegisterDto, AuthorUpdateDto } from "../dtos/models";
import { IFormFile } from "../dtos/microsoft/asp-net-core/http/models";
import { RestService } from "@itcomp/abp-rn";
export declare class AuthorService {
    private restService;
    apiName: string;
    constructor(restService: RestService);
    addArticle: (id: string, input: ArticleCreateOrUpdateDto) => any;
    updateArticle: (id: string, articleId: string, input: ArticleCreateOrUpdateDto) => any;
    deleteArticle: (id: string, articleId: string) => any;
    getProfile: (username: string) => any;
    register: (input: AuthorRegisterDto) => any;
    setProfilePicture: (username: string, picture: IFormFile) => any;
    updateProfile: (username: string, info: AuthorUpdateDto) => any;
    getLatestPublishedArticles: (authorId: string) => any;
    getOnReviewArticles: (authorId: string) => any;
}
