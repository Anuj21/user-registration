import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ISignUp } from '../sign-up/sign-up.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public url: string = 'https://demo-api.now.sh/users';

  constructor(private http: HttpClient) {}

  public registerUser(user: ISignUp): Promise<unknown> {
    return lastValueFrom(this.http.post(`${this.url}`, user));
  }
}
