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
  currentRoute: string = '';
  iterablePath: string[] = [];

  constructor(protected activatedRoute: ActivatedRoute, private router: Router){

  }
  ngOnInit(): void {
    this.router.events.subscribe(el=>{
      if (el instanceof NavigationEnd){
        this.currentRoute = el.url;
        this.iterablePath = this.currentRoute.split('/').filter(el=>el != '');
      }
    })
  }
}
