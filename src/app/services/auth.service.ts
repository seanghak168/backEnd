import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

   loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
   isLoggedInGuard: boolean = false;

  constructor(private afAuth: AngularFireAuth, private toast: ToastrService , private route: Router) {}

  //

  login( user: {email: string, password: string}) {
    this.afAuth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        // console.log(email, password);
        this.toast.success('Login Successfully');
        this.loadUser()
        this.loggedIn.next(true);
        this.isLoggedInGuard = true;
        this.route.navigate(['/']);
      })
      .catch((err) => {
        this.toast.warning('Khos ai pek');
        // console.log(err);
      });
  }

  // loginOne(user: { email: string; password: string }) {
  //   this.toast.success('Login Successfully');
  //   return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  // }

  loadUser() {
    this.afAuth.authState.subscribe(user => {
      // console.log(JSON.parse(JSON.stringify(user)));
      localStorage.setItem('user', JSON.stringify(user));
       
    })
  }

  // ======================

  logOut() {
    this.afAuth.signOut().then(() =>{
      this.toast.success('log jenh ai pek');
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard = false;
      this.route.navigate(['/login']);
    })
  }

  // ======================
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
