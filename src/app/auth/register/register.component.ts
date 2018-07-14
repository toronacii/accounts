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

  isLoading = false;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService) { super(); }

  ngOnInit() {
    this.newSubcription = this.store.select('ui')
      .subscribe(ui => this.isLoading = ui.isLoading);
  }

  onSubmit(user) {
    this.authService.register(user.name, user.email, user.password);
  }

}
