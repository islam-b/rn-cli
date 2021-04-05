"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigLookupService = void 0;
class ConfigLookupService {
    constructor(restService) {
        this.restService = restService;
        this.apiName = "config";
        this.getPromotion = (id) => this.restService.request({
            method: "GET",
            url: `/api/config/lookup/promotions/${id}`,
        }, { apiName: this.apiName });
        this.getPromotionsList = (input) => this.restService.request({
            method: "GET",
            url: `/api/config/lookup/promotions`,
            params: { filter: input.filter, annee: input.annee, graduated: input.graduated, cycleId: input.cycleId, code: input.code, label: input.label, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount }
        }, { apiName: this.apiName });
        this.getNiveauEtude = (id) => this.restService.request({
            method: "GET",
            url: `/api/config/lookup/niveaux-etudes/${id}`,
        }, { apiName: this.apiName });
        this.getNiveauxEtudesList = (input) => this.restService.request({
            method: "GET",
            url: `/api/config/lookup/niveaux-etudes`,
            params: { filter: input.filter, promotionId: input.promotionId, annee: input.annee, locked: input.locked, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount }
        }, { apiName: this.apiName });
        this.getPeriodes = (promotionId, niveauEtudeId) => this.restService.request({
            method: "GET",
            url: `/api/config/lookup/periodes/${promotionId}/${niveauEtudeId}`,
        }, { apiName: this.apiName });
        this.getSessionsEvaluationsList = (promotionId, niveauEtudeId, periodeId) => this.restService.request({
            method: "GET",
            url: `/api/config/lookup/sessions-evaluations/${promotionId}/${niveauEtudeId}/${periodeId}`,
        }, { apiName: this.apiName });
        this.getUnitesPedagogiquesList = (promotionId, niveauEtudeId, periodeId) => this.restService.request({
            method: "GET",
            url: `/api/config/lookup/unites-pedagogiques/${promotionId}/${niveauEtudeId}/${periodeId}`,
        }, { apiName: this.apiName });
        this.getMatieresList = (promotionId, niveauEtudeId, periodeId) => this.restService.request({
            method: "GET",
            url: `/api/config/lookup/matieres/${promotionId}/${niveauEtudeId}/${periodeId}`,
        }, { apiName: this.apiName });
        this.getExamensList = (promotionId, niveauEtudeId, periodeId) => this.restService.request({
            method: "GET",
            url: `/api/config/lookup/examens/${promotionId}/${niveauEtudeId}/${periodeId}`,
        }, { apiName: this.apiName });
        this.getMatieresExamensList = (promotionId, niveauEtudeId, periodeId, matiereId) => this.restService.request({
            method: "GET",
            url: `/api/config/lookup/matieres/${promotionId}/${niveauEtudeId}/${periodeId}/${matiereId}/examens`,
        }, { apiName: this.apiName });
        this.getUnitesCompensaionsList = (promotionId, niveauEtudeId) => this.restService.request({
            method: "GET",
            url: `/api/config/lookup/unites-compensations/${promotionId}/${niveauEtudeId}`,
        }, { apiName: this.apiName });
    }
}
exports.ConfigLookupService = ConfigLookupService;
//# sourceMappingURL=config-lookup.service.js.map