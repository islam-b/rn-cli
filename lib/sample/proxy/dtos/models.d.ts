import { EntityDto, PagedResultRequestDto } from "./volo/abp/application/dtos/models";
import { AggregateRouteDto } from "./models";
export declare enum Status {
    ONREVIEW = 1,
    REJECTED = 2,
    PUBLISHED = 3
}
export interface ArticleDto extends EntityDto<string> {
    title: string;
    description: string;
    date: string;
    author: string;
    status: Status;
    content: string;
    keywords: string[];
}
export interface GetArticlesInputDto extends PagedResultRequestDto {
    filter: string;
}
export interface ArticleCreateOrUpdateDto {
    title: string;
    description: string;
    date: string;
    content: string;
    keywords: string[];
}
export interface AggregateRouteDto<T> {
}
export interface AuthorDto extends AggregateRouteDto<string> {
    id: string;
    birthDate: string;
    pictureUrl: string;
    email: string;
    name: string;
    surname: string;
    phoneNumber: string;
}
export interface AuthorRegisterDto {
    email: string;
    password: string;
    name: string;
    surname: string;
}
export interface AuthorUpdateDto {
    name: string;
    surname: string;
    birthDate: string;
    phoneNumber: string;
}
export interface GetCoursesInputDto extends PagedResultRequestDto {
    filter: string;
}
export declare enum Provider {
    Udemy = 100,
    Teachable = 200,
    Pluralsight = 300
}
export interface CourseDto extends EntityDto<string> {
    title: string;
    description: string;
    author: string;
    provider: Provider;
    date: string;
    note: number;
    nbViews: number;
}
export interface CourseCreateOrUpdateDto {
    title: string;
    description: string;
    author: string;
    provider: Provider;
    date: string;
    note: number;
    nbViews: number;
}
