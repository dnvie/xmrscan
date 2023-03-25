import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  visible = true
  delay = 40

  addScroll() {
    setTimeout(function(){document.getElementById('info1')?.classList.add('scrolled');}, 0*this.delay);
    setTimeout(function(){document.getElementById('info2')?.classList.add('scrolled');}, 1*this.delay);
    setTimeout(function(){document.getElementById('info3')?.classList.add('scrolled');}, 2*this.delay);
    setTimeout(function(){document.getElementById('info4')?.classList.add('scrolled');}, 3*this.delay);
    setTimeout(function(){document.getElementById('info5')?.classList.add('scrolled');}, 4*this.delay);
    setTimeout(function(){document.getElementById('info6')?.classList.add('scrolled');}, 5*this.delay);
    setTimeout(function(){document.getElementById('info7')?.classList.add('scrolled');}, 6*this.delay);
    setTimeout(function(){document.getElementById('info8')?.classList.add('scrolled');}, 7*this.delay);
    setTimeout(function(){document.getElementById('info9')?.classList.add('scrolled');}, 8*this.delay);
    setTimeout(function(){document.getElementById('info10')?.classList.add('scrolled');}, 9*this.delay);
  }

  removeScroll() {
    setTimeout(function(){document.getElementById('info1')?.classList.remove('scrolled');}, 0*this.delay);
    setTimeout(function(){document.getElementById('info2')?.classList.remove('scrolled');}, 1*this.delay);
    setTimeout(function(){document.getElementById('info3')?.classList.remove('scrolled');}, 2*this.delay);
    setTimeout(function(){document.getElementById('info4')?.classList.remove('scrolled');}, 3*this.delay);
    setTimeout(function(){document.getElementById('info5')?.classList.remove('scrolled');}, 4*this.delay);
    setTimeout(function(){document.getElementById('info6')?.classList.remove('scrolled');}, 5*this.delay);
    setTimeout(function(){document.getElementById('info7')?.classList.remove('scrolled');}, 6*this.delay);
    setTimeout(function(){document.getElementById('info8')?.classList.remove('scrolled');}, 7*this.delay);
    setTimeout(function(){document.getElementById('info9')?.classList.remove('scrolled');}, 8*this.delay);
    setTimeout(function(){document.getElementById('info10')?.classList.remove('scrolled');}, 9*this.delay);
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
