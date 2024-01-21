import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: string = 'http://localhost:8080'
  constructor(private http: HttpClient) {
  }

  get<T>(route: string) {
    return this.http.get<T>(`${this.url + route}`)
  }

  post<T>(apiRoute: string, body: any) {
    return this.http.post<T>(`${this.url + apiRoute}`, body, {observe: "response"});
  }
}
