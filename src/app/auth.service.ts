import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  redirectIfJWTNotExist() {
    if (!localStorage.getItem('jwt')) this.router.navigate(['/login']);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
