import { AuthService } from './../auth/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Account } from './account.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { SetAccountAction } from './accounts.actions';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(
    private afDB: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>) { }

  initAccountsListener() {
    this.store.select('auth')
      .pipe(
        filter(auth => !!auth.user),
        map(auth => auth.user.uid)
      )
      .subscribe(this.setAccountItems.bind(this));

  }

  addAccount(account: Account) {
    const uid = this.authService.user.uid;
    return this.afDB.doc(`${ uid }/accounts`)
      .collection('items')
      .add({ ...account });
  }

  deleteAccount(uid: string) {
    const user = this.authService.user;
    return this.afDB.doc(`${ user.uid }/accounts/items/${ uid }`)
      .delete();
  }

  private setAccountItems(uid: string) {
    this.afDB.collection(`${ uid }/accounts/items`)
      .snapshotChanges()
      .pipe(map(actions => actions.map(action => {
        const doc = action.payload.doc;
        return Account.create({ ...doc.data(), uid: doc.id } as Account);
      })))
      .subscribe(items => this.store.dispatch(new SetAccountAction(items)));
  }
}
