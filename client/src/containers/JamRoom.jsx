import React, { Component } from 'react';

// import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import { AppBar, IconButton, IconMenu, Menu, MenuItem, MoreVertIcon, NavigationClose} from 'material-ui';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Paper from 'material-ui/Paper';

import UserInstrument from './UserInstrument';
import FriendInstrument from './FriendInstrument';
import Piano from './Piano';

const style1 = {
  height: 200,
  width: 200,
  margin: 20,
  bottom: 0,
  textAlign: 'center',
  display: 'block',
};

class JamRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomLink: "ech",
      showpeer1: true,
      showpeer2: false,
      showpeer3: false,
      showpeer4: false,
    };

    setTimeout(() => {
      this.setState({
        showpeer2: true
      });
    }, 1200);
    setTimeout(() => {
      this.setState({
        showpeer3: true
      });
    }, 2400);
    setTimeout(() => {
      this.setState({
        showpeer4: true
      });
    }, 3600);
  }

  // <div id="friendMesh">
  //   <FriendInstrument />
  //   <FriendInstrument /><br />
  //   <FriendInstrument />
  //   <FriendInstrument />
  // </div>

// <UserInstrument inst={this.props.inst} />

// <h1>Welcome to the JamRoom!</h1>
//         <div className="peer-bar">
//           <div id="peer-bar1">Peer1</div>
//           <div id="peer-bar2">Peer2</div>
//           <div id="peer-bar3">Peer3</div>
//           <div id="peer-bar4">Peer4</div>
//         </div>


  render() {
    return (
      <div id="jamroom">
        <AppBar
          title="Jam App"
          showMenuIconButton={false}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem primaryText="Login" />
              <MenuItem primaryText="Sign up" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
          }
        />
        <div id="display-inst-name"><h1>You are playing the {this.props.inst}</h1></div>
        <div className="peer-bar">
          <div id="peer-bar1"><div id="peer-name">You</div></div>
          { this.state.showpeer2 ? <div id="peer-bar2"><div id="peer-name">Friend1</div></div> : null }
          { this.state.showpeer3 ? <div id="peer-bar3"><div id="peer-name">Friend2</div></div> : null }
          { this.state.showpeer4 ? <div id="peer-bar4"><div id="peer-name">Friend3</div></div> : null }
        </div>
        <div id="user-instrument">
          {this.props.inst === 'drums' ? <img
            role="presentation"
            src="../../../style/drums.png"
          /> : null}
          {this.props.inst === 'piano' ? <Piano /> : null }
        </div>
      </div>
    );
  }
}


export default JamRoom;
