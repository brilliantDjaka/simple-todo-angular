import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService:AuthService){}
  title = 'simple-todo-angular';
  checkJwt() {
    if (localStorage.getItem('jwt')) return true;
    return false;
  }
  logout(){
    this.authService.logout();
  }
}
