import { Routes } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {ChatroomComponent} from "./components/chatroom/chatroom.component";
import {RegistrationComponent} from "./components/auth/registration/registration.component";
import {ContactFormComponent} from "./components/contact/contact-form/contact-form.component";
import {InquiryListComponent} from "./components/contact/inquiry-list/inquiry-list/inquiry-list.component";

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: "full"},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chat', component: ChatroomComponent},
  {path: 'contact/form', component: ContactFormComponent},
  {path: 'contact/list', component: InquiryListComponent}
];
