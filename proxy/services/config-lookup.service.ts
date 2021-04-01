
import { PromotionLookupDto, PromotionGetListInput, PromotionNiveauEtudeLookupDto, PromotionNiveauEtudeGetListInput, UniteCompensationLookupDto } from "../dtos/models";
import { PeriodeLookupDto } from "../dtos/itcomp/sgs/referentiels/organisation/models";
import { SessionEvaluationLookupDto, ExamenLookupDto } from "../dtos/itcomp/sgs/referentiels/evaluation/models";
import { UnitePedagogiqueLookupDto, MatiereLookupDto } from "../dtos/itcomp/sgs/referentiels/pedagogie/models";
import { RestService } from "@itcomp/abp-rn"; 

export class ConfigLookupService  {
    
    apiName = "config"
    
    constructor(private restService: RestService) {}
    

    getPromotion = (id : number) =>
        this.restService.request<any , PromotionLookupDto> ({
            method: "GET",
            url: `/api/config/lookup/promotions/${id}`,  
        },
        { apiName: this.apiName });
    

    getPromotionsList = (input : PromotionGetListInput) =>
        this.restService.request<any , PromotionLookupDto[]> ({
            method: "GET",
            url: `/api/config/lookup/promotions`, 
 	 	 	params: { filter:input.filter, annee:input.annee, graduated:input.graduated, cycleId:input.cycleId, code:input.code, label:input.label, sorting:input.sorting, skipCount:input.skipCount, maxResultCount:input.maxResultCount} 
        },
        { apiName: this.apiName });
    

    getNiveauEtude = (id : number) =>
        this.restService.request<any , PromotionNiveauEtudeLookupDto> ({
            method: "GET",
            url: `/api/config/lookup/niveaux-etudes/${id}`,  
        },
        { apiName: this.apiName });
    

    getNiveauxEtudesList = (input : PromotionNiveauEtudeGetListInput) =>
        this.restService.request<any , PromotionNiveauEtudeLookupDto[]> ({
            method: "GET",
            url: `/api/config/lookup/niveaux-etudes`, 
 	 	 	params: { filter:input.filter, promotionId:input.promotionId, annee:input.annee, locked:input.locked, sorting:input.sorting, skipCount:input.skipCount, maxResultCount:input.maxResultCount} 
        },
        { apiName: this.apiName });
    

    getPeriodes = (promotionId : number, niveauEtudeId : number) =>
        this.restService.request<any , PeriodeLookupDto[]> ({
            method: "GET",
            url: `/api/config/lookup/periodes/${promotionId}/${niveauEtudeId}`,  
        },
        { apiName: this.apiName });
    

    getSessionsEvaluationsList = (promotionId : number, niveauEtudeId : number, periodeId : number) =>
        this.restService.request<any , SessionEvaluationLookupDto[]> ({
            method: "GET",
            url: `/api/config/lookup/sessions-evaluations/${promotionId}/${niveauEtudeId}/${periodeId}`,  
        },
        { apiName: this.apiName });
    

    getUnitesPedagogiquesList = (promotionId : number, niveauEtudeId : number, periodeId : number) =>
        this.restService.request<any , UnitePedagogiqueLookupDto[]> ({
            method: "GET",
            url: `/api/config/lookup/unites-pedagogiques/${promotionId}/${niveauEtudeId}/${periodeId}`,  
        },
        { apiName: this.apiName });
    

    getMatieresList = (promotionId : number, niveauEtudeId : number, periodeId : number) =>
        this.restService.request<any , MatiereLookupDto[]> ({
            method: "GET",
            url: `/api/config/lookup/matieres/${promotionId}/${niveauEtudeId}/${periodeId}`,  
        },
        { apiName: this.apiName });
    

    getExamensList = (promotionId : number, niveauEtudeId : number, periodeId : number) =>
        this.restService.request<any , ExamenLookupDto[]> ({
            method: "GET",
            url: `/api/config/lookup/examens/${promotionId}/${niveauEtudeId}/${periodeId}`,  
        },
        { apiName: this.apiName });
    

    getMatieresExamensList = (promotionId : number, niveauEtudeId : number, periodeId : number, matiereId : number) =>
        this.restService.request<any , ExamenLookupDto[]> ({
            method: "GET",
            url: `/api/config/lookup/matieres/${promotionId}/${niveauEtudeId}/${periodeId}/${matiereId}/examens`,  
        },
        { apiName: this.apiName });
    

    getUnitesCompensaionsList = (promotionId : number, niveauEtudeId : number) =>
        this.restService.request<any , UniteCompensationLookupDto[]> ({
            method: "GET",
            url: `/api/config/lookup/unites-compensations/${promotionId}/${niveauEtudeId}`,  
        },
        { apiName: this.apiName });
    
}
    