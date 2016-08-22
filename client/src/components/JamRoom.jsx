import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionDone from 'material-ui/svg-icons/action/done';

import PeerBar from './PeerBar';
import Piano from './Piano';
import Drums from './Drums';

class JamRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInviteView: false,
      copied: false,
    };
    this.toggleInviteView = this.toggleInviteView.bind(this);
  }

  toggleInviteView() {
    if (this.state.showInviteView) {
      this.setState({ showInviteView: false });
    } else {
      this.setState({ showInviteView: true });
    }
  }
  // TO DO: refactor "peerbars" and card into their own components
  render() {
    return (
      <div id="jamroom">
        <div id="display-inst-name"><h1>You are playing the {this.props.instrument}</h1></div>
        <div>
          {this.props.instrument === 'drums' ? <Drums /> : null}
          {this.props.instrument === 'piano' ? <Piano /> : null}
        </div>
        <PeerBar ownInstrument={this.props.instrument} peers={this.props.peers} toggleInviteView={this.toggleInviteView} />
        {
          this.state.showInviteView ?
            <Card
              style={{
                position: 'absolute',
                width: '50%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <CardHeader
                title="Share!"
                subtitle="Copy this link and send it to a friend so they can play with you!"
                actAsExpander={false}
                showExpandableButton={false}
              />
              <FloatingActionButton
                mini
                onClick={this.toggleInviteView}
                style={{ top: '10%', right: '5%', position: 'absolute', transform: 'translate(-10%, -5%)' }}
              >
                <ActionDone />
              </FloatingActionButton>
              <CardText expandable={false} style={{ float: 'left' }} >
                {window.location.href}
              </CardText>

              <CopyToClipboard
                text={window.location.href}
                onCopy={() => this.setState({ copied: true })}
                style={{ float: 'left' }}
              >
                <CardActions >
                  <FlatButton label="Copy" />
                </CardActions>
              </CopyToClipboard>
            </Card>
          : null
        }
      </div>
    );
  }
}

JamRoom.propTypes = {
  instrument: React.PropTypes.string,
  peers: React.PropTypes.array
};

export default JamRoom;
