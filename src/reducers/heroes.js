const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}


// Правила для назви АКТІОН: Завжди писати у верхньому регістрі, через _ 
const heroes = (state = initialState, action) => {
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
                heroes: state.heroes.filter((hero) => hero.id !== action.payload),
            }

        case "ADD_HERO":
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
            }

        default: return state
    }
}

export default heroes