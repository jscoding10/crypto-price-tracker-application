import { Component, effect, inject, Renderer2 } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../services/theme.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    MatMenuModule,
  ],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss',
})
export class SideNavigationComponent {
  openedNav = false;
  systemTheme: string = '';

  route = inject(ActivatedRoute);
  router = inject(Router);
  themeService = inject(ThemeService);
  document = inject(DOCUMENT);
  renderer = inject(Renderer2);

  sideNavOption = [
    {
      title: 'Home',
      icon: 'home',
      url: '',
    },
    {
      title: 'Portfolio',
      icon: 'cases',
      url: '/portfolio',
    },
    {
      title: 'Add Cryptocurrency',
      icon: 'add',
      url: 'add-currency',
    },
  ];

  toggleTheme = [
    {
      title: 'Light or Dark Mode',
      icon: 'settings_brightness',
    },
  ];

  ngOnInit(): void {
    // Check if value exists for the key theme in local storage - if a value does not exist it will return null
    const localStorageTheme = this.themeService.getLocalStorageTheme('theme');
    // If there is no theme in local storage, check operating system settings for light or dark theme and set theme based upon settings. If cannot read operating system settings, default to light theme
    if (localStorageTheme === null) {
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        this.systemTheme = 'theme-light';
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.systemTheme = 'theme-dark';
      } else {
        this.systemTheme = 'theme-light';
      }
      this.themeService.setLocalStorageTheme('theme', this.systemTheme);
      this.themeService.setTheme(this.systemTheme);
      // If there is a theme stored in local storage, retrieve it and set it as the theme
    } else if (localStorageTheme !== null) {
      this.themeService.setTheme(localStorageTheme);
    }
  }

  constructor() {
    effect(() => {
      // If signal is equal to light theme, remove dark theme class from body, add light theme class to body, and set local storage to light theme
      if (this.themeService.themeSignal() === 'theme-light') {
        this.renderer.removeClass(this.document.body, 'theme-dark');
        this.renderer.addClass(this.document.body, 'theme-light');
        this.themeService.setLocalStorageTheme('theme', 'theme-light');
        // If signal is equal to dark theme, remove light theme class from body, add dark theme class to body, and set local storage to dark theme
      } else if (this.themeService.themeSignal() === 'theme-dark') {
        this.renderer.removeClass(this.document.body, 'theme-light');
        this.renderer.addClass(this.document.body, 'theme-dark');
        this.themeService.setLocalStorageTheme('theme', 'theme-dark');
      }
    });
  }

  lightThemeSelect() {
    this.themeService.setTheme('theme-light');
  }

  darkThemeSelect() {
    this.themeService.setTheme('theme-dark');
  }

  operatingSystemThemeSelect() {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      this.systemTheme = 'theme-light';
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.systemTheme = 'theme-dark';
    }
    this.themeService.setTheme(this.systemTheme);
  }
}
