import { DisableLoadingAction } from './../shared/ui.actions';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountType, Account } from './account.model';
import { AccountsService } from './accounts.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { EnableLoadingAction } from '../shared/ui.actions';
import { BaseComponent } from '../shared/base-component';

import * as fromAccount from './accounts.reducer';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styles: []
})
export class AccountsComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  type: AccountType = 'incoming';

  constructor(
    private accountsService: AccountsService,
    store: Store<fromAccount.AppState>) { super(store); }

  ngOnInit() {
    this.subscribeLoading();
    this.form = new FormGroup({
      'description': new FormControl('', Validators.required),
      'amount': new FormControl(0, Validators.min(1)),
    });
  }

  submit() {
    if (this.form.valid) {
      this.store.dispatch(new EnableLoadingAction());
      const account = Account.create({ ...this.form.value, type: this.type });
      this.accountsService
        .addAccount(account)
        .then(() => {
          this.form.reset({
            'amount': 0
          });
          Swal('Creado', account.description, 'success');
          this.store.dispatch(new DisableLoadingAction());
        })
        .catch(error => {
          Swal('Error creando', account.description, 'error');
          this.store.dispatch(new DisableLoadingAction());
        });
    }
  }

  isType(type: AccountType) {
    return this.type === type;
  }

  setType(type: AccountType) {
    this.type = type;
  }

}
