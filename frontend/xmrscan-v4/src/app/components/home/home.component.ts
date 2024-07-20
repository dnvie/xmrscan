import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Home } from '../../data/home';
import { HomeService } from '../../service/home.service';
import { filter } from 'rxjs/operators'
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnInit{

  loading = true;
  home: Home = {
    blocks: undefined,
    txs: []
  }

  constructor(private router: Router, private service: HomeService, private _snackBar: MatSnackBar) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event => {
      if (
        event.id === 1 &&
        event.url === event.urlAfterRedirects
      ) {
          sessionStorage.clear();
      }
    })
  }

  ngAfterViewInit(): void {
    this.transitionIn();
  }

  getItemsArray(length: number): number[] {
    return Array.from({ length }, (_, index) => index + 1);
  }

  revealSkeletonRow(id: number) {
    document.getElementById('skeleton' + id)?.classList.remove('hidden');
  }

  revealSkeletonRow2(id: number) {
    document.getElementById('skeleton2.' + id)?.classList.remove('hidden');
  }

  reveal() {
    for (let i = 0; i < 22; i++) {
      setTimeout(() => this.revealSkeletonRow(i), 15*i);
      setTimeout(() => this.revealSkeletonRow2(i), 15*i+10);
    }
  }

  transitionOut() {
    document.getElementById('part1')?.classList.add('hidden');
    document.getElementById('part2')?.classList.add('hidden');
  }

  transitionIn() {
    setTimeout(() => document.getElementById('part1')?.classList.remove('hidden'), 100);
    setTimeout(() => document.getElementById('part2')?.classList.remove('hidden'), 100);
    setTimeout(() => scrollTo(0,0), 101);
    setTimeout(() => this.reveal(), 150);
  }

  navigateToBlocks() {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/blocks']), 10);
  }

  navigateToMempool() {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/mempool']), 10);
  }

  navigateToBlock(block: number) {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/block/' + block]), 10);
  }

  navigateToTx(hash: string) {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/transaction/' + hash]), 10);
  }

  loadHome() {
    if (sessionStorage.getItem('home') === null) {
      this.service.getHome().subscribe(
        data => {
          this.home = data;
          this.loading = false;
        },
        error => {
          console.log("error loading home", error);
          this.openSnackBar("Failed to load data!", "Close");
        },
        () => {
          sessionStorage.setItem('home', JSON.stringify(this.home));
        }
      );
    } else {
      this.home = JSON.parse(sessionStorage.getItem('home')!);
      this.loading = false
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.loadHome();
  }
}


