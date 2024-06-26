import { Injectable } from '@angular/core';
import languages from './languageFiles'
import { AllLanguages } from '../../app/Interfaces';


/**
 * Questo servizio e' stato implementato principalmente per coadiuvare
 * la creazione dinamica dello switch delle lingue, poiche' accedendo
 * alla variabile <languagesIterable> sara' possibile, tramite @for,
 * creare tutti i bottoni necessari senza preoccupari di aggiungerli
 * manualmente.
 */
@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  currentLanguage: string = 'ita';
  languages: AllLanguages = languages;
  languagesIterable: string[] = Object.keys(this.languages);

  switchLanguage(_: any, selectedLanguage: string){
    this.currentLanguage = selectedLanguage;
  }

  constructor() { 
  }
}
