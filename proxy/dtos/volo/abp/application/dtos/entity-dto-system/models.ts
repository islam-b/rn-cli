
import { EntityDto } from "../../../../../dtos/volo/abp/application/dtos/models";

export interface EntityDto<TKey> extends EntityDto { 
 	id: TKey 
}

