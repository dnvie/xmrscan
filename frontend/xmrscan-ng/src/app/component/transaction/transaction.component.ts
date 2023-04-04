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

}
