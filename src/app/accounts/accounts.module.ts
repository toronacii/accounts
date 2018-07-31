import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './../dashboard/dashboard-routing.module';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { SortAccountsPipe } from './sort-accounts.pipe';
import { DetailComponent } from './detail/detail.component';
import { StatsComponent } from './stats/stats.component';
import { AccountsComponent } from './accounts.component';
import { reducer as accountReducer } from './accounts.reducer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('account', accountReducer)
  ],
  declarations: [
    DashboardComponent,
    AccountsComponent,
    StatsComponent,
    DetailComponent,
    SortAccountsPipe
  ]
})
export class AccountsModule { }
