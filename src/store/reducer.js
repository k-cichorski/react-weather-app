export const initialState = {
    hidden: {
        'SearchModule': true,
    }
}

export const HIDE = 'HIDE_ELEMENT';
export const SHOW = 'SHOW_ELEMENT';

function reducer(state, action) {
    switch (action.type) {
        case SHOW:
            let newState = {
                ...state
            }
            newState.hidden[action.element] = false;
            return newState
    }
}

export default reducer;
