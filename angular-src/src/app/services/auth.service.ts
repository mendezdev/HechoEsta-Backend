import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;
  headerContent: any;
  apiUrl: string = 'http://localhost:8080/users';

  constructor(
    private http: Http
  ) { 
    this.headerContent = {
      contentType: 'Content-Type',
      appJson: 'application/json',
      authorization: 'Authorization'
    };
  }

  registerUser(user){
    let headers = new Headers();
    headers.append(this.headerContent.contentType, this.headerContent.appJson);
    return this.http.post(this.apiUrl + '/register', user, {headers: headers})
      .map(res => res.json());
  }

  authenticaUser(user){
    let headers = new Headers();
    headers.append(this.headerContent.contentType, this.headerContent.appJson);
    return this.http.post(this.apiUrl + '/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();

    this.loadToken();

    headers.append(this.headerContent.authorization, this.authToken);
    headers.append(this.headerContent.contentType, this.headerContent.appJson);

    return this.http.get(this.apiUrl + '/profile', {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;

    localStorage.clear();
  }
}
