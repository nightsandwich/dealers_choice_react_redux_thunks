import React from 'react';
import {connect} from 'react-redux';

const Nav = ({venues, neighborhoods}) => {
    return (
        <>
        <nav>
            
            <h1>TOP SPOTS IN BROOKLYN</h1>
            <a href='#venues'>Venues {venues.length}</a>
            <a href='#neighborhoods'>Neighborhoods {neighborhoods.length}</a>
            <a href='#visited'>Visited {venues.filter(venue => venue.visited).length}</a>
            <a href='#mustvisit'>Must Visit {venues.filter(venue => !venue.visited).length}</a>
        </nav>
        </>
    )
}
export default connect(state => state)(Nav);