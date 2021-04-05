import { GetCoursesInputDto, CourseCreateOrUpdateDto } from "../dtos/models";
import { RestService } from "@itcomp/abp-rn";
export declare class CourseService {
    private restService;
    apiName: string;
    constructor(restService: RestService);
    getList: (input: GetCoursesInputDto) => any;
    get: (id: string) => any;
    create: (input: CourseCreateOrUpdateDto) => any;
    update: (id: string, input: CourseCreateOrUpdateDto) => any;
    delete: (id: string) => any;
}
