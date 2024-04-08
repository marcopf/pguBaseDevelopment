import { Component } from '@angular/core';
import { ConfigurazioneIstituzioneService } from '../configurazione-istituzione.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(protected configurazione: ConfigurazioneIstituzioneService){
    
  }
}
