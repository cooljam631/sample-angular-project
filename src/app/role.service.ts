import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Role } from './role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  getRoles(): Observable<Role[]>{
    return this.http.get<Role[]>(`${this.baseUrl}/roles`);
  }
}
