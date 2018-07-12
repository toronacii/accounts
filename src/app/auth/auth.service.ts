import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore) { }

  register(username, email, password) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((afUser) => {
        const user: User = {
          name: username,
          email: email,
          uid: afUser.user.uid
        };

        this.afDB
          .doc(`${ user.uid }/user`)
          .set(user)
          .then(() => this.router.navigate(['/']));
      })
      .catch(error => Swal('Register Error', error.message, 'error'));
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(fbUser => {

    });
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['/']))
      .catch(error => Swal('Register Error', error.message, 'error'));
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map(fbUser => !!fbUser)
    );
  }
}
