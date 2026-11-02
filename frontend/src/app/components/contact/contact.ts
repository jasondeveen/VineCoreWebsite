import { Component, inject } from '@angular/core';
import { I18n } from '../../i18n';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
})
export class Contact {
  readonly i18n = inject(I18n);
}
