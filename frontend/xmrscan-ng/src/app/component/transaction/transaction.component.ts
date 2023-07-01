import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/data/transaction';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit{

  txHash: string | null = ''

  transaction: Transaction = {
    data: undefined
  }

  constructor(
    private route: ActivatedRoute,
    private service: TransactionService
  ) { }

  loadTx() {
    if (sessionStorage.getItem(this.txHash!) == null) {
      this.service.getTx(this.txHash).subscribe(
        data => {
            this.transaction = data
            console.log(this.transaction);
        },
        error => {
          console.log("error loading transaction", error);
        },
        () => {
          sessionStorage.setItem(this.txHash!, JSON.stringify(this.transaction));
        }
      );
    } else {
      this.transaction = JSON.parse(sessionStorage.getItem(this.txHash!)!);
    }
  }

  public ngOnInit(): void {
    this.txHash = this.route.snapshot.paramMap.get('id');
    this.loadTx();
    window.scrollTo(0, 0);
  }

  copyText(text: string, type: number) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (type == 1) {
          this.showTxPopUp();
        } else if (type == 2) {
          this.showTxHashPopUp();
        }
        
      })
      .catch(() => {
      });
  }

  showTxPopUp() {    
    document.getElementById('transactionCopyPopUp')?.classList.add('active');
    setTimeout(function () { document.getElementById('transactionCopyPopUp')?.classList.remove('active'); }, 1000);
  }

  showTxHashPopUp() {    
    document.getElementById('transactionHashCopyPopUp')?.classList.add('active');
    setTimeout(function () { document.getElementById('transactionHashCopyPopUp')?.classList.remove('active'); }, 1000);
  }

}
