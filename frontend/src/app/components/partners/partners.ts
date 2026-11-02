import { Component, inject } from '@angular/core';
import { I18n } from '../../i18n';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.html',
})
export class Partners {
  readonly i18n = inject(I18n);
}
