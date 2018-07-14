import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseComponent } from '../../shared/base-component';
import { AppState } from '../../app.reducer';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(
    store: Store<AppState>,
    private authService: AuthService) { super(store); }

  ngOnInit() {
    this.subscribeLoading();
  }

  onSubmit(user) {
    this.authService.register(user.name, user.email, user.password);
  }

}
