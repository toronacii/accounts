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

  isLoading = false;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>) { super(); }

  ngOnInit() {
    this.newSubcription = this.store.select('ui')
      .subscribe(ui => this.isLoading = ui.isLoading);
  }

  login(user) {
    this.authService.login(user.email, user.password);
  }

}
