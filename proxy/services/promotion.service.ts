
import { PromotionCreateDto, PromotionDto, PromotionGetListInput, PromotionGraduateDto, PromotionUpdateDto } from "../dtos/models";
import { PagedResultDto } from "../dtos/volo/abp/application/dtos/models";
import { RestService } from "@itcomp/abp-rn"; 

export class PromotionService  {
    
    apiName = "config"
    
    constructor(private restService: RestService) {}
    

    create = (input : PromotionCreateDto) =>
        this.restService.request<any , PromotionDto> ({
            method: "POST",
            url: `/api/config/promotions`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    delete = (id : number) =>
        this.restService.request<any , void> ({
            method: "DELETE",
            url: `/api/config/promotions/${id}`,  
        },
        { apiName: this.apiName });
    

    get = (id : number) =>
        this.restService.request<any , PromotionDto> ({
            method: "GET",
            url: `/api/config/promotions/${id}`,  
        },
        { apiName: this.apiName });
    

    getList = (input : PromotionGetListInput) =>
        this.restService.request<any , PagedResultDto<PromotionDto>> ({
            method: "GET",
            url: `/api/config/promotions`, 
 	 	 	params: { filter:input.filter, annee:input.annee, graduated:input.graduated, cycleId:input.cycleId, code:input.code, label:input.label, sorting:input.sorting, skipCount:input.skipCount, maxResultCount:input.maxResultCount} 
        },
        { apiName: this.apiName });
    

    graduate = (id : number, input : PromotionGraduateDto) =>
        this.restService.request<any , PromotionDto> ({
            method: "PUT",
            url: `/api/config/promotions/${id}/graduate`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    update = (id : number, input : PromotionUpdateDto) =>
        this.restService.request<any , PromotionDto> ({
            method: "PUT",
            url: `/api/config/promotions/${id}`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    
}
    