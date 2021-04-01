
import { EntityDto, PagedAndSortedResultRequestDto } from "../dtos/volo/abp/application/dtos/models";

export interface PromotionLookupDto extends EntityDto<number> { 
 	code: string
 	label: string
 	anneeEntree: number
 	anneeSortie: number
 	cycleId: number
 	cycleLabel: string
 	text: string 
}

export interface PromotionGetListInput extends PagedAndSortedResultRequestDto { 
 	filter: string
 	annee?: number
 	graduated?: boolean
 	cycleId?: number
 	code: string
 	label: string 
}

export interface PromotionNiveauEtudeLookupDto  { 
 	id: number
 	promotionId: number
 	niveauEtudeId: number
 	annee: number
 	code: string
 	label: string
 	promotionLabel: string
 	text: string 
}

export interface PromotionNiveauEtudeGetListInput extends PagedAndSortedResultRequestDto { 
 	filter: string
 	promotionId?: number
 	annee?: number
 	locked?: boolean 
}

export interface UniteCompensationLookupDto  { 
 	id: number
 	code: string
 	label: string
 	text: string 
}

export interface PromotionOptionsDto  { 
 	cycleId: number
 	nombreRedoublement: number 
}

export interface PromotionCreateOrUpdateBaseDto  { 
 	code: string
 	label: string
 	anneeEntree: number
 	anneeSortie: number
 	dateEntree: string
 	quota: number
 	options: PromotionOptionsDto[] 
}

export interface PromotionCreateDto extends PromotionCreateOrUpdateBaseDto { 
 	cycleId: number 
}

export interface PromotionDto extends EntityDto<number> { 
 	code: string
 	label: string
 	anneeEntree: number
 	anneeSortie: number
 	dateEntree: string
 	dateSortie?: string
 	quota: number
 	cycleId: number
 	cycleLabel: string
 	options: PromotionOptionsDto[] 
}

export interface PromotionGraduateDto  { 
 	dateSortie: string
 	code: string
 	label: string 
}

export interface PromotionUpdateDto extends PromotionCreateOrUpdateBaseDto {  
}

export interface NiveauEtudeOptionsDto  { 
 	moyenneAcquisition: number
 	moyenneRachat: number
 	moyenneMinimaleRedoublement: number
 	coefficient: number
 	creditsRequis: number
 	creditsCumulesRequis: number
 	systemeCreditEnabled: boolean
 	systemeNotationLettreEnabled: boolean
 	compensationInterPeriodeEnabled: boolean
 	contientChoix: boolean
 	contientExamenSortie: boolean
 	finCycle: boolean
 	visibleChoix: boolean 
}

export interface PromotionNiveauEtudeCreateOrUpdateDto  { 
 	niveauEtudeId: number
 	annee: number
 	options: NiveauEtudeOptionsDto 
}

export interface PromotionNiveauEtudeCreateDto extends PromotionNiveauEtudeCreateOrUpdateDto { 
 	promotionId: number 
}

export interface PromotionNiveauEtudeDto extends EntityDto<number> { 
 	promotionId: number
 	niveauEtudeId: number
 	annee: number
 	code: string
 	label: string
 	locked: boolean
 	options: NiveauEtudeOptionsDto
 	text: string 
}

export interface PromotionNiveauEtudeGetListDto extends EntityDto<number> { 
 	promotionId: number
 	niveauEtudeId: number
 	annee: number
 	code: string
 	label: string
 	contientChoix: boolean
 	contientExamenSortie: boolean
 	finCycle: boolean
 	locked: boolean 
}

export interface NiveauEtudeLockDto  {  
}

export interface PromotionNiveauEtudeUpdateDto extends PromotionNiveauEtudeCreateOrUpdateDto {  
}

export interface PeriodeOptionsDto  { 
 	systemeDetteEnabled: boolean
 	compensationPeriodeEnabled: boolean
 	creditsRequis: number
 	creditsCumulesRequis: number
 	coefficient: number
 	moyenneAcquisition: number
 	moyenneRachat: number 
}

export interface PeriodeConfigCreateOrUpdateDto  { 
 	code: string
 	label: string
 	options: PeriodeOptionsDto 
}

export interface PeriodeConfigCreateDto extends PeriodeConfigCreateOrUpdateDto { 
 	periodeId: number 
}

export interface PeriodeConfigDto  { 
 	id: number
 	promotionNiveauEtudeId: number
 	periodeId: number
 	order: number
 	options: PeriodeOptionsDto
 	code: string
 	label: string
 	text: string 
}

export interface PeriodeConfigUpdateDto extends PeriodeConfigCreateOrUpdateDto {  
}

export interface SessionEvaluationConfigCreateOrUpdateDto  { 
 	dateDeliberation?: string 
}

export interface SessionEvaluationConfigCreateDto extends SessionEvaluationConfigCreateOrUpdateDto { 
 	sessionEvaluationId: number 
}

export interface SessionEvaluationConfigDto  { 
 	id: number
 	periodeId: number
 	sessionEvaluationId: number
 	dateDeliberation?: string
 	code: string
 	label: string
 	order: number
 	text: string 
}

export interface SessionEvaluationConfigUpdateDto extends SessionEvaluationConfigCreateOrUpdateDto {  
}

export interface SessionEvaluationConfigChangeOrderDto  { 
 	sessionEvaluationId: number
 	newOrder: number 
}

export interface ExamenConfigCreateOrUpdateDto  { 
 	dateDebut?: string
 	dateFin?: string 
}

export interface ExamenConfigCreateDto extends ExamenConfigCreateOrUpdateDto { 
 	examenId: number 
}

export interface ExamenConfigDto  { 
 	id: number
 	periodeId: number
 	examenId: number
 	dateDebut?: string
 	dateFin?: string
 	code: string
 	label: string
 	text: string 
}

export interface ExamenConfigUpdateDto extends ExamenConfigCreateOrUpdateDto {  
}

export interface UnitePedagogiqueOptionsDto  { 
 	choixMatiere: boolean
 	nombreMatieresRequises: number
 	nombreMatieresChoix: number
 	nombreMatieresObligatoires: number
 	moyenneAcquisition: number
 	coefficient: number 
}

export interface UnitePedagogiqueConfigCreateOrUpdateDto  { 
 	options: UnitePedagogiqueOptionsDto 
}

export interface UnitePedagogiqueConfigCreateDto extends UnitePedagogiqueConfigCreateOrUpdateDto { 
 	unitePedagogiqueId: number 
}

export interface UnitePedagogiqueConfigDto  { 
 	id: number
 	periodeId: number
 	unitePedagogiqueId: number
 	options: UnitePedagogiqueOptionsDto
 	code: string
 	label: string
 	text: string 
}

export interface UnitePedagogiqueConfigUpdateDto extends UnitePedagogiqueConfigCreateOrUpdateDto {  
}

export interface UniteCompensationCreateOrUpdateDto  { 
 	code: string
 	label: string
 	description: string 
}

export interface UniteCompensationCreateDto extends UniteCompensationCreateOrUpdateDto {  
}

export interface UniteCompensationOptionsDto  { 
 	sessionEvaluationId: number
 	moyenneCompensation: number
 	noteMinimaleCompensation: number
 	sessionEvaluationCode: string
 	sessionEvaluationLabel: string 
}

export interface UniteCompensationDto  { 
 	id: number
 	code: string
 	label: string
 	promotionNiveauEtudeId: number
 	description: string
 	options: UniteCompensationOptionsDto[] 
}

export interface UniteCompensationUpdateDto extends UniteCompensationCreateOrUpdateDto {  
}

export interface MatiereConfigCreateOrUpdateDto  { 
 	volumeHoraire: number
 	credit: number 
}

export interface MatiereConfigCreateDto extends MatiereConfigCreateOrUpdateDto { 
 	matiereId: number 
}

export interface MatiereOptionsDto  { 
 	sessionEvaluationId: number
 	coefficient: number
 	compensation: boolean
 	noteEliminatoire: number
 	moyenneAcquisition: number
 	moyenneMinimaleAccesSession: number
 	formuleCalculMoyenne: string
 	sessionEvaluationCode: string
 	sessionEvaluationLabel: string 
}

export interface MatiereExamenOptionsDto  { 
 	sessionEvaluationId: number
 	coefficient: number
 	facultatif: boolean
 	sessionEvaluationCode: string
 	sessionEvaluationLabel: string 
}

export interface MatiereExamenDto  { 
 	id: number
 	niveauEtudeMatiereId: number
 	examenId: number
 	locked: boolean
 	examenCode: string
 	examenLabel: string
 	options: MatiereExamenOptionsDto[] 
}

export interface MatiereConfigDto  { 
 	id: number
 	niveauEtudePeriodeId: number
 	matiereId: number
 	periodeId: number
 	unitePedagogiqueId?: number
 	uniteCompensationId?: number
 	volumeHoraire: number
 	credit: number
 	options: MatiereOptionsDto[]
 	examens: MatiereExamenDto[]
 	matiereCode: string
 	matiereLabel: string
 	periodeCode: string
 	periodeLabel: string 
}

export interface MatiereConfigUpdateDto extends MatiereConfigCreateOrUpdateDto {  
}

export interface MatiereExamenCreateDto  { 
 	examenId: number 
}

export interface MatiereExamenUpdateDto  { 
 	examenId: number
 	options: MatiereExamenOptionsDto[] 
}

