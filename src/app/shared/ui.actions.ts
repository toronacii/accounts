import { Action } from '@ngrx/store';

export const ENABLE_LOADING = '[UI Loading] Enabling...';
export const DISABLE_LOADING = '[UI Loading] Disabling...';

export class EnableLoadingAction implements Action {
    readonly type = ENABLE_LOADING;
}

export class DisableLoadingAction implements Action {
    readonly type = DISABLE_LOADING;
}

export type actions = EnableLoadingAction | DisableLoadingAction;
