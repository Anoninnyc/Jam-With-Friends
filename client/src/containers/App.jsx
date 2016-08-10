import React, { Component } from 'react';
import LandingPage from './LandingPage';
import Nav from './Nav';
import Login from './Login';
import Signup from './Signup';
import SelectInstrument from './SelectInstrument';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "LandingPage"
    }
  }

  toggleView(viewChange) {
    this.setState({
      view:viewChange
    })
  }


  render() {
    if (this.state.view==='LandingPage'){
    return ( 
      < div >
        < Nav change = {this.toggleView.bind(this)}/> 
        < LandingPage / >
      < /div>
    )
  } else if( this.state.view==='login') {
    return ( 
      < div >
         <Login change = {this.toggleView.bind(this)}/>
      < /div>
    )
  } else if ( this.state.view==='signup') {
    return ( 
        < div >
           <Signup change = {this.toggleView.bind(this)}/>
        < /div>
    )
   }else if ( this.state.view==='selectInstrument'){
    return ( 
      < div >
        <SelectInstrument />
      < /div>
    )
   }
  }
}
export default App;