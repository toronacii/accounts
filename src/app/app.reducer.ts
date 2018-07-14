import { ActionReducerMap } from '@ngrx/store';
import * as uiReducer from './shared/ui.reducer';
import * as authReducer from './auth/auth.reducer';

export interface AppState {
    ui: uiReducer.UIState;
    auth: authReducer.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducer.reducer,
    auth: authReducer.reducer
};

