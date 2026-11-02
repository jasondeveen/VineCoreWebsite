import { Component, inject } from '@angular/core';
import { I18n, TranslationKey } from '../../i18n';

interface ServiceCard {
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.html',
})
export class Services {
  readonly i18n = inject(I18n);

  readonly cards: readonly ServiceCard[] = [
    { titleKey: 'services.embedded.title', bodyKey: 'services.embedded.body' },
    { titleKey: 'services.desktop.title', bodyKey: 'services.desktop.body' },
    { titleKey: 'services.apis.title', bodyKey: 'services.apis.body' },
    { titleKey: 'services.data.title', bodyKey: 'services.data.body' },
    { titleKey: 'services.web.title', bodyKey: 'services.web.body' },
    { titleKey: 'services.revamp.title', bodyKey: 'services.revamp.body' },
  ];
}
