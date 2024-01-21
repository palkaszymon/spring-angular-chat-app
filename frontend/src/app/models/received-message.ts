import {Message} from "./message";

export class ReceivedMessage extends Message {
  constructor(sender: string, receiver: string, sentAt: Date, content: string) {
    super(sender, receiver, sentAt, content);
  }
}
