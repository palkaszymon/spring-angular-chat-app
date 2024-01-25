import { Injectable } from '@angular/core';
import {Inquiry} from "../models/inquiry";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  customerInquiryList: Inquiry[] = []
  constructor() { }

  addInquiry(inquiry: Inquiry) {
    this.customerInquiryList.push(inquiry)
    return this.customerInquiryList;
  }

  getInquiries() {
    return this.customerInquiryList
  }
}
