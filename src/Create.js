import React, { Component } from 'react';
import { connect } from 'react-redux';
import {create} from './store';

class Create extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      neighborhoodId: 1,
      website: '',
      imageUrl: ''
    };
  }
  render(){
    const { name, neighborhoodId, website, imageUrl } = this.state;
    
    return (
      <form id='create'>
          <h3>ADD NEW VENUE</h3>
          <br></br>
        <label className='label'>Name</label>
        <input value={ name } onChange={ ev => this.setState({ name: ev.target.value})}/>
        <br></br>
        <label >
            Neighborhood
        </label>
        
        <select value={neighborhoodId} onChange={ev => this.setState({neighborhoodId: ev.target.value})}>
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
        <br></br>
        <label className='label'>Website</label>
        <input value={ website } onChange={ ev => this.setState({ website: ev.target.value})}/>
        <br></br>
        <label className='label'>Image URL</label>
        <input value={ imageUrl } onChange={ ev => this.setState({ imageUrl: ev.target.value})}/>
        <br></br>
        <button onClick={()=> this.props.create(name, neighborhoodId, website ? website : 'https://www.yelp.com', imageUrl ? imageUrl : 'stock.png')}>ADD</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    create: 
      (name, neighborhoodId, website, imageUrl)=> {
          dispatch(create(name, neighborhoodId, website, imageUrl))
      }
  };
}

export default connect(state => state, mapDispatchToProps)(Create);
