

export interface EntityDto  {  
}

export interface LimitedResultRequestDto  { 
 	defaultMaxResultCount: number
 	maxMaxResultCount: number
 	maxResultCount: number 
}

export interface PagedResultRequestDto extends LimitedResultRequestDto { 
 	skipCount: number 
}

export interface ListResultDto<T>  { 
 	items: T[] 
}

export interface PagedResultDto<T> extends ListResultDto<T> { 
 	totalCount: number 
}

