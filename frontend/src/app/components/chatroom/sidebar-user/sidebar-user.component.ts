import { Component, Input } from '@angular/core';
import { User } from '../../../models/user';
import { ChatDataService } from '../../../services/chat-data.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.scss'],
})
export class SidebarUserComponent {
  @Input() displayUser!: User;
  @Input() isUserActiveConversation: boolean = false;

  constructor(private chatDataService: ChatDataService) {}

  setActiveConversationUser() {
    this.chatDataService.setActiveConversationUser(this.displayUser);
  }
}
