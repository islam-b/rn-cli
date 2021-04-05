import { CodableReferenceDataLookupDto } from "../../../itcomp/reference-data/dtos/models";
export interface ReferentielBaseLookupDto extends CodableReferenceDataLookupDto<number, string> {
}
export declare enum AnneeAcademiqueEtat {
    Draft = 0,
    NotStarted = 1,
    InProgress = 2,
    Completed = 3
}
