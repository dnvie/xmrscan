import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

  switchTheme() {
    if (document.documentElement.getAttribute('data-theme') == 'dark') {
      setTimeout(() => document.getElementById('switchThemeButton')!.innerText = 'dark_mode', 150);
      document.getElementById('transitionHelper')?.classList.remove('hidden');
      setTimeout(() => document.documentElement.setAttribute('data-theme', 'light'), 150);
      setTimeout(() => localStorage.setItem('theme', 'light'), 150);
      setTimeout(() => document.getElementById('transitionHelper')?.classList.add('hidden'), 275);
    } else {
      setTimeout(() => document.getElementById('switchThemeButton')!.innerText = 'light_mode', 150);
      document.getElementById('transitionHelper')?.classList.remove('hidden');
      setTimeout(() => document.documentElement.setAttribute('data-theme', 'dark'), 150);
      setTimeout(() => localStorage.setItem('theme', 'dark'), 150);
      setTimeout(() => document.getElementById('transitionHelper')?.classList.add('hidden'), 275);
    }
  }

  ngOnInit() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.getElementById('switchThemeButton')!.innerText = 'light_mode';
      } else {
        document.getElementById('switchThemeButton')!.innerText = 'dark_mode';
      }
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      document.getElementById('switchThemeButton')!.innerText = 'dark_mode'
    }
  }

}
