import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private userDetailsSubject = new Subject<User | null>();

  updateUserDetails(user: User) {
    sessionStorage.setItem('username', user.username)
    sessionStorage.setItem('fullName', user.fullName)
    sessionStorage.setItem('online', String(user.online))
    this.userDetailsSubject.next(user);
  }

  getUserDetails(): User | null {
    let storageUser = sessionStorage.getItem('username')
    if (storageUser) {
      return new User(
        storageUser,
        sessionStorage.getItem('fullName')!,
        Boolean(sessionStorage.getItem('online')))
    }
    else {
      return null
    }
  }

  clearStorage() {
    sessionStorage.clear();
    this.userDetailsSubject.next(null);
  }

  public getUserDetailsSubject() {
    return this.userDetailsSubject;
  }
}
