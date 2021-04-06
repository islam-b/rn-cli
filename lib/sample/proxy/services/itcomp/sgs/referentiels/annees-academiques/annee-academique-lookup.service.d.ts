import { PagedAndSortedResultRequestDto } from "../../../../../dtos/volo/abp/application/dtos/models";
import { RestService } from "@itcomp/abp-rn";
export declare class AnneeAcademiqueLookupService {
    private restService;
    apiName: string;
    constructor(restService: RestService);
    get: (id: number) => any;
    search: (input: PagedAndSortedResultRequestDto) => any;
}
