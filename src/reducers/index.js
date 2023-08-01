const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filterLoadingStatus: 'idle'
}


// Правила для назви АКТІОН: Завжди писати у верхньому регістрі, через _ 
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'DELETE_HERO':
            return {
                ...state,
                heroes: state.heroes.filter((hero) => hero.id !== action.payload)
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filterLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filterLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filterLoadingStatus: 'error'
            }
        default: return state
    }
}

export default reducer;