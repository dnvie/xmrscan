import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent implements AfterViewInit {

  constructor(private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngAfterViewInit(): void {    
    this.transitionIn();
  }

  transitionIn() {
    setTimeout(() => document.getElementById('frame')?.classList.remove('hidden'), 100);
    setTimeout(() => scrollTo(0,0), 101);
  }

  transitionOut() {
    document.getElementById('frame')?.classList.add('hidden');
  }

  navigateToHome() {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/']), 10);
  }

}
