import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import {Provider, connect} from 'react-redux';
import store, {loadVenues, loadNeighborhoods, setView } from './store';
import Nav from './Nav';
import Venues from './Venues';
import Neighborhoods from './Neighborhoods';

const App = connect(
    state => state,
    (dispatch)=> {
        return{
            bootstrap: async()=> {
                const venues =  (await (axios.get('/api/venues'))).data;
                dispatch(loadVenues(venues));
                const neighborhoods =  (await (axios.get('/api/neighborhoods'))).data;
                dispatch(loadNeighborhoods(neighborhoods));
            },
            setView: function(view){
                dispatch(setView(view));
            }
        };
    }
)(class App extends Component{
  componentDidMount(){
      this.props.bootstrap();
      window.addEventListener('hashchange', ()=> {
        this.props.setView(window.location.hash.slice(1));
    });
    this.props.setView(window.location.hash.slice(1));
  }
  render(){
    const { view } = this.props;
    return (
        <div>
            {view}
            <Nav />
            {view === 'venues' && <Venues />}
            {view === 'neighborhoods' && <Neighborhoods />}
        </div>
    );
  }
})

render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));