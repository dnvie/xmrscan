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
  loaded = false;
  skeletons: any[] = Array(25).fill({});

  blocks: Blocks = {
    Blocks: undefined
  }

  constructor(
    private service: BlocksService
  ) { }

  loadBlocks() {
    if (sessionStorage.getItem('blocks') == null) {
      this.service.getBlocks(undefined).subscribe(
        data => {
          this.blocks = data
          this.loaded = true
        },
        error => {
          console.log("error loading network info", error);
        },
        () => {
          sessionStorage.setItem('blocks', JSON.stringify(this.blocks));
        }
      );
    } else {
      this.blocks = JSON.parse(sessionStorage.getItem('blocks')!);
      this.loaded = true
    }
  }

  public ngOnInit(): void {
    this.loadBlocks();
  }


}
