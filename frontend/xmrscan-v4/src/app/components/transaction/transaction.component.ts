import { Component, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators'
import { ProveResults, Transaction } from '../../data/transaction';
import { TransactionService } from '../../service/transaction.service';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {

  isMobile: boolean = false;
  loading = true;
  proveSendingOpen = false;
  decodeOutputsOpen = false;
  proveContainerCompact = true;
  txHash: string = this.route.snapshot.params['hash'] || '';
  tx: Transaction = {
    data: undefined,
    status: undefined
  }
  proveResults: ProveResults = {
    amount: undefined,
    matches: []
  }
  mode: number = 0;
  address: string = '';
  key: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private service: TransactionService, private titleService: Title, private _snackBar: MatSnackBar) {
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
    setTimeout(() => document.getElementById('skeleton3.0')?.classList.remove('hidden'), 0);
    setTimeout(() => document.getElementById('skeleton3.1')?.classList.remove('hidden'), 15);
    setTimeout(() => document.getElementById('skeleton3.2')?.classList.remove('hidden'), 30);
    for (let i = 0; i < 99; i++) {
      setTimeout(() => this.revealSkeletonRow(i), 15*i);
      setTimeout(() => this.revealSkeletonRow2(i), 15*i+10);
    }
  }

  revealSkeletonRow(id: number) {
    document.getElementById('skeleton' + id)?.classList.remove('hidden');
  }

  revealSkeletonRow2(id: number) {
    document.getElementById('skeleton2.' + id)?.classList.remove('hidden');
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

  navigateToMempool() {
    this.transitionOut();
    setTimeout(() => this.router.navigate(['/mempool']), 10);
  }

  revealProveSendingContainer() {
    this.removeProveResults();
    this.mode = 0;
    if (!this.proveSendingOpen) {
      if (this.proveContainerCompact) {
        this.proveContainerCompact = false;
        this.proveSendingOpen = true;
        document.getElementById('secondHeading')!.innerHTML = 'Transaction Key:'
        document.getElementById('secondTextArea')!.setAttribute('placeholder', 'Enter your Transaction Key here');
        document.getElementById('proveSendingButton')?.classList.add('active');
        document.getElementById('proveSendingContainer')?.classList.remove('compact');
        setTimeout(() => document.getElementById('proveSendingContainer')?.classList.remove('hidden'), 100);
      } else {
        this.proveSendingOpen = true;
        this.decodeOutputsOpen = false;
        document.getElementById('secondHeading')!.innerHTML = 'Transaction Key:'
        document.getElementById('secondTextArea')!.setAttribute('placeholder', 'Enter your Transaction Key here');
        document.getElementById('proveSendingButton')?.classList.add('active');
        document.getElementById('decodeOutputsButton')?.classList.remove('active');
        setTimeout(() => document.getElementById('decodeOutputsContainer')?.classList.add('hidden'), 0);
        setTimeout(() => document.getElementById('proveSendingContainer')?.classList.remove('hidden'), 100);
      }
    }
  }

  revealDecodeOutputsContainer() {
    this.removeProveResults();
    this.mode = 1;
    if (!this.decodeOutputsOpen) {
      if (this.proveContainerCompact) {
        this.proveContainerCompact = false;
        this.decodeOutputsOpen = true;
        document.getElementById('secondHeading')!.innerHTML = 'View Key:'
        document.getElementById('secondTextArea')!.setAttribute('placeholder', 'Enter your View Key here');
        document.getElementById('decodeOutputsButton')?.classList.add('active');
        document.getElementById('proveSendingContainer')?.classList.remove('compact');
        setTimeout(() => document.getElementById('proveSendingContainer')?.classList.remove('hidden'), 100);
      } else {
        this.decodeOutputsOpen = true;
        this.proveSendingOpen = false;
        document.getElementById('secondHeading')!.innerHTML = 'View Key:'
        document.getElementById('secondTextArea')!.setAttribute('placeholder', 'Enter your View Key here');
        document.getElementById('decodeOutputsButton')?.classList.add('active');
        document.getElementById('proveSendingButton')?.classList.remove('active');
      }
    }
  }

  proveTransaction() {
    if (this.proveSendingOpen) {
      if (this.address.length != 95 || (!this.address.startsWith('4') && !this.address.startsWith('8'))) {
        this.displayError('address');
        return;
      } 
      if (!/^[0-9a-fA-F]+$/.test(this.key)) {
        this.displayError('key');
        return;
      }
      if (sessionStorage.getItem(this.txHash + "/" + this.address + "/" + this.key + "/0") === null) {
        this.service.proveTransaction(this.txHash, this.address, this.key, 0).subscribe(
          data => {
            this.proveResults = data;
            this.displayProveResults(this.proveResults);
          },
          error => {
            console.log("error proving transaction", error);
          },
          () => {
            sessionStorage.setItem(this.txHash + "/" + this.address + "/" + this.key + "/0", JSON.stringify(this.proveResults));
          }
        );
      } else {
        this.proveResults = JSON.parse(sessionStorage.getItem(this.txHash + "/" + this.address + "/" + this.key + "/0")!);
        this.displayProveResults(this.proveResults);
      }
    } else {
      if (this.address.length != 95 || (!this.address.startsWith('4') && !this.address.startsWith('8'))) {
        this.displayError('address');
        return;
      } 
      if (!/^[0-9a-fA-F]+$/.test(this.key)) {
        this.displayError('key');
        return;
      }
      if (sessionStorage.getItem(this.txHash + "/" + this.address + "/" + this.key + "/1") === null) {
        this.service.proveTransaction(this.txHash, this.address, this.key, 1).subscribe(
          data => {
            this.proveResults = data;
            this.displayProveResults(this.proveResults);
          },
          error => {
            console.log("error decoding outputs", error);
          },
          () => {
            sessionStorage.setItem(this.txHash + "/" + this.address + "/" + this.key + "/1", JSON.stringify(this.proveResults));
          }
        );
      } else {
        this.proveResults = JSON.parse(sessionStorage.getItem(this.txHash + "/" + this.address + "/" + this.key + "/1")!);
        this.displayProveResults(this.proveResults);
      }
    }
  }

  displayProveResults(res: ProveResults) {
    const proveResult = document.getElementById('proveResult');
    this.removeProveResults();
    if (res.amount == undefined || res.amount <= 0) {
      proveResult!.classList.add('noProveResults');
      proveResult!.innerText = `No Matching Outputs!`;
      proveResult!.classList.remove('hidden');
    } else {
      if (res.amount == 1) {
        proveResult!.innerText = `${res.amount} Matching Output!`;
      } else {
        proveResult!.innerText = `${res.amount} Matching Outputs!`;
      }
      proveResult!.classList.remove('noProveResults');
      proveResult!.classList.remove('hidden');
      for (let i = 0; i < res.amount; i++) {
        document.getElementById(res.matches![i])?.classList.add('proven');
      }
    }
  }

  removeProveResults() {
    const proveResult = document.getElementById('proveResult');
    proveResult!.innerText = ``;
    proveResult!.classList.add('hidden');
    for (let i = 0; i < this.tx.data!.outputs.length; i++) {
      document.getElementById(this.tx.data!.outputs[i].public_key)?.classList.remove('proven');
    }
  }

  displayError(type: string) {
    const proveResult = document.getElementById('proveResult');
    proveResult!.innerText = ``;
    proveResult!.classList.add('noProveResults');
    for (let i = 0; i < this.tx.data!.outputs.length; i++) {
      document.getElementById(this.tx.data!.outputs[i].public_key)?.classList.remove('proven');
    }
    if (type == 'address') {
      proveResult!.innerText = `Invalid Address!`;
      proveResult!.classList.remove('hidden');
    } else {
      proveResult!.innerText = `Invalid Key!`;
      proveResult!.classList.remove('hidden');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isMobile = window.innerWidth <= 760;
  }

  getTransaction() {
    if (sessionStorage.getItem(this.txHash) === null) {
      this.service.getTransaction(this.txHash).subscribe(
        data => {
          this.tx = data;
          this.loading = false;
        },
        error => {
          console.log("error loading transaction", error);
          this.openSnackBar("Failed to load transaction!", "Close");
          setTimeout(() => this.navigateToHome(), 300);
        },
        () => {
          sessionStorage.setItem(this.txHash, JSON.stringify(this.tx));
        }
      );
    } else {
      this.tx = JSON.parse(sessionStorage.getItem(this.txHash)!);
      this.loading = false
    }
    this.titleService.setTitle('Tx #' + this.txHash + ' · xmrscan.com');
  }

  copy(text: string, event: Event) {
    const id = (event.target as HTMLElement).id;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        document.getElementById(id)?.classList.add('shrink');
    setTimeout(() => document.getElementById(id)!.innerHTML = 'check_circle', 50);
    setTimeout(() => document.getElementById(id)?.classList.add('active'), 50);
    setTimeout(() => document.getElementById(id)?.classList.remove('shrink'), 100);
    setTimeout(() => document.getElementById(id)?.classList.add('shrink'), 1200);
    setTimeout(() => document.getElementById(id)!.innerHTML = 'content_copy', 1300);
    setTimeout(() => document.getElementById(id)?.classList.remove('active'), 1300);
    setTimeout(() => document.getElementById(id)?.classList.remove('shrink'), 1350);
      })
      .catch(() => {
      });
  }

  reload() {
    window.location.reload();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.checkScreenWidth();
    this.getTransaction();
  }

}
