import { Component, inject } from '@angular/core';
import { I18n } from '../../i18n';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
})
export class About {
  readonly i18n = inject(I18n);
}
