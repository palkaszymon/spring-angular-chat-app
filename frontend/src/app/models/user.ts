export class User {
  username: string;
  fullName: string;
  online: boolean;

  constructor(username: string, fullName: string, online: boolean) {
    this.username = username;
    this.fullName = fullName;
    this.online = online;
  }
}
