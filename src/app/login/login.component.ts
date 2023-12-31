import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(){
    let resp= this.authService.login(this.username, this.password);
    resp.subscribe(data => {
      this.router.navigate(['/home']);
    })
  }
}

