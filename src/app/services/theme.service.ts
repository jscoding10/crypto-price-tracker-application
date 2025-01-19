import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  themeType = window.matchMedia('(prefers-color-scheme: light').matches;
  themeString: string = '';

  themeSignal = signal<string>('');

  setTheme(theme: string) {
    this.themeSignal.set(theme);
  }

  updateTheme() {
    this.themeSignal.update((theme) =>
      theme === 'theme-light' ? 'theme-dark' : 'theme-light'
    );
  }

  setLocalStorageTheme(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalStorageTheme(key: string): any {
    const localStorageTheme = localStorage.getItem(key);
    return localStorageTheme ? JSON.parse(localStorageTheme) : null;
  }
}
