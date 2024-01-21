import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {UserDetailsService} from "../../../services/user-details.service";
import {User} from "../../../models/user";
import {HttpService} from "../../../services/http.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userDetailsService: UserDetailsService,
              private http: HttpService) {
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
      }
    )
  }

  login() {
    let newUser = this.loginForm.value
    this.http.post('/api/auth/login', {
      username: newUser.username,
      password: newUser.password
    }).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.userDetailsService.updateUserDetails(response.body as User)
          this.router.navigate(['/chat']);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      }
    )
    //
  }
}
