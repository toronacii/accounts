import * as accountActions from './accounts.actions';
import { Account } from './account.model';

export interface AccountState {
    items: Account[];
}

const initialState: AccountState = {
    items: []
};

export const reducer = (state = initialState, action: accountActions.actions): AccountState => {
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
