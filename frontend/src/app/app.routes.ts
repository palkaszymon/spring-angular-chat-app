import { Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {ChatroomComponent} from "./components/chatroom/chatroom.component";
import {RegistrationComponent} from "./components/auth/registration/registration.component";

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: "full"},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatroomComponent}
];
