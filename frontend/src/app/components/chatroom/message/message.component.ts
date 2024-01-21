import {Component, Input} from '@angular/core';
import {Message} from "../../../models/message";
@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() displayMessage!: Message;
  @Input() loggedInUser!: string;
}
