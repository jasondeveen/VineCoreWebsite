import { Component, inject } from '@angular/core';
import { I18n } from '../../i18n';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
})
export class Hero {
  readonly i18n = inject(I18n);
}
