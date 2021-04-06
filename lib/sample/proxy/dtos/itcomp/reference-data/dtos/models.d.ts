export interface ReferenceDataLookupDto<TKey> {
    id: TKey;
    label: string;
    text: string;
}
export interface CodableReferenceDataLookupDto<TKey, TCode> extends ReferenceDataLookupDto<TKey> {
    code: TCode;
}
