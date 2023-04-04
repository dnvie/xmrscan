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
          document.getElementById('loading')!.classList.remove('active');
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
