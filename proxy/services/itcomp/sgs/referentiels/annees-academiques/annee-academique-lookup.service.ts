
import { AnneeAcademiqueLookupDto } from "../../../../../dtos/itcomp/sgs/referentiels/annees-academiques/models";
import { PagedAndSortedResultRequestDto, PagedResultDto } from "../../../../../dtos/volo/abp/application/dtos/models";
import { RestService } from "@itcomp/abp-rn"; 

export class AnneeAcademiqueLookupService  {
    
    apiName = "config"
    
    constructor(private restService: RestService) {}
    

    get = (id : number) =>
        this.restService.request<any , AnneeAcademiqueLookupDto> ({
            method: "GET",
            url: `/api/config/annees/lookup/${id}`,  
        },
        { apiName: this.apiName });
    

    search = (input : PagedAndSortedResultRequestDto) =>
        this.restService.request<any , PagedResultDto<AnneeAcademiqueLookupDto>> ({
            method: "GET",
            url: `/api/config/annees/lookup/search`, 
 	 	 	params: { skipCount:input.skipCount, maxResultCount:input.maxResultCount, sorting:input.sorting} 
        },
        { apiName: this.apiName });
    
}
    