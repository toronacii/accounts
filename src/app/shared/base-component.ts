import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

export abstract class BaseComponent implements OnDestroy {
    private subscriptions: Subscription[] = [];
    public isLoading = false;

    constructor(protected store: Store<AppState>) {}

    set newSubcription(sub: Subscription) {
        this.subscriptions.push(sub);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    subscribeLoading() {
        this.newSubcription = this.store.select('ui')
            .subscribe(ui => this.isLoading = ui.isLoading);
    }
}
