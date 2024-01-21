export class Message {
  sender: string;
  receiver: string;
  sentAt: Date;
  content: string;

  constructor(sender: string, receiver: string, sentAt: Date, content: string) {
    this.sender = sender;
    this.receiver = receiver;
    this.sentAt = sentAt;
    this.content = content;
  }
}
