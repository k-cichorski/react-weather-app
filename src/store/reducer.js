export const initialState = {
    hidden: {
        'SearchModule': true,
    },
    loading: false,
    cities: [],
}

export const HIDE = 'HIDE_ELEMENT';
export const SHOW = 'SHOW_ELEMENT';
export const ADD_CITY = 'ADD_CITY';
export const REMOVE_CITY = 'REMOVE_CITY';
export const TOGGLE_LOADING_ANIMATION = 'TOGGLE_LOADING_ANIMATION';

function reducer(state, action) {
    switch (action.type) {
        case SHOW:
            let showState = {
                ...state
            }
            showState.hidden[action.element] = false;
            return showState

        case HIDE:
            let hideState = {
                ...state
            }
            hideState.hidden[action.element] = true;
            return hideState

        case TOGGLE_LOADING_ANIMATION:
            return {
                ...state,
                loading: !state.loading
            }

        case ADD_CITY:
            return {
                ...state,
                cities: [
                    action.city,
                    ...state.cities
                ]
            }

        case REMOVE_CITY:
            let newCities = [...state.cities];
            newCities.splice(action.index, 1);
            return {
                ...state,
                cities: newCities
            }
    }
}

export default reducer;
