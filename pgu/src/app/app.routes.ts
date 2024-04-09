import { Routes } from '@angular/router';
import { GestioneUtenzeComponent } from './gestione-utenze/gestione-utenze.component';
import Guard from './guard.routes'
import { HomeComponent } from './home/home.component';
import { DettaglioUtenteComponent } from './gestione-utenze/dettaglio-utente/dettaglio-utente.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

let guard = new Guard();

export const routes: Routes = [
    {path: "gestione-utenti", component: GestioneUtenzeComponent, title: "Gestione-Utenti", canActivate: [guard.isLogged], data: {title: 'test'}},
    {path: "gestione-utenti/dettaglio-utente", component: DettaglioUtenteComponent, title: "Gestione-Utenti", canActivate: [guard.isLogged], data: {title: 'test'}},
    {path: "gestione-ambiente", component: GestioneUtenzeComponent, title: "Gestione-Ambiente", canActivate: [guard.isLogged]},
    {path: "", component: HomeComponent, title: "| Home"},
    {path: "**", component: NotFoundPageComponent, title: "| 404 Not Found"}
];
