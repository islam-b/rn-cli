
import { AnneeAcademiqueCreateOrUpdateDto, AnneeAcademiqueDto } from "../../../../../dtos/itcomp/sgs/referentiels/annees-academiques/models";
import { PagedAndSortedResultRequestDto, PagedResultDto } from "../../../../../dtos/volo/abp/application/dtos/models";
import { RestService } from "@itcomp/abp-rn"; 

export class AnneeAcademiqueService  {
    
    apiName = "config"
    
    constructor(private restService: RestService) {}
    

    create = (input : AnneeAcademiqueCreateOrUpdateDto) =>
        this.restService.request<any , AnneeAcademiqueDto> ({
            method: "POST",
            url: `/api/config/annees`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    delete = (id : number) =>
        this.restService.request<any , void> ({
            method: "DELETE",
            url: `/api/config/annees/${id}`,  
        },
        { apiName: this.apiName });
    

    confirm = (id : number) =>
        this.restService.request<any , AnneeAcademiqueDto> ({
            method: "PUT",
            url: `/api/config/annees/${id}/confirm`,  
        },
        { apiName: this.apiName });
    

    start = (id : number) =>
        this.restService.request<any , AnneeAcademiqueDto> ({
            method: "PUT",
            url: `/api/config/annees/${id}/start`,  
        },
        { apiName: this.apiName });
    

    close = (id : number) =>
        this.restService.request<any , AnneeAcademiqueDto> ({
            method: "PUT",
            url: `/api/config/annees/${id}/close`,  
        },
        { apiName: this.apiName });
    

    get = (id : number) =>
        this.restService.request<any , AnneeAcademiqueDto> ({
            method: "GET",
            url: `/api/config/annees/${id}`,  
        },
        { apiName: this.apiName });
    

    getList = (input : PagedAndSortedResultRequestDto) =>
        this.restService.request<any , PagedResultDto<AnneeAcademiqueDto>> ({
            method: "GET",
            url: `/api/config/annees`, 
 	 	 	params: { skipCount:input.skipCount, maxResultCount:input.maxResultCount, sorting:input.sorting} 
        },
        { apiName: this.apiName });
    

    update = (id : number, input : AnneeAcademiqueCreateOrUpdateDto) =>
        this.restService.request<any , AnneeAcademiqueDto> ({
            method: "PUT",
            url: `/api/config/annees/${id}`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    
}
    