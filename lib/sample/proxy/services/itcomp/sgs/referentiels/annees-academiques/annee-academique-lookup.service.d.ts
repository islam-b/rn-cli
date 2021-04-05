import { RestService } from "@itcomp/abp-rn";
export declare class AnneeAcademiqueLookupService {
    private restService;
    apiName: string;
    constructor(restService: RestService);
    get: (id: number) => any;
    search: (input: any) => any;
}
