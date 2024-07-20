import { AfterViewInit, Component, Input, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BlocksService } from '../../service/blocks.service';
import { filter } from 'rxjs/operators'
import { Blocks } from '../../data/blocks';
import { Mempool } from '../../data/mempool';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-blocks-mempool',
  standalone: true,
  imports: [MatPaginatorModule, MatSnackBarModule],
  templateUrl: './blocks-mempool.component.html',
  styleUrl: './blocks-mempool.component.scss'
})
export class BlocksMempoolComponent implements AfterViewInit, OnInit {

  currentPage = 0;
  totalPages = 0;
  pageSize = 25;
  
  isMobile: boolean = false;
  loading = true;
  blocks: Blocks = {
    blocks: [],
  }
  mempool: Mempool = {
      data: undefined
    }

  @Input()
  mode!: number;

  constructor(private router: Router, private route: ActivatedRoute, private service : BlocksService, private _snackBar: MatSnackBar) {
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

  transitionIn() {
    setTimeout(() => document.getElementById('frame')?.classList.remove('hidden'), 100);
    setTimeout(() => scrollTo(0,0), 101);
    setTimeout(() => this.reveal(), 150);
    setTimeout(() => document.getElementById('path')?.classList.remove('hidden'), 100);
    if (this.mode === 0) {
      setTimeout(() => this.revealBadges(), 800);
    }
  }

  transitionOut() {
    document.getElementById('frame')?.classList.add('hidden');
    document.getElementById('path')?.classList.add('hidden');
  }

  navigateToHome() {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/']), 10);
  }

  navigateToBlock(height: number) {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/block/' + height]), 10);
  }

  navigateToTx(hash: string) {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/transaction/' + hash]), 10);
  }

  reveal() {
    for (let i = 0; i < 26; i++) {
      setTimeout(() => this.revealSkeletonRow(i), 15*i);
    }
  }

  instantReveal() {
    for (let i = 0; i < 26; i++) {
      setTimeout(() => this.revealSkeletonRow(i), 1*i);
    }
  }

  revealBadges() {    
    for (let i = 0; i < 50; i++) {      
      setTimeout(() => document.getElementById('newBadge' + i)?.classList.remove('unrevealed'), 25*i);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isMobile = window.innerWidth <= 760;
  }

  loadBlocks() {
    if (sessionStorage.getItem('blocks'+this.currentPage) === null) {
      this.service.getBlocks(this.currentPage).subscribe(
        data => {
          this.blocks = data;
          this.loading = false;
          this.totalPages = this.blocks.total_page_no!*this.pageSize;
        },
        error => {
          console.log("error loading blocks", error);
          this.openSnackBar("Failed to load blocks!", "Close");
          setTimeout(() => this.navigateToHome(), 300);
        },
        () => {
          sessionStorage.setItem('blocks'+this.currentPage, JSON.stringify(this.blocks));
        }
      );
    } else {
      this.blocks = JSON.parse(sessionStorage.getItem('blocks'+this.currentPage)!);
      this.totalPages = this.blocks.total_page_no!*this.pageSize;
      this.loading = false;
    }
  }

  loadMempool() {
    if (sessionStorage.getItem('mempool') === null) {
      this.service.getMempool().subscribe(
        data => {
          this.mempool = data;
          this.loading = false;
        },
        error => {
          console.log("error loading mempool", error);
          this.openSnackBar("Failed to load mempool!", "Close");
          setTimeout(() => this.navigateToHome(), 300);
        },
        () => {
          sessionStorage.setItem('mempool', JSON.stringify(this.mempool));
        }
      );
    } else {
      this.mempool = JSON.parse(sessionStorage.getItem('mempool')!);
      this.loading = false
    }
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loading = true;
    this.instantReveal();
    this.loadBlocks();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.mode = data['mode'];
      if (this.mode === 0) {
        this.loadBlocks();
      } else {
        this.loadMempool();
      }
    });
    this.checkScreenWidth();
  }
}
