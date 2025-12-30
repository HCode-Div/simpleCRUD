import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private tokenKey = 'uToken';

  login(email: string, password: string) {
    if (email && password) {
      localStorage.setItem(this.tokenKey, 'FAKE_TOKEN_123');
      return of(true);
    }
    return of(false);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
