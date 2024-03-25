import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';

interface TableConfig {
  link: string | null;
  type: "link" | "button" | null;
  text: string | null
}

@Component({
  selector: 'app-gestione-utenze',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './gestione-utenze.component.html',
  styleUrl: './gestione-utenze.component.scss'
})
export class GestioneUtenzeComponent {

}
