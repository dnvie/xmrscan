import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Block } from 'src/app/data/block';
import { BlocksService } from 'src/app/service/blocks.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent {

  blockHeight: string | null = ''

  block: Block = {
    data: undefined
  }

  constructor(
    private route: ActivatedRoute,
    private service: BlocksService,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  loadBlock() {

    if (sessionStorage.getItem(this.blockHeight!) == null) {
      this.service.getBlock(this.blockHeight).subscribe(
        data => {
            this.block = data
            console.log(this.block);
            
        },
        error => {
          console.log("error loading block", error);
        },
        () => {
          sessionStorage.setItem(this.blockHeight!, JSON.stringify(this.block));
        }
      );
    } else {
      this.block = JSON.parse(sessionStorage.getItem(this.blockHeight!)!);
    }
  }

  public ngOnInit(): void {
    this.blockHeight = this.route.snapshot.paramMap.get('id');
    this.loadBlock();
    window.scrollTo(0, 0);
  }

}
