import { Pipe, PipeTransform } from '@angular/core';
import italian_language from './italian'
import english_language from './english';
import { LanguagesService } from './languages.service';

interface Labels{
  [key: string]: string
}

interface AllLanguages{
  [key: string]: Labels
}

const languages: AllLanguages = {
  ita: italian_language,
  eng: english_language
}

@Pipe({
  name: 'translator',
  standalone: true
})
export class TranslatorPipe implements PipeTransform {

  transform(value: string, currentLanguage: string): string {
    return languages[currentLanguage][value];
  }

}
