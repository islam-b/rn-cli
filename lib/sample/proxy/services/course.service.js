"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
from;
"../dtos/volo/abp/application/dtos/models";
class CourseService {
    constructor(restService) {
        this.restService = restService;
        this.apiName = "blog";
        this.getList = (input) => this.restService.request({
            method: "GET",
            url: `/api/blog/courses`,
            params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount }
        }, { apiName: this.apiName });
        this.get = (id) => this.restService.request({
            method: "GET",
            url: `/api/blog/courses/${id}`,
        }, { apiName: this.apiName });
        this.create = (input) => this.restService.request({
            method: "POST",
            url: `/api/blog/courses`,
            data: input
        }, { apiName: this.apiName });
        this.update = (id, input) => this.restService.request({
            method: "PUT",
            url: `/api/blog/courses/${id}`,
            data: input
        }, { apiName: this.apiName });
        this.delete = (id) => this.restService.request({
            method: "DELETE",
            url: `/api/blog/courses/${id}`,
        }, { apiName: this.apiName });
    }
}
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map