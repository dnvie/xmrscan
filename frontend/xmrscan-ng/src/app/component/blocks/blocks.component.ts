import { Component, OnInit } from '@angular/core';
import { Blocks, BlockInfo } from 'src/app/data/blocks';
import { BlocksService } from 'src/app/service/blocks.service';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit{

  /*blockInfo: BlockInfo = {
    data: undefined,
    status: undefined
  }*/

  blocks: Blocks = {
    Blocks: undefined
  }

  constructor(
    private service: BlocksService
  ) { }

  test() {
    document.getElementById('loading')!.classList.add('active');
    this.service.getBlocks(undefined).subscribe(
      data => {
          this.blocks = data
      },
      error => {
        console.log("error loading network info", error);
        document.getElementById('loading')!.classList.remove('active');
      },
      () => {
        console.log(this.blocks);
        document.getElementById('loading')!.classList.remove('active');
        //document.getElementById('block')!.innerText = "Height: " + this.blocks.Blocks![0].data!.block_height.toString()
      }
    );
  }

  public ngOnInit(): void {
    const blocksDiv = document.getElementById('blocks');
    for (let i = 0; i < 25; i++) {
      const blockItem = document.createElement('div');
      blockItem.setAttribute("id", "blockItem"+i);
      blockItem.classList.add('blockItem');
      //const blockHeight = document.createElement('div')
      blocksDiv?.appendChild(blockItem);
    }
  }

}
