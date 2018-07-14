import { Action } from '@ngrx/store';
import { Account } from './account.model';

export const SET_ITEMS = '[Account] Set Account';
export const UNSET_ITEMS = '[Account] Unset Account';

export class SetAccountAction implements Action {
    readonly type = SET_ITEMS;

    constructor(public items: Account[]) {}
}

export class UnsetAccountAction implements Action {
    readonly type = UNSET_ITEMS;
}

export type actions = SetAccountAction | UnsetAccountAction;
