import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUser: string = '';

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.loggedInUser = 'admin';
      return true;
    } else if (username === 'user' && password === 'user') {
      this.loggedInUser = 'user';
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return !!this.loggedInUser;
  }

  isAdmin(): boolean {
    return this.loggedInUser === 'admin';
  }
}
