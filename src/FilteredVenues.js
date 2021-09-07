import { connect } from "react-redux";
import React from "react";
import {deleteVenue, visited} from './store';
import Venues from './Venues';
import Create from "./Create";


const FilteredVenues = ({venues, view}) => {
    return (
        <div className='venues'>
            <Create />
            {
                view === 'visited' ?
                    <Venues filteredVenues={venues.filter(venue => venue.visited)}/>
                :
                view === 'mustvisit' ?
                    <Venues filteredVenues={venues.filter(venue => !venue.visited)}/>
                :
                view === 'venues' ?
                    <Venues filteredVenues={venues}/>
                : ''
                
            }
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        deleteVenue: venueId => dispatch(deleteVenue(venueId)),
        visited: venue => dispatch(visited(venue))
    }
}

export default connect(state => state, mapDispatchToProps)(FilteredVenues);