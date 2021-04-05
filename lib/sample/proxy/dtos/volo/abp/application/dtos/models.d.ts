import { ListResultDto } from "../../../../volo/abp/application/dtos/models";
export interface EntityDto {
}
export interface EntityDto<TKey> extends EntityDto {
    id: TKey;
}
export interface LimitedResultRequestDto {
    defaultMaxResultCount: number;
    maxMaxResultCount: number;
    maxResultCount: number;
}
export interface PagedResultRequestDto extends LimitedResultRequestDto {
    skipCount: number;
}
export interface ListResultDto<T> {
    items: T[];
}
export interface PagedResultDto<T> extends ListResultDto<T> {
    totalCount: number;
}
