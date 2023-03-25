import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  visible = true

  addScroll() {
    setTimeout(function(){document.getElementById('info1')?.classList.add('scrolled');}, 0);
    setTimeout(function(){document.getElementById('info2')?.classList.add('scrolled');}, 30);
    setTimeout(function(){document.getElementById('info3')?.classList.add('scrolled');}, 60);
    setTimeout(function(){document.getElementById('info4')?.classList.add('scrolled');}, 90);
    setTimeout(function(){document.getElementById('info5')?.classList.add('scrolled');}, 120);
    setTimeout(function(){document.getElementById('info6')?.classList.add('scrolled');}, 150);
    setTimeout(function(){document.getElementById('info7')?.classList.add('scrolled');}, 180);
    setTimeout(function(){document.getElementById('info8')?.classList.add('scrolled');}, 210);
    setTimeout(function(){document.getElementById('info9')?.classList.add('scrolled');}, 240);
    setTimeout(function(){document.getElementById('info10')?.classList.add('scrolled');}, 270);
  }

  removeScroll() {
    setTimeout(function(){document.getElementById('info1')?.classList.remove('scrolled');}, 0);
    setTimeout(function(){document.getElementById('info2')?.classList.remove('scrolled');}, 30);
    setTimeout(function(){document.getElementById('info3')?.classList.remove('scrolled');}, 60);
    setTimeout(function(){document.getElementById('info4')?.classList.remove('scrolled');}, 90);
    setTimeout(function(){document.getElementById('info5')?.classList.remove('scrolled');}, 120);
    setTimeout(function(){document.getElementById('info6')?.classList.remove('scrolled');}, 150);
    setTimeout(function(){document.getElementById('info7')?.classList.remove('scrolled');}, 180);
    setTimeout(function(){document.getElementById('info8')?.classList.remove('scrolled');}, 210);
    setTimeout(function(){document.getElementById('info9')?.classList.remove('scrolled');}, 240);
    setTimeout(function(){document.getElementById('info10')?.classList.remove('scrolled');}, 270);
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any){
   this.scrollFunction()
  } 

scrollFunction() {
  if (document.body.scrollTop > 25 || document.documentElement.scrollTop > 25) {
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

}
