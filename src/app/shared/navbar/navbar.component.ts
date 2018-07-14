import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { User } from '../../auth/user.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent extends BaseComponent implements OnInit {

  user: User;

  constructor(
    public store: Store<AppState>) { super(store); }

  ngOnInit() {
    this.newSubcription = this.store.select('auth')
      .pipe(filter(auth => !!auth.user))
      .subscribe(auth => this.user = auth.user);
  }

}
