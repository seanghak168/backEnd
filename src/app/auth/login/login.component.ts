import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor (private login: AuthService, private route: Router) {}
  onSubmit(value: any) {
    const log = this.login.login(value);
    console.log(log);
 }
}
