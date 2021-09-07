import { connect } from "react-redux";
import React from "react";
import NewHood from "./NewHood";

const Neighborhoods = ({neighborhoods}) => {
    return (
        <div className='venues'>
            <NewHood />
            <ul className='neighborhoods'>
            {
                neighborhoods.map( neighborhood => { 
                    return (
                        <li key={ neighborhood.id } >
                            { neighborhood.name }
                            <ul className='venueslist'>
                                {neighborhood.venues.map(venue => {
                                    return (
                                        <li key={venue.id}>
                                            {venue.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    );
                })
            }
            </ul>
            
        </div>
    );
}


export default connect(state => state)(Neighborhoods);