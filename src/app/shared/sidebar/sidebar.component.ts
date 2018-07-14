import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { BaseComponent } from '../base-component';
import { User } from '../../auth/user.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent extends BaseComponent implements OnInit {

  user: User;

  constructor(
    public authService: AuthService,
    public store: Store<AppState>) { super(store); }

  ngOnInit() {
    this.newSubcription = this.store.select('auth')
      .pipe(filter(auth => !!auth.user))
      .subscribe(auth => this.user = auth.user);
  }

}
