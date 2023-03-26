import { Component, HostListener } from '@angular/core';
import { NetworkInfo } from 'src/app/data/networkInfo';
import { NetworkService } from 'src/app/service/network.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  visible = true
  delay = 20
  info: NetworkInfo = {
    data: undefined,
    status: undefined
  };

  constructor(
    private service: NetworkService
  ) { }

  initScroll() {
    for (let i = 1; i <= 10; i++) {
      document.getElementById('info'+i)?.classList.add('scrolled');
    }
  }

  addScroll() {
    for (let i = 1; i <= 10; i++) {
      setTimeout(function () { document.getElementById('info'+i)?.classList.add('scrolled'); }, (i-1) * this.delay);
    }
  }

  removeScroll() {
    for (let i = 1; i <= 10; i++) {
      setTimeout(function () { document.getElementById('info'+i)?.classList.remove('scrolled'); }, (i-1) * this.delay);
    }
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    this.scrollFunction()
  }

  scrollFunction() {
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
      if (this.visible) {
        this.addScroll()
        this.visible = false
      }
    } else {
      if (!this.visible) {
        this.removeScroll()
        this.visible = true
      }
    }
  }

  onWheel(event: WheelEvent): void {
    if (event.deltaY > 0) document.getElementById('infoContainer')!.scrollLeft += 60;
    else document.getElementById('infoContainer')!.scrollLeft -= 60;
    event.preventDefault();
  }

  public ngOnInit(): void {
    this.initScroll();
    this.service.getNetworkInfo().subscribe(
      data => {
          this.info = data
      },
      error => {
        console.log("error loading network info", error);
    },
      () => {
        if(this.info.data != undefined) {
          document.getElementById('info3span')!.innerText = this.info.data.hash_rate + " H/s"
          document.getElementById('info4span')!.innerText = (this.info.data.height - 1).toString(10)
          document.getElementById('info5span')!.innerText = this.info.data.difficulty
          document.getElementById('info6span')!.innerText = this.info.data.cumulative_difficulty
          document.getElementById('info7span')!.innerText = this.info.data.tx_count.toString(10)
          document.getElementById('info8span')!.innerText = this.info.data.tx_pool_size.toString(10)
          document.getElementById('info9span')!.innerText = this.info.data.tx_pool_size_kbytes + " kB"
          document.getElementById('info10span')!.innerText = this.info.data.top_block_hash
          this.removeScroll()
        }
      }
  );
  }
}
