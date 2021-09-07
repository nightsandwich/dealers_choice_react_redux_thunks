import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {create} from './store';

class Create extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      neighborhood: ''
    };
  }
  render(){
    const { name, neighborhood } = this.state;
    return (
      <form>
        <label className='label'>Name</label>
        <input value={ name } onChange={ ev => this.setState({ name: ev.target.value})}/>
        <br></br>
        <label >
            Neighborhood
        </label>
        
        <select value={neighborhood} onChange={ev => this.setState({neighborhood: ev.target.value})}>
            {
            this.props.neighborhoods.map( neighborhood => { 
                return (
                <option value={ neighborhood.id } key={ neighborhood.id } >
                    {neighborhood.name}
                </option>
                );
            })
            }
        </select>
        
        <button onClick={()=> this.props.create(name, neighborhood)}>Create</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    create: async(name, neighborhood)=> {
      console.log(name, neighborhood);
      
      const venue = (await axios.post('/api/venues', { name, neighborhood })).data;
      console.log(venue);
      dispatch(create(venue));
    }
  };
}

export default connect(state => state, mapDispatchToProps)(Create);
