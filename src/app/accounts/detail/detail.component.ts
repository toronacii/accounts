import Swal from 'sweetalert2';
import { AccountsService } from './../accounts.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Account } from '../account.model';
import { BaseComponent } from '../../shared/base-component';
import * as fromAccount from '../accounts.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent extends BaseComponent implements OnInit {

  items: Account[];
  constructor(
    store: Store<fromAccount.AppState>,
    private accountsService: AccountsService) { super(store); }

  ngOnInit() {
    this.newSubcription = this.store
      .select('account')
      .subscribe(account => this.items = account.items);
  }

  delete(item: Account) {
    this.accountsService.deleteAccount(item.uid)
      .then(() => Swal('Eliminado', item.description, 'success'));
  }

}
