import React, { Component } from 'react';
import { render } from 'react-dom';

import {Provider, connect} from 'react-redux';
import store, {loadVenues, loadNeighborhoods, setView } from './store';
import Nav from './Nav';
import Venues from './Venues';
import Neighborhoods from './Neighborhoods';

class _App extends Component{
    componentDidMount(){
        this.props.bootstrap();
        window.addEventListener('hashchange', ()=> {
            this.props.setView(window.location.hash.slice(1));
            //console.log(window.location.hash.slice(1));
            //console.log(this.props.view);
        });
        this.props.setView(window.location.hash.slice(1));
    }

    render(){
        const { view } = this.props;
        return (
            <div>
                <Nav />
                {view === 'neighborhoods' ? <Neighborhoods /> : <Venues />}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch)=> {
    return{
        bootstrap: ()=> {
            dispatch(loadVenues());
            dispatch(loadNeighborhoods());
        },
        setView: (view) => {
            dispatch(setView(view));
        }
    };
};

const App = connect(state => state, mapDispatchToProps)(_App);


render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));