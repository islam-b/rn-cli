
import { EntityDto } from "./../../../../..volo/abp/application/dtos/models";

export interface EntityDto<TKey> extends EntityDto { 
 	id: TKey 
}

