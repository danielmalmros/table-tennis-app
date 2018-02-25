import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt'

@Injectable()
export class AuthService {

  authToken: any;
  userId: any;
  user: any;

  constructor(
    private http: Http
  ) { }

  registerUser(user) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).map(res => res.json());
  }

  editUserProfile(user) {
    let headers = new Headers();
    this.loadToken();
    this.loadUserId();
    
    headers.append('Authorization', this.authToken)
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/editprofile/' + this.userId, user, {headers: headers}).map(res => res.json());
  }

  authticateUser(user) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers}).map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();

    headers.append('Authorization', this.authToken)
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers}).map(res => res.json());
  }

  storUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('user_id', user.id)

    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadUserId() {
    let id = localStorage.getItem('user_id');
    id = id.replace(/^"(.*)"$/, '$1');
    this.userId = id
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;

    localStorage.clear();
  }
}
