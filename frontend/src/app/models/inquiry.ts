export class Inquiry {
  username: string;
  email: string;
  phoneNumber: string;
  reason: string;
  inquiry: string;
  urgent: boolean;

  constructor(username: string, email: string, phoneNumber: string, reason: string, inquiry: string, urgent: boolean) {
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.reason = reason;
    this.inquiry = inquiry;
    this.urgent = urgent;
  }
}
