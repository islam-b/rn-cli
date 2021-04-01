
import { AnneeAcademiqueEtat } from "../../../../dtos/itcomp/sgs/referentiels/models";

export interface AnneeAcademiqueCreateOrUpdateDto  { 
 	annee: number
 	dateDebutInscription: string
 	dateFinInscription: string
 	dateDebutEtude: string
 	dateFinEtude: string 
}

export interface AnneeAcademiqueDto  { 
 	annee: number
 	dateDebutInscription: string
 	dateFinInscription: string
 	dateDebutEtude: string
 	dateFinEtude: string
 	text: string
 	etat: AnneeAcademiqueEtat 
}

export interface AnneeAcademiqueLookupDto  { 
 	id: number
 	annee: number
 	text: string 
}

