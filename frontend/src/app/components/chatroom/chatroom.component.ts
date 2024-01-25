import {
  Component,
  OnInit,
  ElementRef,
  ViewChild, OnDestroy,
} from '@angular/core';
import {UserDetailsService} from "../../services/user-details.service";
import {User} from "../../models/user";
import {WebSocketService} from "../../services/web-socket.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ChatDataService} from "../../services/chat-data.service";
import {NgForOf, NgIf} from "@angular/common";
import {SidebarUserComponent} from "./sidebar-user/sidebar-user.component";
import {Message} from "../../models/message";
import {SentMessage} from "../../models/sent-message";
import {MessageComponent} from "./message/message.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    SidebarUserComponent,
    MessageComponent,
    NgIf
  ],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss'
})
export class ChatroomComponent implements OnInit, OnDestroy {
  loggedInUser!: User;
  activeConversationUser!: User;
  activeConversationMessages!: Message[];
  chatForm!: FormGroup;
  activeUsers: User[] = []
  @ViewChild('chatMessages') chatMessages!: ElementRef;

  constructor(private userDetailsService: UserDetailsService,
              private webSocketService: WebSocketService,
              private formBuilder: FormBuilder,
              private chatDataService: ChatDataService,
              private router: Router) {
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }

  ngOnInit(): void {
    this.loggedInUser = this.userDetailsService.getUserDetails()!;
    this.chatDataService.fetchInitialConnectedUsers();
    this.subscribeToLoggedInUser();
    this.createChatForm();
    this.webSocketService.connect();
    this.subscribeToOnlineUsers();
    this.subscribeToActiveConversationUser();
    this.subscribeToChatMessages()
  }

  createChatForm() {
    this.chatForm = this.formBuilder.group(
      {
        message: ['', [Validators.required]]
      }
    )
  }

  sendMessage() {
    const messageContent = this.chatForm.get('message')?.value.trim();
    const messageToSend = new SentMessage(
      this.loggedInUser.username,
      this.activeConversationUser.username,
      new Date(),
      messageContent
    )
    this.chatForm.reset();
    this.webSocketService.sendMessage(messageToSend);
    this.scrollChatToTop();
  }

  private subscribeToOnlineUsers() {
    this.chatDataService.getOnlineUsers().subscribe((users) => {
      this.activeUsers = users.filter(user => user.username !== this.loggedInUser.username);
    })
  }

  private subscribeToActiveConversationUser() {
    this.chatDataService.getActiveConversationUserSubject().subscribe((user) => {
      this.activeConversationUser = user
      const newUserMessages = this.chatDataService.getMessagesForUser(user.username);
      if (newUserMessages) {
        this.activeConversationMessages = newUserMessages;
      } else {
        this.activeConversationMessages = [];
      }
    })
  }

  private subscribeToChatMessages() {
    this.chatDataService.getMessagesSubject().subscribe((messages) => {
      this.activeConversationMessages = messages.get(this.activeConversationUser.username)!
    })
  }

  private subscribeToLoggedInUser() {
    this.userDetailsService.getUserDetailsSubject().subscribe((user) => {
      if (!user) {
        this.router.navigate(['/login'])
      }
      this.loggedInUser = user!;
    })
  }

  private scrollChatToTop() {
    if (this.chatMessages) {
      this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
    }
  }
}
