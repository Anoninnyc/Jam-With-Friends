import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionDone from 'material-ui/svg-icons/action/done';

import Piano from './Piano';
import Drums from './Drums';

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
      showLinkView: false,
      copied: false,
      url: window.location.href,
    };

    if (this.props.peers) {
      console.log(this.props.peers.length);
    }

    console.log(window.location.href);

    this.toggleLinkView = this.toggleLinkView.bind(this);
  }

  toggleLinkView() {
    console.log('hit?');
    if (this.state.showLinkView) {
      this.setState({ showLinkView: false });
    } else {
      this.setState({ showLinkView: true });
    }
  }
  // a comment
  render() {
    return (
      <div id="jamroom">
        <div id="display-inst-name"><h1>You are playing the {this.props.instrument}</h1></div>
        <div className="peer-bar">
          <div id="peer-bar1"><div id="peer-name">You : {this.props.instrument}</div></div>
          <div onClick={this.toggleLinkView} id="peer-bar1"><div id="peer-name"> {this.props.peers[0] ? "peer1" : "+" } </div></div>
          <div onClick={this.toggleLinkView} id="peer-bar1"><div id="peer-name"> {this.props.peers[1] ? "peer2" : "+" } </div></div>
          <div onClick={this.toggleLinkView} id="peer-bar1"><div id="peer-name"> {this.props.peers[2] ? "peer3" : "+" } </div></div>
        </div>
        <div id="user-instrument">
          {this.props.instrument === 'drums' ? <Drums /> : null}
          {this.props.instrument === 'piano' ? <Piano /> : null}
        </div>
        {
          this.state.showLinkView ?
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
                onClick={this.toggleLinkView}
                style={{ top: '10%', right: '5%', position: 'absolute', transform: 'translate(-10%, -5%)' }}
              >
                <ActionDone />
              </FloatingActionButton>
              <CardText expandable={false} style={{ float: 'left' }} >
                {window.location.href}
              </CardText>

              <CopyToClipboard
                text={this.state.url}
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
