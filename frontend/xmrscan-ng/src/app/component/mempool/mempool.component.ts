import { Component, OnInit } from '@angular/core';
import { Mempool } from 'src/app/data/mempool';
import { MempoolService } from 'src/app/service/mempool.service';

@Component({
  selector: 'app-mempool',
  templateUrl: './mempool.component.html',
  styleUrls: ['./mempool.component.scss']
})
export class MempoolComponent implements OnInit {

  mempool: Mempool = {}
  loaded = false;
  skeletons: any[] = Array(25).fill({});

  constructor(
    private service: MempoolService
  ) { }

  loadMempool() {
    window.scrollTo(0, 0);
    this.service.getMempool().subscribe(
      data => {
        this.mempool = data
        this.loaded = true
      },
      error => {
        console.log("error loading mempool", error);
      },
      () => {
        console.log(this.mempool);
      }
    );
  }

  public ngOnInit(): void {
    this.loadMempool();
  }

}
