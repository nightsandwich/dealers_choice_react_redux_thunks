import { connect } from "react-redux";
import React from "react";

const Neighborhoods = ({neighborhoods}) => {
    return (
        <div>
            <ul>
            {
                neighborhoods.map( neighborhood => { 
                    return (
                        <li key={ neighborhood.id }>
                            { neighborhood.name }
                            <ul>
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