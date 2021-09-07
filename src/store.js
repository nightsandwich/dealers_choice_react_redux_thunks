import {createStore, combineReducers, applyMiddleware} from 'redux';
const LOAD_VENUES = 'LOAD_VENUES';
const LOAD_NEIGHBORHOODS = 'LOAD_NEIGHBORHOODS';
const SET_VIEW = 'SET_VIEW';
const CREATE = 'CREATE';
const DELETE = 'DELETE';
const VISITED = 'VISITED';
const NEW_HOOD = 'NEW_HOOD';

import axios from 'axios';
import thunk from 'redux-thunk';


const venuesReducer = (state = [], action) => {
    if(action.type === LOAD_VENUES){
        state = action.venues;
    }
    if(action.type === CREATE){
        state = [action.venue];
    }
    if(action.type === DELETE){
        state = state.filter(venue => venue.id !== action.venueId)
    }
    if(action.type === VISITED){
        state = state.map(venue =>
            venue.id === action.venue.id ? action.venue : venue
        );
    }
    return state;
}
const neighborhoodsReducer = (state = [], action) => {
    if(action.type === LOAD_NEIGHBORHOODS){
        state = action.neighborhoods;
    }
    if(action.type === NEW_HOOD){
        state = [action.neighborhood];
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

const _loadVenues = (venues) => {
    return {
    type: LOAD_VENUES,
    venues
    }
}
const loadVenues = () => {
    return async (dispatch) => {
        const venues =  (await (axios.get('/api/venues'))).data;
        dispatch(_loadVenues(venues));
    } 
}
const _loadNeighborhoods = (neighborhoods) => {
    return {
        type: LOAD_NEIGHBORHOODS,
        neighborhoods
    }
}
const loadNeighborhoods = () => {
    return async(dispatch)=> {
        const neighborhoods =  (await (axios.get('/api/neighborhoods'))).data;
        dispatch(_loadNeighborhoods(neighborhoods));
    }
}
const setView = (view) => (
    {
        type: SET_VIEW,
        view
    }
)
const _create = (venue) => {
    return {
        type: CREATE,
        venue
    }
}
const create = (name, neighborhoodId) => {
    return async(dispatch) => {
        const venue = (await axios.post('/api/venues', { name, neighborhoodId })).data;
        dispatch(_create(venue));
        dispatch(loadVenues());
    }
}
const _deleteVenue = (venueId) => {
    return {
        type: DELETE,
        venueId
    }
}
const deleteVenue = (venueId) => {
    return async (dispatch) => {
        await axios.delete(`/api/venues/${venueId}`);
        dispatch(_deleteVenue(venueId));
    }
}

const _visited = venue => {
    return {
        type: VISITED,
        venue
    }
}

const visited = venue => {
    return async(dispatch) => {
        const updated = (await axios.put(`/api/venues/${venue.id}`, {visited: !venue.visited })).data;
        dispatch(_visited(updated));
    }
}
const _newHood = (neighborhood) => {
    return {
        type: NEW_HOOD,
        neighborhood
    }
}
const newHood = (name) => {
    return async(dispatch) => {
        const neighborhood = (await axios.post('/api/neighborhoods', { name })).data;
        dispatch(_newHood(neighborhood));
        dispatch(loadNeighborhoods());
    }
}

export default store;
export {loadVenues, loadNeighborhoods, setView, create, deleteVenue, visited, newHood};