import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpService} from "../../../services/http.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private http: HttpService) {
  }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        fullName: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }

  register() {
    const newUser = this.registrationForm.value
    this.http.post<HttpResponse<unknown>>('/api/auth/register', {
      username: newUser.username,
      fullName: newUser.fullName,
      password: newUser.password
    }).subscribe(
      (response) => {
        if (response.status === 201) {
          this.router.navigate(['/login'])
        }
      },
      (error: HttpErrorResponse) => alert(error.error)
    )
  }
}
