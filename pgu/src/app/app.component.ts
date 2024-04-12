import { Component } from '@angular/core';
import { NavigationEnd, Route, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ScrollerComponent } from './scroller/scroller.component';
import { CookieRequestComponent } from './cookie-request/cookie-request.component';
import { BottomNavbarComponent } from './bottom-navbar/bottom-navbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ScrollerComponent, CookieRequestComponent, BottomNavbarComponent, BreadcrumbsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pgu';

  constructor(private router: Router, private viewportScroller: ViewportScroller){
    this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
			  // Scroll to the bottom after navigation
			  this.viewportScroller.scrollToPosition([0, 0]);
			}
		  });
  }
}
