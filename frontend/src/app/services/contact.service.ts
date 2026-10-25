import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ContactRequest } from '../models/contact-request';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  /** Submits a contact request. Proxied to the backend in dev via proxy.conf.json. */
  send(request: ContactRequest) {
    return this.http.post<void>('/api/contact', request);
  }
}
