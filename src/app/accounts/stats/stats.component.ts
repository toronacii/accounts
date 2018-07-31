import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAccount from '../accounts.reducer';
import { BaseComponent } from '../../shared/base-component';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styles: []
})
export class StatsComponent extends BaseComponent implements OnInit {

  incomings: number;
  outcomings: number;
  totalIncoming: number;
  totalOutcoming: number;

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor(store: Store<fromAccount.AppState>) { super(store); }

  ngOnInit() {
    this.newSubcription = this.store
      .select('account')
      .subscribe(account => {
        this.reset();
        account.items.forEach(item => {
          if (item.type === 'incoming') {
            this.incomings += +item.amount;
            this.totalIncoming++;
          } else {
            this.outcomings += +item.amount;
            this.totalOutcoming++;
          }
        });
        this.doughnutChartData = [this.incomings, this.outcomings];
      });
  }

  reset() {
    this.incomings = this.outcomings = this.totalIncoming = this.totalOutcoming = 0;
    this.doughnutChartData = [];
  }

}
