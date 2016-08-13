import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import shortid from 'shortid';

import { socket } from '../peer';

class TestPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const hash = shortid.generate();
    socket.emit('create room', hash);
    this.context.router.push(`room/${hash}`);
  }

  render() {
    return (
      <div>
        <RaisedButton label="Create Room" onClick={this.handleClick} />
      </div>
    );
  }
}

TestPicker.contextTypes = {
  router: React.PropTypes.object
};

export default TestPicker;
