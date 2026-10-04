import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Service()
export class AppService {

//private apiUrl = 'https://6ac2643d3f4ae78f69450797.mockapi.io/employees'; 
private apiUrl = 'http://localhost:3000/api/employees'; 
  
  // ใช้ inject() แทน constructor
  private http = inject(HttpClient); 

  getItems(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createItem(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateItem(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
