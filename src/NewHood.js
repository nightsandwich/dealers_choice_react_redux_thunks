import React, { Component } from 'react';
import { connect } from 'react-redux';
import {newHood} from './store';

class NewHood extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: ''
    };
  }
  render(){
    const { name } = this.state;
    
    return (
      <form>
          ADD NEW NEIGHBORHOOD
          <br></br>
        <label className='label'>Name</label>
        <input value={ name } onChange={ ev => this.setState({ name: ev.target.value})}/>
        <button onClick={()=> this.props.newHood(name)}>ADD</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    newHood: 
      (name)=> {
          dispatch(newHood(name))
      }
  };
}

export default connect(state => state, mapDispatchToProps)(NewHood);
