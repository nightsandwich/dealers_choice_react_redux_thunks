import { connect } from "react-redux";
import React from "react";
import {deleteVenue, visited} from './store';

import Create from "./Create";


const Venues = ({venues, deleteVenue, visited}) => {
    return (
        <div>
            <Create />
            <ul>
            {
                venues.map( venue => { 
                    return (
                        <li key={ venue.id }>
                            <h3>{ venue.name } <button onClick={()=>deleteVenue(venue.id)}>DELETE</button></h3>
                            <br></br>
                            <label>Visited?</label>
                            <input type="checkbox" defaultChecked={venue.visited} onChange={()=>visited(venue)}/>
                            <div>
                                <a href={venue.website}>Website</a>
                            </div>
                            <div>
                                <img src={venue.imageUrl}></img>
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

export default connect(state => state, mapDispatchToProps)(Venues);