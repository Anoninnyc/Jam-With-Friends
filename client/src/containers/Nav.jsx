import React, { Component } from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
class Nav extends Component {

  render() {
    return (
      <div id='navBar'>
        <FlatButton label="Log In" onClick={() => { this.props.change('login')}} />
        <FlatButton label="Sign In" onClick={() => { this.props.change('signup')}} />
      </div>
    );
  }
}
Nav.childContextTypes = {
          muiTheme: React.PropTypes.object.isRequired,
        };
export default Nav;
