import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ContactService} from "../../../services/contact.service";
import {Inquiry} from "../../../models/inquiry";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private contactService: ContactService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createContactForm();
  }

  private createContactForm() {
    this.contactForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        reason: ['', [Validators.required]],
        inquiry: ['', [Validators.required]],
        urgent: [false, [Validators.required]],
      }
    )
  }

  onSubmitForm() {
    this.contactService.addInquiry(this.contactForm.value as Inquiry)
    this.router.navigate(['/contact/list'])
  }
}
