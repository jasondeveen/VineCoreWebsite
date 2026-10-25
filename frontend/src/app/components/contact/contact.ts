import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ContactRequest } from '../../models/contact-request';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  readonly form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', Validators.required],
    // Honeypot: hidden from humans, filled by bots.
    website: [''],
  });

  state: SubmitState = 'idle';

  submit(): void {
    if (this.form.invalid || this.state === 'sending') {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const request: ContactRequest = {
      name: value.name ?? '',
      email: value.email ?? '',
      subject: value.subject ?? undefined,
      message: value.message ?? '',
      website: value.website ?? undefined,
    };

    this.state = 'sending';
    this.contactService.send(request).subscribe({
      next: () => {
        this.state = 'sent';
        this.form.reset();
      },
      error: () => {
        this.state = 'error';
      },
    });
  }
}
