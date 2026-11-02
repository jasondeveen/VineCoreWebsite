import { Component, inject } from '@angular/core';
import { I18n } from '../../i18n';
import { ThemeService } from '../../theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
})
export class Header {
  readonly i18n = inject(I18n);
  readonly theme = inject(ThemeService);
}
