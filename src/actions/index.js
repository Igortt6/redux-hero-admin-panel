import { filtersFetched, filtersFetching, filtersFetchingError } from "../components/heroesFilters/filtersSlice";
import { heroesFetched, heroesFetching, heroesFetchingError } from "../components/heroesList/heroesSlice";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

//========================================================================================================================================================

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}