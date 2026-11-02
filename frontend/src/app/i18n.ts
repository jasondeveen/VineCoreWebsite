import { Injectable, signal } from '@angular/core';

export type Lang = 'en' | 'nl';

const STORAGE_KEY = 'vinecore-lang';

/**
 * All site copy lives here, keyed by a flat name. English is the source of
 * truth: `TranslationKey` is derived from it, and the Dutch table is typed as a
 * full record, so a missing or misspelled Dutch key fails the build.
 */
const EN = {
  'meta.title': 'VineCore — Industrial & Embedded Software',
  'meta.description':
    'VineCore — independent industrial and embedded software engineering.',

  'nav.home': 'VineCore — home',
  'nav.about': 'About',
  'nav.services': 'Services',
  'nav.projects': 'Projects',
  'nav.contact': 'Contact',
  'nav.language': 'Language',
  'nav.themeToDark': 'Switch to dark mode',
  'nav.themeToLight': 'Switch to light mode',

  'hero.title1': 'Engineered systems',
  'hero.title2': 'Reliable solutions',
  'hero.contact': 'Get in touch',
  'hero.work': 'See my work',

  'about.eyebrow': 'About',
  'about.title': 'Software that makes sense.',
  'about.p1':
    "VineCore is a one-person consultancy. I'm an industrial engineer (Electronics-ICT) with four years as a software engineer at ArcelorMittal.",
  'about.p2':
    "With AI making it easy to generate more code than anyone can review, I'd rather keep it focused and correct: code you can still reason about a year later and trust in production.",
  'about.p3':
    "I work hands-on and project-based, from firmware and embedded software up to higher-level software such as desktop tools, APIs, and data processing. I'm comfortable across that whole stack and open to any IT work. I like short lines with the engineers who build the product, and I'm available for project work.",
  'about.portraitTitle': 'Portrait photo',
  'about.portraitMeta': 'Vertical · 900 × 1200',

  'services.eyebrow': 'Services',
  'services.title': 'What I do',
  'services.embedded.title': 'Embedded software',
  'services.embedded.body':
    'Firmware for microcontrollers in C and C++: control logic, real-time behaviour, and low-level drivers.',
  'services.desktop.title': 'Desktop & internal tools',
  'services.desktop.body':
    "Desktop applications and internal tools for day-to-day work — the focused programs that off-the-shelf software doesn't cover.",
  'services.apis.title': 'APIs & integrations',
  'services.apis.body':
    'REST APIs and the glue between existing systems: databases, files, and third-party services.',
  'services.data.title': 'Data processing',
  'services.data.body':
    'Parsing, validating, and reporting data — from one-off conversions to scheduled exports.',
  'services.web.title': 'Web applications',
  'services.web.body':
    'Internal dashboards and focused web apps, from the interface down to the data behind it.',
  'services.revamp.title': 'Codebase revamps',
  'services.revamp.body':
    'Picking up an existing codebase and extending or rewriting it without losing what already works.',

  'projects.eyebrow': 'Projects',
  'projects.title': 'Selected work',
  'projects.prevPhoto': 'Previous photo',
  'projects.nextPhoto': 'Next photo',
  'projects.showPhoto': 'Show photo {n} of {total}',
  'projects.prevWork': 'Previous work',
  'projects.nextWork': 'Next work',
  'projects.showWork': 'Show work {n}: {title}',
  'projects.cspect.title': 'Inspection-robot firmware',
  'projects.cspect.description':
    'Rewrote and extended the firmware of an inspection robot. Details to follow.',
  'projects.movatron.title': 'Sensor datalogger',
  'projects.movatron.description':
    'A datalogger that records measurements from connected sensors and shows the current reading on a display.',
  'projects.alt.altum': 'Photo of the Altum inspection robot',
  'projects.alt.datalogger': 'Photo of the sensor datalogger',
  'projects.alt.display': 'Photo of the datalogger display',
  'projects.alt.inUse': 'Photo of the datalogger in use',

  'partners.title': 'Trusted partners',

  'contact.eyebrow': 'Contact',
  'contact.title': 'Get in touch',
  'contact.body': "Have a project in mind? Email me and I'll get back to you.",
  'contact.emailLabel': 'Email',
} as const;

export type TranslationKey = keyof typeof EN;

const NL: Record<TranslationKey, string> = {
  'meta.title': 'VineCore — Industriële en embedded software',
  'meta.description':
    'VineCore — onafhankelijk ingenieursbureau voor industriële en embedded software.',

  'nav.home': 'VineCore — startpagina',
  'nav.about': 'Over',
  'nav.services': 'Diensten',
  'nav.projects': 'Projecten',
  'nav.contact': 'Contact',
  'nav.language': 'Taal',
  'nav.themeToDark': 'Schakel naar donkere modus',
  'nav.themeToLight': 'Schakel naar lichte modus',

  'hero.title1': 'Ontworpen systemen',
  'hero.title2': 'Betrouwbare oplossingen',
  'hero.contact': 'Neem contact op',
  'hero.work': 'Bekijk mijn werk',

  'about.eyebrow': 'Over mij',
  'about.title': 'Software die klopt.',
  'about.p1':
    'VineCore is een eenmansadviesbureau. Ik ben industrieel ingenieur (Elektronica-ICT) en werkte vier jaar als software-ingenieur bij ArcelorMittal.',
  'about.p2':
    'AI maakt het makkelijk om meer code te genereren dan iemand kan reviewen. Ik houd het daarom liever gericht en correct: code die je een jaar later nog begrijpt en waarop je in productie durft te vertrouwen.',
  'about.p3':
    "Ik werk hands-on en per project, van firmware en embedded software tot hogere software zoals desktoptools, API's en dataverwerking. Ik ben thuis in die hele stack en sta open voor elk IT-project. Korte lijnen met de ingenieurs die het product bouwen, daar werk ik graag zo. Ik ben beschikbaar voor projectwerk.",
  'about.portraitTitle': 'Portretfoto',
  'about.portraitMeta': 'Verticaal · 900 × 1200',

  'services.eyebrow': 'Diensten',
  'services.title': 'Wat ik doe',
  'services.embedded.title': 'Embedded software',
  'services.embedded.body':
    'Firmware voor microcontrollers in C en C++: besturingslogica, realtimegedrag en low-level drivers.',
  'services.desktop.title': 'Desktop- en interne tools',
  'services.desktop.body':
    "Desktopapplicaties en interne tools voor het dagelijkse werk — de gerichte programma's die standaardsoftware niet afdekt.",
  'services.apis.title': "API's en integraties",
  'services.apis.body':
    "REST-API's en de lijm tussen bestaande systemen: databases, bestanden en diensten van derden.",
  'services.data.title': 'Dataverwerking',
  'services.data.body':
    'Data inlezen, valideren en rapporteren — van eenmalige conversies tot geplande exports.',
  'services.web.title': 'Webapplicaties',
  'services.web.body':
    'Interne dashboards en gerichte webapps, van de interface tot de data erachter.',
  'services.revamp.title': 'Codebases vernieuwen',
  'services.revamp.body':
    'Een bestaande codebase overnemen en uitbreiden of herschrijven zonder te verliezen wat al werkt.',

  'projects.eyebrow': 'Projecten',
  'projects.title': 'Geselecteerd werk',
  'projects.prevPhoto': 'Vorige foto',
  'projects.nextPhoto': 'Volgende foto',
  'projects.showPhoto': 'Toon foto {n} van {total}',
  'projects.prevWork': 'Vorig project',
  'projects.nextWork': 'Volgend project',
  'projects.showWork': 'Toon project {n}: {title}',
  'projects.cspect.title': 'Firmware voor inspectierobot',
  'projects.cspect.description':
    'De firmware van een inspectierobot herschreven en uitgebreid. Details volgen.',
  'projects.movatron.title': 'Sensordatalogger',
  'projects.movatron.description':
    'Een datalogger die metingen van aangesloten sensoren vastlegt en de actuele waarde op een display toont.',
  'projects.alt.altum': 'Foto van de Altum-inspectierobot',
  'projects.alt.datalogger': 'Foto van de sensordatalogger',
  'projects.alt.display': 'Foto van het display van de datalogger',
  'projects.alt.inUse': 'Foto van de datalogger in gebruik',

  'partners.title': 'Vertrouwde partners',

  'contact.eyebrow': 'Contact',
  'contact.title': 'Neem contact op',
  'contact.body': 'Een project in gedachten? Stuur me een e-mail en ik kom erop terug.',
  'contact.emailLabel': 'E-mail',
};

const STRINGS: Record<Lang, Record<TranslationKey, string>> = { en: EN, nl: NL };

function isLang(value: string | null): value is Lang {
  return value === 'en' || value === 'nl';
}

function storedLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLang(stored) ? stored : 'en';
  } catch {
    return 'en';
  }
}

/**
 * Runtime language switching. English is the default; the choice is kept in
 * localStorage and reflected on <html lang> so screen readers and spellcheck
 * follow the page.
 */
@Injectable({ providedIn: 'root' })
export class I18n {
  private readonly langState = signal<Lang>(storedLang());

  readonly lang = this.langState.asReadonly();

  constructor() {
    this.applyDocumentLanguage(this.langState());
  }

  setLang(lang: Lang): void {
    if (lang === this.langState()) {
      return;
    }

    this.langState.set(lang);

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies); the switch
      // still works for this visit.
    }

    this.applyDocumentLanguage(lang);
  }

  /** Looks up a string, filling `{name}` placeholders from `params`. */
  t(key: TranslationKey, params?: Record<string, string | number>): string {
    let text = STRINGS[this.langState()][key];

    if (params !== undefined) {
      for (const [name, value] of Object.entries(params)) {
        text = text.replaceAll(`{${name}}`, String(value));
      }
    }

    return text;
  }

  private applyDocumentLanguage(lang: Lang): void {
    document.documentElement.lang = lang;
    document.title = this.t('meta.title');

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description !== null) {
      description.content = this.t('meta.description');
    }
  }
}
