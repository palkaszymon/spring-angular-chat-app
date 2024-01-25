import {Component, OnInit} from '@angular/core';
import {Inquiry} from "../../../../models/inquiry";
import {ContactService} from "../../../../services/contact.service";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inquiry-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './inquiry-list.component.html',
  styleUrl: './inquiry-list.component.scss'
})
export class InquiryListComponent implements OnInit {
  inquiryList: Inquiry[] = [];

  constructor(private contactService: ContactService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.inquiryList = this.contactService.getInquiries()
  }

  displayInquiry(inquiry: Inquiry) {
    return `Username: ${inquiry.username}, Email: ${inquiry.email}, Phone Number: ${inquiry.phoneNumber}, Reason: ${inquiry.reason}, Inquiry: ${inquiry.inquiry}, Urgent: ${inquiry.urgent}`
  }

  goToForm() {
    this.router.navigate(['/contact/form'])
  }
}
