import { Component, OnInit } from '@angular/core';
import { Blocks, BlockInfo } from 'src/app/data/blocks';
import { BlocksService } from 'src/app/service/blocks.service';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

  firstLoad = true

  blocks: Blocks = {
    Blocks: undefined
  }

  constructor(
    private service: BlocksService
  ) { }

  loadBlocks() {
    if (sessionStorage.getItem('blocks') == null) {
      document.getElementById('LatestBlocks')!.innerText = "Loading...";
      this.service.getBlocks(undefined).subscribe(
        data => {
          this.blocks = data
        },
        error => {
          console.log("error loading network info", error);
        },
        () => {
          document.getElementById('LatestBlocks')!.innerText = "Latest Blocks";
          sessionStorage.setItem('blocks', JSON.stringify(this.blocks));
        }
      );
    } else {
      this.blocks = JSON.parse(sessionStorage.getItem('blocks')!);
    }
  }

  public ngOnInit(): void {
    this.loadBlocks();
  }


}
