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

  // onSubmit(value: any) {
  //    console.log(value);
  //   //  const userData = Object;
  //    const log = this.login.loginOne(value);
  //    console.log(log);
  //    this.route.navigate(['/']);
     
  // }

  onSubmit(value: any) {
    // console.log(value);

    const log = this.login.login(value);
    console.log(log);
    
 }


}
