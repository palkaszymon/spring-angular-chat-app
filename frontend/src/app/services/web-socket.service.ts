import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {UserDetailsService} from "./user-details.service";
import {ChatDataService} from "./chat-data.service";
import {User} from "../models/user";
import {SentMessage} from "../models/sent-message";
import {ReceivedMessage} from "../models/received-message";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient;
  private loggedInUser!: User;
  constructor(private userDetailsService: UserDetailsService,
              private chatDataService: ChatDataService) {
    this.loggedInUser = this.userDetailsService.getUserDetails()!;
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = () => {}; //turns off console logs with ws messages
  }

  public connect() {
    const socket = new SockJS('http://localhost:8080/ws');
    const headers = {
      'custom-session-id': this.loggedInUser.username
    }
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect(headers, () => {this.onConnection()}, () => this.onError())
  }

  public sendMessage(message: SentMessage) {
    this.chatDataService.addMessage(message, message.receiver)
    this.stompClient.send('/app/chat', {}, JSON.stringify(message))
  }

  private onConnection() {
    this.stompClient.subscribe(`/user/${this.loggedInUser.username}/queue/messages`, (message) => this.onDirectMessage(message));
    this.stompClient.subscribe(`/user/public`, (message) => this.onPublicMessage(message));
  }

  private onError() {
    alert("Error connecting to websocket")
  }

  private onPublicMessage(payload: Stomp.Message) {
    let user = JSON.parse(payload.body) as User
    if (!user.online) {
      this.chatDataService.removeUser(user);
      return;
    }

    if (user.username !== this.loggedInUser.username) {
      this.chatDataService.addUser(user)
    }
  }

  private onDirectMessage(payload: Stomp.Message) {
    let payloadMessage = JSON.parse(payload.body)
    let sendMsg = new ReceivedMessage(payloadMessage.sender, payloadMessage.receiver, payloadMessage.sentAt, payloadMessage.content)
    this.chatDataService.addMessage(sendMsg, sendMsg.sender)
  }

  public disconnect() {
    this.stompClient.disconnect(() => {}, {});
  }
}
