import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { SearchService } from '../../service/search.service';
import { Search } from '../../data/search';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @ViewChild('headerSearchBar') headerSearchBar!: ElementRef;

  searchInput: string = '';
  searchResult: Search = {
    Type: 0,
    Block: undefined,
    Tx: undefined
  }

  constructor(private router: Router, private service: SearchService) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url !== '/') {
          setTimeout(() => this.compact(), 100);
        } else {
          scrollTo(0,0);
          setTimeout(() => this.expand(), 100);
        }
      }
  });
  }

  compact() {
    document.getElementById('header')?.classList.add('compact');
    document.getElementById('headerContainer')?.classList.add('compact');
    document.getElementById('headerSearchBar')?.classList.add('compact');
    document.getElementById('searchButton')?.classList.add('compact');
    document.getElementById('gradient')?.classList.add('compact');
    document.getElementById('clearSearch')?.classList.add('compact');
  }

  expand() {
    document.getElementById('header')?.classList.remove('compact');
    document.getElementById('headerContainer')?.classList.remove('compact');
    document.getElementById('headerSearchBar')?.classList.remove('compact');
    document.getElementById('searchButton')?.classList.remove('compact');
    document.getElementById('gradient')?.classList.remove('compact');
    document.getElementById('clearSearch')?.classList.remove('compact');
  }

  navigateToBlock(height: number) {
    this.compact();
    setTimeout(() => this.router.navigate(['/block/' + height]), 10);
  }

  navigateToTransaction(hash: string) {
    this.compact();
    setTimeout(() => this.router.navigate(['/transaction/' + hash]), 10);
  }

  navigateTo404() {
    this.compact();
    setTimeout(() => this.router.navigate(['/404']), 10);
  }

  search(event: KeyboardEvent) {
    if (event.keyCode === 13 || event.key === 'Enter' || event.code === 'Enter') {
      this.service.getSearchResult(this.searchInput.trim()).subscribe(
        data => {
          this.searchResult = data;
          if (this.searchResult.Type == 0) {
            this.navigateToBlock(this.searchResult.Block!.data!.block_height);
          } else if (this.searchResult.Type == 1) {
            this.navigateToTransaction(this.searchResult.Tx!.data!.tx_hash);
          } else {
            this.navigateTo404();
          }
        },
        error => {
          this.navigateTo404();
        }
      );
      setTimeout(() => this.clearSearch(), 500);
    }
  }

  searchFromButton() {
    this.service.getSearchResult(this.searchInput.trim()).subscribe(
      data => {
        this.searchResult = data;
        if (this.searchResult.Type == 0) {
          this.navigateToBlock(this.searchResult.Block!.data!.block_height);
        } else if (this.searchResult.Type == 1) {
          this.navigateToTransaction(this.searchResult.Tx!.data!.tx_hash);
        } else {
          this.navigateTo404();
        }
      },
      error => {
        this.navigateTo404();
      }
    );
    setTimeout(() => this.clearSearch(), 500);
  }

  clearSearch(): void {
    this.animateClear();
  }

  animateClear(): void {
    const interval = 0;
    const inputElement = this.headerSearchBar.nativeElement;

    const clearStep = () => {
      if (this.searchInput.length > 0) {
        this.searchInput = this.searchInput.slice(0, -1);
        setTimeout(clearStep, interval);
      } else {
        inputElement.focus();
      }
    };

    clearStep();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (this.router.url === "/") {
      if (window.scrollY > 25) {
        this.compact();
      } else {
        this.expand();
      }
    }
  }
}
