import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpService} from "./http.service";
import {User} from "../models/user";
import {Message} from "../models/message";
import {UserDetailsService} from "./user-details.service";

@Injectable({
  providedIn: 'root',
})
export class ChatDataService {
  private onlineUsers: User[] = [];
  private onlineUsersSubject = new Subject<User[]>();

  private activeConversationUser!: User;
  private activeConversationUserSubject = new Subject<User>();

  private messageStorage: Map<string, Message[]> = new Map<string, Message[]>;
  private messageStorageSubject = new Subject<Map<string, Message[]>>();

  constructor(private http: HttpService,
              private userDetailsService: UserDetailsService) {
    this.fetchInitialConnectedUsers()
  }

  getOnlineUsers(): Subject<User[]> {
    return this.onlineUsersSubject;
  }

  addUser(newUser: User): void {
    const existingUser = this.onlineUsers.find(user => user.username === newUser.username)
    if (!existingUser) {
      this.onlineUsers.push(newUser);
      this.notifyOnlineUsersUpdate();
    }
  }

  removeUser(userToRemove: User) {
    this.onlineUsers = this.onlineUsers.filter(user => user.username !== userToRemove.username)
    this.notifyOnlineUsersUpdate()
  }

  private notifyOnlineUsersUpdate(): void {
    this.onlineUsersSubject.next([...this.onlineUsers]);
  }

  getActiveConversationUserSubject() {
    return this.activeConversationUserSubject;
  }

  setActiveConversationUser(user: User) {
    this.activeConversationUser = user;
    if (!this.messageStorage.has(this.activeConversationUser.username)) {
      this.fetchInitialActiveConversationMessages();
    }
    this.activeConversationUserSubject.next(user);
  }

  fetchInitialConnectedUsers() {
    this.http.get<User[]>('/api/users').subscribe((data) => {
      this.onlineUsers = data;
      this.notifyOnlineUsersUpdate();
    })
  }

  getMessagesSubject() {
    return this.messageStorageSubject;
  }

  getMessagesForUser(user: string) {
    return this.messageStorage.get(user);
  }

  addMessage(message: Message, queue: string) {
    let existingMessages = this.messageStorage.get(queue);
    if (existingMessages) {
      existingMessages.push(message);
    } else {
      this.messageStorage.set(queue, Array.of(message));
    }
    this.notifyNewMessageUpdate();
  }

  private notifyNewMessageUpdate() {
    let copyMap = new Map(this.messageStorage);
    this.messageStorageSubject.next(copyMap);
  }

  private fetchInitialActiveConversationMessages() {
    let loggedInUser = this.userDetailsService.getUserDetails()!.username;
    let activeConversationUser = this.activeConversationUser.username;
    this.http.get<Message[]>(`/api/messages/${loggedInUser}/${activeConversationUser}`).subscribe(
      response => {
        this.messageStorage.set(activeConversationUser, response)
        this.notifyNewMessageUpdate();
      }
    )
  }
}
