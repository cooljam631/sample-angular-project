import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './person';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPersonsByGWA(): Observable<Person[]>{
    return this.http.get<Person[]>(`${this.baseUrl}/gwa`);
  }

  public getPersonsByDateHired(): Observable<Person[]>{
    return this.http.get<Person[]>(`${this.baseUrl}/date-hired`);
  }

  public getPersonsByLastName(): Observable<Person[]>{
    return this.http.get<Person[]>(`${this.baseUrl}/last-name`);
  }

  public createPerson(person: Person): Observable<Person>{
    return this.http.post<Person>(`${this.baseUrl}/create`, person);
  }

  public updatePerson(personId: number, updatedData: Person): Observable<Person>{
    return this.http.put<Person>(`${this.baseUrl}/update/${personId}`, updatedData);
  }

  public deletePerson(personId: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/delete/${personId}`);
  }

  public getPersonById(personId: number): Observable<Person>{
    return this.http.get<Person>(`${this.baseUrl}/${personId}`);
  }

  public addRoleToPerson(personId: number, roleId: number): Observable<Person>{
    return this.http.post<Person>(`${this.baseUrl}/${personId}/roles/${roleId}`, {});
  }

  public removeRoleFromPerson(personId: number, roleId: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${personId}/roles/${roleId}`)
  }
}
