import {createStore, combineReducers, applyMiddleware} from 'redux';
const LOAD_VENUES = 'LOAD_VENUES';
const LOAD_NEIGHBORHOODS = 'LOAD_NEIGHBORHOODS';
const SET_VIEW = 'SET_VIEW';
const CREATE = 'CREATE';

import axios from 'axios';
import thunk from 'redux-thunk';


const venuesReducer = (state = [], action) => {
    if(action.type === LOAD_VENUES){
        state = action.venues;
    }
    if(action.type === CREATE){
        state = [...state, action.venue]
    }
    return state;
}
const neighborhoodsReducer = (state = [], action) => {
    if(action.type === LOAD_NEIGHBORHOODS){
        state = action.neighborhoods;
    }
    return state;
}
const viewReducer = (state = 'venues', action) => {
    if(action.type === SET_VIEW){
        state = action.view;
    }
    return state;
}

const reducer = combineReducers({
    venues: venuesReducer,
    neighborhoods: neighborhoodsReducer,
    view: viewReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

const loadVenues = (venues) => {
    return {
    type: LOAD_VENUES,
    venues
    }
}
const loadNeighborhoods = (neighborhoods) => {
    return {
        type: LOAD_NEIGHBORHOODS,
        neighborhoods
    }
}
const setView = (view) => (
    {
        type: SET_VIEW,
        view
    }
)
const create = (venue) => {
    return {
        type: CREATE,
        venue
    }
}


export default store;
export {loadVenues, loadNeighborhoods, setView, create};