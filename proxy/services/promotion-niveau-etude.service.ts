
import { PromotionNiveauEtudeCreateDto, PromotionNiveauEtudeDto, PromotionNiveauEtudeGetListInput, PromotionNiveauEtudeGetListDto, NiveauEtudeLockDto, PromotionNiveauEtudeUpdateDto, PeriodeConfigCreateDto, PeriodeConfigDto, PeriodeConfigUpdateDto, SessionEvaluationConfigCreateDto, SessionEvaluationConfigDto, SessionEvaluationConfigUpdateDto, SessionEvaluationConfigChangeOrderDto, ExamenConfigCreateDto, ExamenConfigDto, ExamenConfigUpdateDto, UnitePedagogiqueConfigCreateDto, UnitePedagogiqueConfigDto, UnitePedagogiqueConfigUpdateDto, UniteCompensationCreateDto, UniteCompensationDto, UniteCompensationUpdateDto, UniteCompensationOptionsDto, MatiereConfigCreateDto, boolean, MatiereConfigDto, MatiereConfigUpdateDto, MatiereOptionsDto, MatiereExamenCreateDto, MatiereExamenUpdateDto, MatiereExamenOptionsDto } from "../dtos/models";
import { PagedResultDto } from "../dtos/volo/abp/application/dtos/models";
import { RestService } from "@itcomp/abp-rn"; 

export class PromotionNiveauEtudeService  {
    
    apiName = "config"
    
    constructor(private restService: RestService) {}
    

    create = (input : PromotionNiveauEtudeCreateDto) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "POST",
            url: `/api/config/niveaux-etudes`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    getList = (input : PromotionNiveauEtudeGetListInput) =>
        this.restService.request<any , PagedResultDto<PromotionNiveauEtudeGetListDto>> ({
            method: "GET",
            url: `/api/config/niveaux-etudes`, 
 	 	 	params: { filter:input.filter, promotionId:input.promotionId, annee:input.annee, locked:input.locked, sorting:input.sorting, skipCount:input.skipCount, maxResultCount:input.maxResultCount} 
        },
        { apiName: this.apiName });
    

    delete = (id : number) =>
        this.restService.request<any , void> ({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}`,  
        },
        { apiName: this.apiName });
    

    get = (id : number) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "GET",
            url: `/api/config/niveaux-etudes/${id}`,  
        },
        { apiName: this.apiName });
    

    lock = (id : number, input : NiveauEtudeLockDto) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/lock`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    unlock = (id : number, input : NiveauEtudeLockDto) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/unlock`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    update = (id : number, input : PromotionNiveauEtudeUpdateDto) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    addPeriode = (id : number, input : PeriodeConfigCreateDto) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "POST",
            url: `/api/config/niveaux-etudes/${id}/periodes`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    getPeriodes = (id : number) =>
        this.restService.request<any , PeriodeConfigDto[]> ({
            method: "GET",
            url: `/api/config/niveaux-etudes/${id}/periodes`,  
        },
        { apiName: this.apiName });
    

    removePeriode = (id : number, periodeId : number) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}`,  
        },
        { apiName: this.apiName });
    

    updatePeriode = (id : number, periodeId : number, input : PeriodeConfigUpdateDto) =>
        this.restService.request<any , void> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    addSessionEvaluation = (id : number, periodeId : number, input : SessionEvaluationConfigCreateDto) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "POST",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/sessions-evaluations`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    getSessionsEvaluations = (id : number, periodeId : number) =>
        this.restService.request<any , SessionEvaluationConfigDto[]> ({
            method: "GET",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/sessions-evaluations`,  
        },
        { apiName: this.apiName });
    

    removeSessionEvaluation = (id : number, periodeId : number, sessionEvaluationId : number) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/sessions-evaluations/${sessionEvaluationId}`,  
        },
        { apiName: this.apiName });
    

    updateSessionEvaluation = (id : number, periodeId : number, sessionEvaluationId : number, input : SessionEvaluationConfigUpdateDto) =>
        this.restService.request<any , void> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/sessions-evaluations/${sessionEvaluationId}`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    setSessionEvaluationOrder = (id : number, periodeId : number, sessionEvaluationId : number, input : SessionEvaluationConfigChangeOrderDto) =>
        this.restService.request<any , void> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/sessions-evaluations/${sessionEvaluationId}/set-order`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    addExamen = (id : number, periodeId : number, input : ExamenConfigCreateDto) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "POST",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/examens`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    getExamens = (id : number, periodeId : number) =>
        this.restService.request<any , ExamenConfigDto[]> ({
            method: "GET",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/examens`,  
        },
        { apiName: this.apiName });
    

    removeExamen = (id : number, periodeId : number, examenId : number) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/examens/${examenId}`,  
        },
        { apiName: this.apiName });
    

    updateExamen = (id : number, periodeId : number, examenId : number, input : ExamenConfigUpdateDto) =>
        this.restService.request<any , void> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/examens/${examenId}`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    addUnitePedagogique = (id : number, periodeId : number, input : UnitePedagogiqueConfigCreateDto) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "POST",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/unites-pedagogiques`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    getUnitesPedagogiques = (id : number, periodeId : number) =>
        this.restService.request<any , UnitePedagogiqueConfigDto[]> ({
            method: "GET",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/unites-pedagogiques`,  
        },
        { apiName: this.apiName });
    

    removeUnitePedagogique = (id : number, periodeId : number, unitePedagogiqueId : number) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/unites-pedagogiques/${unitePedagogiqueId}`,  
        },
        { apiName: this.apiName });
    

    updateUnitePedagogique = (id : number, periodeId : number, unitePedagogiqueId : number, input : UnitePedagogiqueConfigUpdateDto) =>
        this.restService.request<any , void> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/unites-pedagogiques/${unitePedagogiqueId}`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    addUniteCompensation = (id : number, input : UniteCompensationCreateDto) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "POST",
            url: `/api/config/niveaux-etudes/${id}/unites-compensations`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    getUnitesCompensaions = (id : number) =>
        this.restService.request<any , UniteCompensationDto[]> ({
            method: "GET",
            url: `/api/config/niveaux-etudes/${id}/unites-compensations`,  
        },
        { apiName: this.apiName });
    

    removeUniteCompensation = (id : number, uniteCompensationId : number) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/unites-compensations/${uniteCompensationId}`,  
        },
        { apiName: this.apiName });
    

    updateUniteCompensation = (id : number, uniteCompensationId : number, input : UniteCompensationUpdateDto) =>
        this.restService.request<any , void> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/unites-compensations/${uniteCompensationId}`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    setUniteCompensationOptions = (id : number, uniteCompensationId : number, input : UniteCompensationOptionsDto) =>
        this.restService.request<any , void> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/unites-compensations/${uniteCompensationId}/set-options`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    addMatiere = (id : number, periodeId : number, input : MatiereConfigCreateDto) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "POST",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    getMatieres = (id : number, periodeId : number, withDetails? : boolean) =>
        this.restService.request<any , MatiereConfigDto[]> ({
            method: "GET",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres`, 
 	 	 	params: { withDetails:withDetails} 
        },
        { apiName: this.apiName });
    

    getAllMatieres = (id : number, withDetails? : boolean) =>
        this.restService.request<any , MatiereConfigDto[]> ({
            method: "GET",
            url: `/api/config/niveaux-etudes/${id}/matieres`, 
 	 	 	params: { withDetails:withDetails} 
        },
        { apiName: this.apiName });
    

    removeMatiere = (id : number, periodeId : number, matiereId : number) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}`,  
        },
        { apiName: this.apiName });
    

    updateMatiere = (id : number, periodeId : number, matiereId : number, input : MatiereConfigUpdateDto) =>
        this.restService.request<any , void> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    setMatiereOptions = (id : number, periodeId : number, matiereId : number, input : MatiereOptionsDto) =>
        this.restService.request<any , void> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/set-options`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    removeMatiereSessionEvaluation = (id : number, periodeId : number, matiereId : number, sessionEvaluationId : number) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/sessions-evaluations/${sessionEvaluationId}`,  
        },
        { apiName: this.apiName });
    

    setMatiereUnitePedagogique = (id : number, periodeId : number, matiereId : number, unitePedagogiqueId : number) =>
        this.restService.request<any , void> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/set-unite-pedeagogique`, 
 	 	 	params: { unitePedagogiqueId:unitePedagogiqueId} 
        },
        { apiName: this.apiName });
    

    setMatiereUniteCompensation = (id : number, periodeId : number, matiereId : number, uniteCompensationId : number) =>
        this.restService.request<any , void> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/set-unite-compensation`, 
 	 	 	params: { uniteCompensationId:uniteCompensationId} 
        },
        { apiName: this.apiName });
    

    addMatiereExamen = (id : number, periodeId : number, matiereId : number, input : MatiereExamenCreateDto) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "POST",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/examens`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    removeMatiereExamen = (id : number, periodeId : number, matiereId : number, examenId : number) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/examens/${examenId}`,  
        },
        { apiName: this.apiName });
    

    updateMatiereExamen = (id : number, periodeId : number, matiereId : number, examenId : number, input : MatiereExamenUpdateDto) =>
        this.restService.request<any , void> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/examens/${examenId}`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    setMatiereExamenOptions = (id : number, periodeId : number, matiereId : number, examenId : number, input : MatiereExamenOptionsDto) =>
        this.restService.request<any , void> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/examens/${examenId}/set-options`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    lockMatiereExamen = (id : number, periodeId : number, matiereId : number, examenId : number) =>
        this.restService.request<any , void> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/examens/${examenId}/lock`,  
        },
        { apiName: this.apiName });
    

    unlockMatiereExamen = (id : number, periodeId : number, matiereId : number, examenId : number) =>
        this.restService.request<any , void> ({
            method: "PUT",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/examens/${examenId}/unlock`,  
        },
        { apiName: this.apiName });
    

    removeMatiereExamenSessionEvaluation = (id : number, periodeId : number, matiereId : number, examenId : number, sessionEvaluationId : number) =>
        this.restService.request<any , PromotionNiveauEtudeDto> ({
            method: "DELETE",
            url: `/api/config/niveaux-etudes/${id}/periodes/${periodeId}/matieres/${matiereId}/examens/${examenId}/sessions-evaluations/${sessionEvaluationId}`,  
        },
        { apiName: this.apiName });
    
}
    