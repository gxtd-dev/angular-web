import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>('users');
  }

  createUser(user: User): Observable<User> {
    return this._httpClient.post<User>('user', user);
  }

  updateUser(user: User): Observable<User> {
    return this._httpClient.put<User>('user', user);
  }

}
