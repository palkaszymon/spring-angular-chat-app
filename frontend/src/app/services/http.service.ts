import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url: string = ''
  constructor(private http: HttpClient) {
  }

  get<T>(route: string) {
    return this.http.get<T>(`${this.url + route}`)
  }

  post<T>(apiRoute: string, body: unknown) {
    return this.http.post<T>(`${this.url + apiRoute}`, body, {observe: "response"});
  }
}
