import { Routes } from '@angular/router';
import { GestioneUtenzeComponent } from './gestione-utenze/gestione-utenze.component';
import Guard from './guard.routes'

let guard = new Guard();

export const routes: Routes = [
    {path: "gestione-utenze", component: GestioneUtenzeComponent, title: "Gestione-Utenze", canActivate: [guard.isLogged]},
    {path: "gestione-ambiente", component: GestioneUtenzeComponent, title: "Gestione-Ambiente", canActivate: [guard.isLogged]},
    // {path: "**", component: GestioneUtenzeComponent, title: "Gestione-Utenze"}
];
