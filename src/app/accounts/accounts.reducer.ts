import * as accountActions from './accounts.actions';
import { Account } from './account.model';
import { AppState } from '../app.reducer';

export interface AccountState {
    items: Account[];
}

export interface AppState extends AppState {
    account: AccountState;
}

const initialState: AccountState = {
    items: []
};

export function reducer(state = initialState, action: accountActions.actions): AccountState {
    switch (action.type) {
        case accountActions.SET_ITEMS:
            return {
                items: [...action.items.map(item => ({ ...item }))]
            };
        case accountActions.UNSET_ITEMS:
            return {
                items: []
            };
        default:
            return state;
    }
};
