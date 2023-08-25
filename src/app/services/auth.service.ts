import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUser: string = '';
  private IsUserLogedIn = new BehaviorSubject<boolean>(false);
  IsUserLogedIn$ = this.IsUserLogedIn.asObservable();

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.loggedInUser = 'admin';
      this.GetLoggedIn();
      return true;
    } else if (username === 'user' && password === 'user') {
      this.loggedInUser = 'user';
      this.GetLoggedIn();
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return !!this.loggedInUser;
  }

  GetLoggedIn() {
    this.IsUserLogedIn.next(this.isLoggedIn());
  }


  isAdmin(): boolean {
    return this.loggedInUser === 'admin';
  }

  logout() {
    this.loggedInUser = '';
    this.GetLoggedIn();
    this.router.navigate(['/login'])
  }

  getLoggedInUser() {
    return this.loggedInUser
  }
}
