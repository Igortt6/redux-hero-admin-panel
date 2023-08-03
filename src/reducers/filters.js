const initialState = {
    filters: [],
    filterLoadingStatus: 'idle',
    activeFilter: 'all',
}


// Правила для назви АКТІОН: Завжди писати у верхньому регістрі, через _ 
const filters = (state = initialState, action) => {
    switch (action.type) {
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
        case 'ACTIVE_FILTER':
            return {
                ...state,
                activeFilter: action.payload,
            }
        default: return state
    }
}

export default filters;