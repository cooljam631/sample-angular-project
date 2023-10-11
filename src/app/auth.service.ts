import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private credentials: { username: string; password: string } | null = null;

  constructor(private http: HttpClient) { }

  public login(username: string, password: string){
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username+":"+password)})
    this.credentials = {username, password };
    return this.http.get('http://localhost:8080/api/persons/login', {headers, responseType: 'text' as 'json'});
  }

  public getCredentials(): {username: string; password: string } | null{
    return this.credentials;
  }

  setToken(token: string | null){
    console.log('Setting token:', token);
    this.token = token;
    console.log('Token Set:', token);
  }

  getToken(): string | null{
    return this.token;
  }

  logout(){
    this.setToken(null);
  }

  isLoggedIn(): boolean{
    return !!this.getCredentials();
  }
}
