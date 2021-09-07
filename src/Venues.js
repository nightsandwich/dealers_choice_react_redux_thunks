import { connect } from "react-redux";
import React from "react";
import {deleteVenue} from './store';

import Create from "./Create";


const Venues = ({venues, deleteVenue}) => {
    return (
        <div>
            <Create />
            <ul>
            {
                venues.map( venue => { 
                    return (
                        <li key={ venue.id }>
                            { venue.name }
                            <button onClick={()=>deleteVenue(venue.id)}>DELETE</button>
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
        deleteVenue: venueId => dispatch(deleteVenue(venueId))
    }
}

export default connect(state => state, mapDispatchToProps)(Venues);