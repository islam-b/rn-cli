"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionNiveauEtudeService = void 0;
class PromotionNiveauEtudeService {
    constructor(restService) {
        this.restService = restService;
        this.apiName = "config";
        this.create = (input) => this.restService.request({
            method: "POST",
            url: `/api/config/niveaux-etudes`,
            data: input
        }, { apiName: this.apiName });
        this.getList = (input) => this.restService.request({
            method: "GET",
            url: `/api/config/niveaux-etudes`,
            params: { filter: input.filter, promotionId: input.promotionId, annee: input.annee, locked: input.locked, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount }
        }, { apiName: this.apiName });
        this.delete = (id) => this.restService.request({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}`,
        }, { apiName: this.apiName });
        this.get = (id) => this.restService.request({
            method: "GET",
            url: `/api/config/niveaux-etudes/${id}`,
        }, { apiName: this.apiName });
        this.lock = (id, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/lock`,
            data: input
        }, { apiName: this.apiName });
        this.unlock = (id, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/unlock`,
            data: input
        }, { apiName: this.apiName });
        this.update = (id, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}`,
            data: input
        }, { apiName: this.apiName });
        this.addPeriode = (id, input) => this.restService.request({
            method: "POST",
            url: `/api/config/niveaux-etudes/${id}/periodes`,
            data: input
        }, { apiName: this.apiName });
        this.getPeriodes = (id) => this.restService.request({
            method: "GET",
            url: `/api/config/niveaux-etudes/${id}/periodes`,
        }, { apiName: this.apiName });
        this.removePeriode = (id, periodeId) => this.restService.request({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}`,
        }, { apiName: this.apiName });
        this.updatePeriode = (id, periodeId, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}`,
            data: input
        }, { apiName: this.apiName });
        this.addSessionEvaluation = (id, periodeId, input) => this.restService.request({
            method: "POST",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/sessions-evaluations`,
            data: input
        }, { apiName: this.apiName });
        this.getSessionsEvaluations = (id, periodeId) => this.restService.request({
            method: "GET",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/sessions-evaluations`,
        }, { apiName: this.apiName });
        this.removeSessionEvaluation = (id, periodeId, sessionEvaluationId) => this.restService.request({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/sessions-evaluations/${sessionEvaluationId}`,
        }, { apiName: this.apiName });
        this.updateSessionEvaluation = (id, periodeId, sessionEvaluationId, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/sessions-evaluations/${sessionEvaluationId}`,
            data: input
        }, { apiName: this.apiName });
        this.setSessionEvaluationOrder = (id, periodeId, sessionEvaluationId, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/sessions-evaluations/${sessionEvaluationId}/set-order`,
            data: input
        }, { apiName: this.apiName });
        this.addExamen = (id, periodeId, input) => this.restService.request({
            method: "POST",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/examens`,
            data: input
        }, { apiName: this.apiName });
        this.getExamens = (id, periodeId) => this.restService.request({
            method: "GET",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/examens`,
        }, { apiName: this.apiName });
        this.removeExamen = (id, periodeId, examenId) => this.restService.request({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/examens/${examenId}`,
        }, { apiName: this.apiName });
        this.updateExamen = (id, periodeId, examenId, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/examens/${examenId}`,
            data: input
        }, { apiName: this.apiName });
        this.addUnitePedagogique = (id, periodeId, input) => this.restService.request({
            method: "POST",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/unites-pedagogiques`,
            data: input
        }, { apiName: this.apiName });
        this.getUnitesPedagogiques = (id, periodeId) => this.restService.request({
            method: "GET",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/unites-pedagogiques`,
        }, { apiName: this.apiName });
        this.removeUnitePedagogique = (id, periodeId, unitePedagogiqueId) => this.restService.request({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/unites-pedagogiques/${unitePedagogiqueId}`,
        }, { apiName: this.apiName });
        this.updateUnitePedagogique = (id, periodeId, unitePedagogiqueId, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/unites-pedagogiques/${unitePedagogiqueId}`,
            data: input
        }, { apiName: this.apiName });
        this.addUniteCompensation = (id, input) => this.restService.request({
            method: "POST",
            url: `/api/config/niveaux-etudes/${id}/unites-compensations`,
            data: input
        }, { apiName: this.apiName });
        this.getUnitesCompensaions = (id) => this.restService.request({
            method: "GET",
            url: `/api/config/niveaux-etudes/${id}/unites-compensations`,
        }, { apiName: this.apiName });
        this.removeUniteCompensation = (id, uniteCompensationId) => this.restService.request({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/unites-compensations/${uniteCompensationId}`,
        }, { apiName: this.apiName });
        this.updateUniteCompensation = (id, uniteCompensationId, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/unites-compensations/${uniteCompensationId}`,
            data: input
        }, { apiName: this.apiName });
        this.setUniteCompensationOptions = (id, uniteCompensationId, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/unites-compensations/${uniteCompensationId}/set-options`,
            data: input
        }, { apiName: this.apiName });
        this.addMatiere = (id, periodeId, input) => this.restService.request({
            method: "POST",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres`,
            data: input
        }, { apiName: this.apiName });
        this.getMatieres = (id, periodeId, withDetails) => this.restService.request({
            method: "GET",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres`,
            params: { withDetails: withDetails }
        }, { apiName: this.apiName });
        this.getAllMatieres = (id, withDetails) => this.restService.request({
            method: "GET",
            url: `/api/config/niveaux-etudes/${id}/matieres`,
            params: { withDetails: withDetails }
        }, { apiName: this.apiName });
        this.removeMatiere = (id, periodeId, matiereId) => this.restService.request({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}`,
        }, { apiName: this.apiName });
        this.updateMatiere = (id, periodeId, matiereId, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}`,
            data: input
        }, { apiName: this.apiName });
        this.setMatiereOptions = (id, periodeId, matiereId, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/set-options`,
            data: input
        }, { apiName: this.apiName });
        this.removeMatiereSessionEvaluation = (id, periodeId, matiereId, sessionEvaluationId) => this.restService.request({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/sessions-evaluations/${sessionEvaluationId}`,
        }, { apiName: this.apiName });
        this.setMatiereUnitePedagogique = (id, periodeId, matiereId, unitePedagogiqueId) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/set-unite-pedeagogique`,
            params: { unitePedagogiqueId: unitePedagogiqueId }
        }, { apiName: this.apiName });
        this.setMatiereUniteCompensation = (id, periodeId, matiereId, uniteCompensationId) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/set-unite-compensation`,
            params: { uniteCompensationId: uniteCompensationId }
        }, { apiName: this.apiName });
        this.addMatiereExamen = (id, periodeId, matiereId, input) => this.restService.request({
            method: "POST",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/examens`,
            data: input
        }, { apiName: this.apiName });
        this.removeMatiereExamen = (id, periodeId, matiereId, examenId) => this.restService.request({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/examens/${examenId}`,
        }, { apiName: this.apiName });
        this.updateMatiereExamen = (id, periodeId, matiereId, examenId, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/examens/${examenId}`,
            data: input
        }, { apiName: this.apiName });
        this.setMatiereExamenOptions = (id, periodeId, matiereId, examenId, input) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/examens/${examenId}/set-options`,
            data: input
        }, { apiName: this.apiName });
        this.lockMatiereExamen = (id, periodeId, matiereId, examenId) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/examens/${examenId}/lock`,
        }, { apiName: this.apiName });
        this.unlockMatiereExamen = (id, periodeId, matiereId, examenId) => this.restService.request({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/examens/${examenId}/unlock`,
        }, { apiName: this.apiName });
        this.removeMatiereExamenSessionEvaluation = (id, periodeId, matiereId, examenId, sessionEvaluationId) => this.restService.request({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/examens/${examenId}/sessions-evaluations/${sessionEvaluationId}`,
        }, { apiName: this.apiName });
    }
}
exports.PromotionNiveauEtudeService = PromotionNiveauEtudeService;
//# sourceMappingURL=promotion-niveau-etude.service.js.map