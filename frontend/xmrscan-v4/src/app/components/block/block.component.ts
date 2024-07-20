import { Block } from '../../data/block';
import { AfterViewInit, OnInit, Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators'
import { BlocksService } from '../../service/blocks.service';
import { Title } from '@angular/platform-browser';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss'
})
export class BlockComponent implements AfterViewInit, OnInit {

  loading = true;
  blockHeight: string = this.route.snapshot.params['height'] || '';
  block: Block = {
    data: undefined,
    status: undefined
  }

  constructor(private router: Router, private route: ActivatedRoute, private service: BlocksService, private titleService: Title, private _snackBar: MatSnackBar) {
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

  transitionIn() {
    setTimeout(() => document.getElementById('frame')?.classList.remove('hidden'), 100);
    setTimeout(() => scrollTo(0,0), 101);
    setTimeout(() => this.reveal(), 150);
    setTimeout(() => document.getElementById('path')?.classList.remove('hidden'), 100);
  }

  transitionOut() {
    document.getElementById('frame')?.classList.add('hidden');
    document.getElementById('path')?.classList.add('hidden');
  }

  reveal() {
    for (let i = 0; i < 28; i++) {
      setTimeout(() => this.revealSkeletonRow(i), 15*i);
    }
  }

  revealSkeletonRow(id: number) {
    document.getElementById('skeleton' + id)?.classList.remove('hidden');
  }

  navigateToHome() {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/']), 10);
  }

  navigateToBlocks() {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/blocks']), 10);
  }

  navigateToBlock(height: number) {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/block/' + height]), 10);
  }

  navigateToTx(hash: string) {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/transaction/' + hash]), 10);
  }

  loadBlock() {
    if (sessionStorage.getItem(this.blockHeight) === null) {
      this.service.getBlock(this.blockHeight).subscribe(
        data => {
          this.block = data;
          this.loading = false;
        },
        error => {
          console.log("error loading block" + this.blockHeight, error);
          this.openSnackBar("Failed to load block!", "Close");
          setTimeout(() => this.navigateToHome(), 300);
        },
        () => {
          sessionStorage.setItem(this.blockHeight, JSON.stringify(this.block));
        }
      );
    } else {
      this.block = JSON.parse(sessionStorage.getItem(this.blockHeight)!);
      this.loading = false
    }
    this.titleService.setTitle('Block #' + this.blockHeight + ' · xmrscan.com');
  }

  copy(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        document.getElementById('copyIcon')?.classList.add('shrink');
    setTimeout(() => document.getElementById('copyIcon')!.innerHTML = 'check_circle', 50);
    setTimeout(() => document.getElementById('copyIcon')?.classList.add('active'), 50);
    setTimeout(() => document.getElementById('copyIcon')?.classList.remove('shrink'), 100);
    setTimeout(() => document.getElementById('copyIcon')?.classList.add('shrink'), 1200);
    setTimeout(() => document.getElementById('copyIcon')!.innerHTML = 'content_copy', 1300);
    setTimeout(() => document.getElementById('copyIcon')?.classList.remove('active'), 1300);
    setTimeout(() => document.getElementById('copyIcon')?.classList.remove('shrink'), 1350);
      })
      .catch(() => {
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.loadBlock();
  }

}
