import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurazioneIstituzioneService {
  NOME_ISTITUZIONE: string = "Ministero dell'Ambiente e della Sicurezza Energetica";
  TAGLINE_ISTITUZIONE: string = "";
  LOGO_ISTITUZIONE: string = "/assets/imgs/maseLogo.png";

  constructor() { }
}
