import * as authActions from './auth.actions';
import { User } from './user.model';

export interface AuthState {
    user: User;
}

const initialState: AuthState = {
    user: null
};

export const reducer = (state = initialState, action: authActions.actions): AuthState => {
    switch (action.type) {
        case authActions.SET_USER:
            return {
                user: { ...action.user }
            };
        case authActions.UNSET_USER:
            return { ...initialState };
        default:
            return state;
    }
};




