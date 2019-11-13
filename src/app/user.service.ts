import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import * as global from './endpoints/races';
import { UserModel } from './models/user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtInterceptorService } from './jwt-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userEvents = new BehaviorSubject<UserModel>(undefined);
  constructor(private http: HttpClient, private router: Router, private jwtInterceptorService: JwtInterceptorService) {
    this.retrieveUser();
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = { login, password, birthYear };
    return this.http.post<UserModel>(global.endpoint + '/api/users', body);
  }
  authenticate(credentials: { login: string; password: string }) {
    return this.http.post<UserModel>(global.endpoint + '/api/users/authentication', credentials).pipe(
      tap((user: UserModel) => {
        this.userEvents.next(user);
        this.storeLoggedInUser(user);
      })
    );
  }
  storeLoggedInUser(user: UserModel) {
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
  }
  getIteminLocalStorage(key: string) {
    return JSON.parse(window.localStorage.getItem(key));
  }
  retrieveUser(): void {
    const user = this.getIteminLocalStorage('rememberMe');
    if (user) {
      this.userEvents.next(user);
      this.jwtInterceptorService.setJwtToken(user.token);
    }
  }
  logout(): void {
    window.localStorage.clear();
    this.userEvents.next(null);
    this.jwtInterceptorService.removeJwtToken();
    this.router.navigate(['/']);
  }
}
