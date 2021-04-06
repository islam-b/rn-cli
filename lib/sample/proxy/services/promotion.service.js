"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionService = void 0;
class PromotionService {
    constructor(restService) {
        this.restService = restService;
        this.apiName = "config";
        this.create = (input) => this.restService.request({
            method: "POST",
            url: `/api/config/promotions`,
            data: input
        }, { apiName: this.apiName });
        this.delete = (id) => this.restService.request({
            method: "DELETE",
            url: `/api/config/promotions/${id}`,
        }, { apiName: this.apiName });
        this.get = (id) => this.restService.request({
            method: "GET",
            url: `/api/config/promotions/${id}`,
        }, { apiName: this.apiName });
        this.getList = (input) => this.restService.request({
            method: "GET",
            url: `/api/config/promotions`,
            params: { filter: input.filter, annee: input.annee, graduated: input.graduated, cycleId: input.cycleId, code: input.code, label: input.label, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount }
        }, { apiName: this.apiName });
        this.graduate = (id, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/promotions/${id}/graduate`,
            data: input
        }, { apiName: this.apiName });
        this.update = (id, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/promotions/${id}`,
            data: input
        }, { apiName: this.apiName });
    }
}
exports.PromotionService = PromotionService;
//# sourceMappingURL=promotion.service.js.map