"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnneeAcademiqueService = void 0;
class AnneeAcademiqueService {
    constructor(restService) {
        this.restService = restService;
        this.apiName = "config";
        this.create = (input) => this.restService.request({
            method: "POST",
            url: `/api/config/annees`,
            data: input
        }, { apiName: this.apiName });
        this.delete = (id) => this.restService.request({
            method: "DELETE",
            url: `/api/config/annees/${id}`,
        }, { apiName: this.apiName });
        this.confirm = (id) => this.restService.request({
            method: "PUT",
            url: `/api/config/annees/${id}/confirm`,
        }, { apiName: this.apiName });
        this.start = (id) => this.restService.request({
            method: "PUT",
            url: `/api/config/annees/${id}/start`,
        }, { apiName: this.apiName });
        this.close = (id) => this.restService.request({
            method: "PUT",
            url: `/api/config/annees/${id}/close`,
        }, { apiName: this.apiName });
        this.get = (id) => this.restService.request({
            method: "GET",
            url: `/api/config/annees/${id}`,
        }, { apiName: this.apiName });
        this.getList = (input) => this.restService.request({
            method: "GET",
            url: `/api/config/annees`,
            params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting }
        }, { apiName: this.apiName });
        this.update = (id, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/annees/${id}`,
            data: input
        }, { apiName: this.apiName });
    }
}
exports.AnneeAcademiqueService = AnneeAcademiqueService;
//# sourceMappingURL=annee-academique.service.js.map