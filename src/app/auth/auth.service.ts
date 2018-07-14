import { SetUserAction, UnsetUserAction } from './auth.actions';
import { EnableLoadingAction, DisableLoadingAction } from './../shared/ui.actions';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { map } from 'rxjs/operators';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { UnsetAccountAction } from '../accounts/accounts.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription = new Subscription();
  private _user: User;

  get user(): User {
    return User.create(this._user);
  }

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthListener() {
    this.userSubscription = this.afAuth.authState
      .subscribe(afUser => {
        if (afUser) {
          this.afDB
            .doc(`${ afUser.uid }/user`)
            .valueChanges()
            .subscribe(userDoc => {
              this._user = User.create(userDoc as User);
              const action = new SetUserAction(this._user);
              this.store.dispatch(action);
            });
        } else {
          this._user = null;
        }
      });
  }

  register(username, email, password) {
    this.store.dispatch(new EnableLoadingAction());

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
          .then(() => {
            this.router.navigate(['/']);
            this.store.dispatch(new DisableLoadingAction());
          });
      })
      .catch(error => {
        this.store.dispatch(new DisableLoadingAction());
        Swal('Register Error', error.message, 'error');
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(new EnableLoadingAction());

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/']);
        this.store.dispatch(new DisableLoadingAction());
      })
      .catch(error => {
        Swal('Login Error', error.message, 'error');
        this.store.dispatch(new DisableLoadingAction());
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
    this.store.dispatch(new UnsetUserAction());
    this.store.dispatch(new UnsetAccountAction());
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map(fbUser => !!fbUser)
    );
  }
}
