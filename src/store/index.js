import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';
import thunk from 'redux-thunk';



const store = createStore(combineReducers({ heroes, filters }),
    compose(applyMiddleware(thunk))
);

export default store;


// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()