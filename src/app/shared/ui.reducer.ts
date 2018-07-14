import * as uiActions from './ui.actions';

export interface UIState {
    isLoading: boolean;
}

const initState: UIState = {
    isLoading: false
};

export const reducer = (state = initState, action: uiActions.actions): UIState => {
    switch (action.type) {
        case uiActions.ENABLE_LOADING:
            return { ...state, isLoading: true };
        case uiActions.DISABLE_LOADING:
            return { ...state, isLoading: false };
        default: return state;
    }
};





