import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}
  private isAuthenticated: boolean = false;

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  register(userData: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, userData);
  }
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
  logout(): void {
    // Realiza el cierre de sesión
    // Establece isAuthenticated en false
    this.isAuthenticated = false;
  }

}
  

