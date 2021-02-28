import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from './employee';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  public getEmployees(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/v1/employee`);
  }
  public addEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/v1/employee/add`, employee);
  }
  public updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(`${this.apiServerUrl}/v1/employee/update`, employee);
  }
  public deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/v1/employee/delete/${employeeId}`);
  }
}

