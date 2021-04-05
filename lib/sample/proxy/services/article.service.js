"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
from;
"../dtos/volo/abp/application/dtos/models";
class ArticleService {
    constructor(restService) {
        this.restService = restService;
        this.apiName = "blog";
        this.get = (id) => this.restService.request({
            method: "GET",
            url: `/api/blog/articles/${id}`,
        }, { apiName: this.apiName });
        this.getList = (input) => this.restService.request({
            method: "GET",
            url: `/api/blog/articles`,
            data: input
        }, { apiName: this.apiName });
    }
}
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map