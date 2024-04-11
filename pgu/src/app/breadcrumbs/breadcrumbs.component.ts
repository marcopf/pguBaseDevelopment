import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
	selector: 'app-breadcrumbs',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './breadcrumbs.component.html',
	styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent implements OnInit {
	currentRoute: string =		'';
	iterablePath: string[] =	[];

	/**
	 * Funzione chiamata all'inizio del ciclo di vita di un componente,
	 * permette in questo caso di osservare il cambiamento della path alla pressione dei vari
	 * RouterLink e di "splittare" l'url corrente in molti subLink che permettono di tornare
	 * alle fasi precedenti di navigazione
	 */
	ngOnInit(): void {
		this.router.events.subscribe(el=>{
			if (el instanceof NavigationEnd){
				this.currentRoute = el.url;
				this.iterablePath = this.currentRoute.split('/').filter(el=>el != '');
				this.iterablePath = this.iterablePath.map(el=>{
					return el.split('?')[0];
				}).filter(el=>el != '');
			}
		})
	}

	constructor(protected activatedRoute: ActivatedRoute, private router: Router){

	}
}
