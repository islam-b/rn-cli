
import { GetCoursesInputDto, CourseDto, CourseCreateOrUpdateDto } from "../dtos/models";
import { RestService } from "@itcomp/abp-rn"; 

export class CourseService  {
    
    apiName = "blog"
    
    constructor(private restService: RestService) {}
    

    GetListService = (input : GetCoursesInputDto) =>
        this.restService.request<any , PagedResultDto<CourseDto>> ({
            method: "GET",
            url: `/api/blog/courses`, 
 	 	 	params: { filter:input.filter, skipCount:input.skipCount, maxResultCount:input.maxResultCount} 
        },
        { apiName: this.apiName });
    

    GetService = (id : string) =>
        this.restService.request<any , CourseDto> ({
            method: "GET",
            url: `/api/blog/courses/${id}`,  
        },
        { apiName: this.apiName });
    

    CreateService = (input : CourseCreateOrUpdateDto) =>
        this.restService.request<any , CourseDto> ({
            method: "POST",
            url: `/api/blog/courses`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    UpdateService = (id : string, input : CourseCreateOrUpdateDto) =>
        this.restService.request<any , CourseDto> ({
            method: "PUT",
            url: `/api/blog/courses/${id}`,  
 	 	 	body: input
        },
        { apiName: this.apiName });
    

    DeleteService = (id : string) =>
        this.restService.request<any , void> ({
            method: "DELETE",
            url: `/api/blog/courses/${id}`,  
        },
        { apiName: this.apiName });
    
}
    