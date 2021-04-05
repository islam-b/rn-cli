import { PromotionCreateDto, PromotionGetListInput, PromotionGraduateDto, PromotionUpdateDto } from "../dtos/models";
import { RestService } from "@itcomp/abp-rn";
export declare class PromotionService {
    private restService;
    apiName: string;
    constructor(restService: RestService);
    create: (input: PromotionCreateDto) => any;
    delete: (id: number) => any;
    get: (id: number) => any;
    getList: (input: PromotionGetListInput) => any;
    graduate: (id: number, input: PromotionGraduateDto) => any;
    update: (id: number, input: PromotionUpdateDto) => any;
}
