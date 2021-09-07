import { connect } from "react-redux";
import React from "react";
import {createUser} from './store';
import axios from "axios";
import { loadVenue, createNote } from "./store";
import Create from "./Create";
import { async } from "regenerator-runtime";
import { map } from "lodash";

const Venues = ({venues}) => {
    return (
        <div>
            <Create />
            <ul>
            {
                venues.map( venue => { 
                    return (
                        <li key={ venue.id }>
                            { venue.name }
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


export default connect(state => state)(Venues);