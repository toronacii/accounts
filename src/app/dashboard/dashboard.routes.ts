import { Routes } from '@angular/router';

import { StatsComponent } from './../accounts/stats/stats.component';
import { AccountsComponent } from '../accounts/accounts.component';
import { DetailComponent } from '../accounts/detail/detail.component';

export const dashboardRoutes: Routes = [
    { path: '', component: StatsComponent },
    { path: 'accounts', component: AccountsComponent },
    { path: 'detail', component: DetailComponent }
];
