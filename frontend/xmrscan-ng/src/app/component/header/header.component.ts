import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NetworkInfo, Price } from 'src/app/data/networkInfo';
import { Search } from 'src/app/data/search';
import { NetworkService } from 'src/app/service/network.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  darkMode = true;
  visible = true
  delay = 40
  info: NetworkInfo = {
    data: undefined,
    status: undefined
  };
  price: Price = {
    current_price: undefined,
    price_change_percentage_24h: undefined
  }
  searchResult: Search = {
    Type: 0,
    Block: undefined,
    Tx: undefined
  }

  constructor(
    private service: NetworkService,
    private route: ActivatedRoute,
    private router: Router,
    private sService: SearchService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (!router.navigated) {
          sessionStorage.clear();
        }
      }
      if (event instanceof NavigationEnd) {
        if (this.router.url != '/' && !this.router.url.includes('blocks')) {
          this.addScroll();
        } else {
          this.removeScroll();
        }
        this.collapseSidebar();
      }
  });
  }

  initScroll() {
    for (let i = 1; i <= 10; i++) {
      document.getElementById('info'+i)?.classList.add('scrolled');
    }
  }

  addScroll() {
    for (let i = 1; i <= 10; i++) {
      setTimeout(function () { document.getElementById('info'+i)?.classList.add('scrolled'); }, (i-1) * this.delay);
    }
    document.getElementById('infoContainerGradientSpacer')?.classList.add('scrolled');
    document.getElementById('infoContainerGradient')?.classList.add('scrolled');
    document.getElementById('infoContainer')?.classList.add('scrolled');
  }

  removeScroll() {
    for (let i = 1; i <= 10; i++) {
      setTimeout(function () { document.getElementById('info'+i)?.classList.remove('scrolled'); }, (i-1) * this.delay);
    }
    document.getElementById('infoContainerGradientSpacer')?.classList.remove('scrolled');
    document.getElementById('infoContainerGradient')?.classList.remove('scrolled');
    document.getElementById('infoContainer')?.classList.remove('scrolled');
  }

  switchTheme() {
    console.log("themeswitch");
    
    if (document.documentElement.getAttribute('data-theme') == 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      this.darkMode = false;
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      this.darkMode = true;
    }
  }

  expandSidebar() {
    document.getElementById('sidebar')?.classList.add('active');
  }

  collapseSidebar() {
    document.getElementById('sidebar')?.classList.remove('active');
  }

  search(event: KeyboardEvent, searchValue: string) {    
    if (event.keyCode === 13 || event.key === 'Enter' || event.code === 'Enter') {
      this.sService.getSearchResult(searchValue).subscribe(
        data => {
          this.searchResult = data;
          if (this.searchResult.Type == 0) {
            this.router.navigate(['block/' + this.searchResult.Block?.data?.block_height])
          } else if (this.searchResult.Type == 1) {
            this.router.navigate(['transaction/' + this.searchResult.Tx?.data?.tx_hash])
          } else {
            this.searchError();
          }
        },
        error => {
          this.searchError();
        }
      );
    }
  }

  searchError() {
    let searchBar = document.getElementById('searchBar') as HTMLInputElement;
    searchBar?.blur();
    searchBar!.value = 'Please check your input';
    searchBar?.classList.add('error');
    setTimeout(function(){searchBar?.classList.remove('error');}, 1000);
    setTimeout(function(){searchBar!.value = ''}, 1000);
    setTimeout(function(){searchBar?.focus()}, 1000);
  }

  /*@HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
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
    var winScroll = document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100 * 1;
    document.getElementById('scrollProgress')!.style.width = scrolled + "%";
    document.getElementById('scrollProgressBlur')!.style.width = scrolled + "%";
    //console.log(scrolled + "%");
    
    
  }*/

  onWheel(event: WheelEvent): void {
    if (event.deltaY > 0) document.getElementById('infoContainer')!.scrollLeft += 60;
    else document.getElementById('infoContainer')!.scrollLeft -= 60;
    event.preventDefault();
  }

  public ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    //this.initScroll();
    /*this.service.getNetworkInfo().subscribe(
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
    );*/
    /*this.service.getPrice().subscribe(
      data => {
          this.price = data
      },
      error => {
        console.log("error loading price info", error);
      },
      () => {
        if(this.info.data != undefined) {
          document.getElementById('info2span')!.innerText = this.price.current_price + "$";
          (this.price.price_change_percentage_24h! < 0) ? document.getElementById('info2')?.classList.add('priceDown') : document.getElementById('info2')?.classList.add('priceUp')
        }
      }
    );*/
  }
}
