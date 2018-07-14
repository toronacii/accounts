import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseComponent } from '../../shared/base-component';
import { AuthService } from './../auth.service';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(
    private authService: AuthService,
    store: Store<AppState>) { super(store); }

  ngOnInit() {
    this.subscribeLoading();
  }

  login(user) {
    this.authService.login(user.email, user.password);
  }

}
