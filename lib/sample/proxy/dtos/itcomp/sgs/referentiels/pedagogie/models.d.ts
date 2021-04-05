import { CodableReferenceDataLookupDto } from "../../../../itcomp/reference-data/dtos/models";
import { ReferentielBaseLookupDto } from "../../../../itcomp/sgs/referentiels/models";
export interface UnitePedagogiqueLookupDto extends CodableReferenceDataLookupDto<number, string> {
}
export interface MatiereLookupDto extends ReferentielBaseLookupDto {
}
