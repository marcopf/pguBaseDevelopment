import { Routes } from '@angular/router';
import { GestioneUtenzeComponent } from './gestione-utenze/gestione-utenze.component';

export const routes: Routes = [
    {path: "gestione-utenze", component: GestioneUtenzeComponent, title: "Gestione-Utenze"},
    {path: "gestione-ambiente", component: GestioneUtenzeComponent, title: "Gestione-Ambiente"},
    // {path: "**", component: GestioneUtenzeComponent, title: "Gestione-Utenze"}
];
