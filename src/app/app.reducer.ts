import { ActionReducerMap } from '@ngrx/store';
import * as uiReducer from './shared/ui.reducer';
import * as authReducer from './auth/auth.reducer';
import * as accountsReducer from './accounts/accounts.reducer';

export interface AppState {
    ui: uiReducer.UIState;
    auth: authReducer.AuthState;
    account: accountsReducer.AccountState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducer.reducer,
    auth: authReducer.reducer,
    account: accountsReducer.reducer
};

