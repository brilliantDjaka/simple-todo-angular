import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('jwt')){
      this.router.navigate(['/todo']);
    }
    this.route.queryParams.subscribe((params) => {
      if (params['t']) {
        localStorage.setItem('jwt', atob(params['t']));
        this.router.navigate(['/todo']);
      }
    });
  }
  login() {
    window.location.href = `${environment.BASE_URL_API}/auth/login/google`;
  }
}
