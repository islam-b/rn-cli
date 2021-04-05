"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorService = void 0;
class AuthorService {
    constructor(restService) {
        this.restService = restService;
        this.apiName = "blog";
        this.addArticle = (id, input) => this.restService.request({
            method: "POST",
            url: `/api/blog/authors/${id}/articles`,
            data: input
        }, { apiName: this.apiName });
        this.updateArticle = (id, articleId, input) => this.restService.request({
            method: "PUT",
            url: `/api/blog/authors/${id}/articles/${articleId}`,
            data: input
        }, { apiName: this.apiName });
        this.deleteArticle = (id, articleId) => this.restService.request({
            method: "DELETE",
            url: `/api/blog/authors/${id}/articles/${articleId}`,
        }, { apiName: this.apiName });
        this.getProfile = (username) => this.restService.request({
            method: "GET",
            url: `/api/blog/authors/${username}`,
        }, { apiName: this.apiName });
        this.register = (input) => this.restService.request({
            method: "POST",
            url: `/api/blog/authors/signup`,
            data: input
        }, { apiName: this.apiName });
        this.setProfilePicture = (username, picture) => this.restService.request({
            method: "PUT",
            url: `/api/blog/authors/${username}/picture`,
            params: { picture: picture }
        }, { apiName: this.apiName });
        this.updateProfile = (username, info) => this.restService.request({
            method: "PUT",
            url: `/api/blog/authors/${username}`,
            data: info
        }, { apiName: this.apiName });
        this.getLatestPublishedArticles = (authorId) => this.restService.request({
            method: "GET",
            url: `/api/blog/authors/${authorId}/latest-published`,
        }, { apiName: this.apiName });
        this.getOnReviewArticles = (authorId) => this.restService.request({
            method: "GET",
            url: `/api/blog/authors/${authorId}/latest-onreview`,
        }, { apiName: this.apiName });
    }
}
exports.AuthorService = AuthorService;
//# sourceMappingURL=author.service.js.map