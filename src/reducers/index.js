const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filterLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: []
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
                filteredHeroes: state.activeFilter === 'all' ?
                    action.payload :
                    action.payload.filter(item => item.element === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'DELETE_HERO':
            const newHeroList = state.heroes.filter((hero) => hero.id !== action.payload)
            return {
                ...state,
                heroes: newHeroList,
                filteredHeroes: state.activeFilter === 'all' ?
                    newHeroList :
                    newHeroList.filter(item => item.element === state.activeFilter),
            }

        case "ADD_HERO":
            const newHeroListCreated = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newHeroListCreated,
                filteredHeroes: state.activeFilter === 'all' ?
                    newHeroListCreated :
                    newHeroListCreated.filter(item => item.element === state.activeFilter),

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
        case 'ACTIVE_FILTER':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ?
                    state.heroes :
                    state.heroes.filter(item => item.element === state.activeFilter),
            }
        default: return state
    }
}

export default reducer;