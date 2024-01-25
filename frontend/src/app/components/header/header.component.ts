import {Component, Input, OnInit} from '@angular/core';
import {UserDetailsService} from "../../services/user-details.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {User} from "../../models/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() pageTitle!: string
  loggedInUser!: User | null;

  constructor(private userDetailsService: UserDetailsService,
              private http: HttpService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loggedInUser = this.userDetailsService.getUserDetails();
    this.subscribeToLoggedInUser()
  }

  logout() {
    this.http.post(`/api/users/disconnect/${this.loggedInUser?.username}`, {}).subscribe(
      response => {
        if (response.status === 200) {
          this.userDetailsService.clearStorage()
          this.router.navigate(['/login'])
        }
      },
      (error: HttpErrorResponse) => alert(error.error)
    );
  }

  private subscribeToLoggedInUser() {
    this.userDetailsService.getUserDetailsSubject().subscribe((user) => {
      this.loggedInUser = user;
    })
  }
}
