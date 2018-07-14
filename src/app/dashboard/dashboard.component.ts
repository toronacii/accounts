import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts/accounts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
    this.accountsService.initAccountsListener();
  }

}
