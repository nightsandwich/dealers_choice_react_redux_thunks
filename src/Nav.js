import React from 'react';
import {connect} from 'react-redux';

const Nav = ({venues, neighborhoods}) => {
    return (
        <nav>
            <a href='#venues'>Venues {venues.length}</a>
            <a href='#neighborhoods'>Neighborhoods {neighborhoods.length}</a>
        </nav>
    )
}
export default connect(state => state)(Nav);