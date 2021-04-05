import { PromotionGetListInput, PromotionNiveauEtudeGetListInput } from "../dtos/models";
import { RestService } from "@itcomp/abp-rn";
export declare class ConfigLookupService {
    private restService;
    apiName: string;
    constructor(restService: RestService);
    getPromotion: (id: number) => any;
    getPromotionsList: (input: PromotionGetListInput) => any;
    getNiveauEtude: (id: number) => any;
    getNiveauxEtudesList: (input: PromotionNiveauEtudeGetListInput) => any;
    getPeriodes: (promotionId: number, niveauEtudeId: number) => any;
    getSessionsEvaluationsList: (promotionId: number, niveauEtudeId: number, periodeId: number) => any;
    getUnitesPedagogiquesList: (promotionId: number, niveauEtudeId: number, periodeId: number) => any;
    getMatieresList: (promotionId: number, niveauEtudeId: number, periodeId: number) => any;
    getExamensList: (promotionId: number, niveauEtudeId: number, periodeId: number) => any;
    getMatieresExamensList: (promotionId: number, niveauEtudeId: number, periodeId: number, matiereId: number) => any;
    getUnitesCompensaionsList: (promotionId: number, niveauEtudeId: number) => any;
}
