import { connect } from "react-redux";
import React from "react";
import {deleteVenue, visited} from './store';
import Create from "./Create";

const _Venues = ({deleteVenue, visited, venues, view}) => {
    
    return (
        <div className='venues'>
            <Create />
            <ul>
            { 
                venues.filter(venue => view === 'venues' || (venue.visited && view === 'visited') || (!venue.visited && view === 'mustvisit')).map(venue => {
                    return (
                        <li key={ venue.id }>
                            <h3>{ venue.name } <button onClick={()=>deleteVenue(venue.id)}>DELETE</button></h3>
                            <div className='visited'>
                                Visited? <input type="checkbox" defaultChecked={venue.visited} onChange={()=>visited(venue)}/>
                            </div>
                            <div>
                                <img src={venue.imageUrl}></img>
                            </div>
                            <div>
                                <a href={venue.website}>Website</a>
                            </div>
                            <div>
                                (Neighborhood: {venue.neighborhood.name})
                            </div>
                        </li>
                    );
                }) 
            }
            </ul>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        deleteVenue: venueId => dispatch(deleteVenue(venueId)),
        visited: venue => dispatch(visited(venue))
    }
}

const Venues = connect(state => state, mapDispatchToProps)(_Venues);
export default Venues;