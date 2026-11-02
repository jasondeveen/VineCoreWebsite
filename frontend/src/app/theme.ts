import { Injectable, computed, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'vinecore-theme';

function storedTheme(): ThemeMode {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

/**
 * Light/dark theme. Light is the default; the choice is kept in localStorage.
 * The `dark` class on <html> is what the `dark:` utilities key off. The inline
 * script in index.html sets the same class before Angular boots, so a returning
 * dark-mode visitor never sees a flash of the light theme.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly modeState = signal<ThemeMode>(storedTheme());

  readonly mode = this.modeState.asReadonly();
  readonly isDark = computed(() => this.modeState() === 'dark');

  constructor() {
    this.apply(this.modeState());
  }

  toggle(): void {
    this.set(this.modeState() === 'dark' ? 'light' : 'dark');
  }

  set(mode: ThemeMode): void {
    if (mode === this.modeState()) {
      return;
    }

    this.modeState.set(mode);

    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies); the switch
      // still works for this visit.
    }

    this.apply(mode);
  }

  private apply(mode: ThemeMode): void {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }
}
