import { Pipe, PipeTransform } from '@angular/core';
import { LanguagesService } from './languages.service';

@Pipe({
  name: 'translator',
  standalone: true
})
export class TranslatorPipe implements PipeTransform {
  
  /**
   * Questa pipe e' responsabile della selezione del label
   * adatto alla lingua correntemente selezionata.
   * 
   * una volta scelta da key e passata la lingua corrente la pipe
   * osservera' in autonomia ogni cambiamento sulla lingua selezionata
   * andando a modificare i label necessari
   * 
   * @param value - rappresenta la key in intrata, che verra' usata
   * per accedere all'oggetto json che contiene i label di tutte le lingue
   * 
   * @param currentLanguage - rappresenta la lingua correntemente selezionata,
   */
  transform(value: string, currentLanguage: string): string {
    return this.languagesService.languages[currentLanguage][value];
  }

  constructor(protected languagesService: LanguagesService){
  }
}
