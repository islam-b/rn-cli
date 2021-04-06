"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnneeAcademiqueLookupService = void 0;
class AnneeAcademiqueLookupService {
    constructor(restService) {
        this.restService = restService;
        this.apiName = "config";
        this.get = (id) => this.restService.request({
            method: "GET",
            url: `/api/config/annees/lookup/${id}`,
        }, { apiName: this.apiName });
        this.search = (input) => this.restService.request({
            method: "GET",
            url: `/api/config/annees/lookup/search`,
            params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting }
        }, { apiName: this.apiName });
    }
}
exports.AnneeAcademiqueLookupService = AnneeAcademiqueLookupService;
//# sourceMappingURL=annee-academique-lookup.service.js.map