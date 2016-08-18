import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionDone from 'material-ui/svg-icons/action/done';

import Piano from './Piano';
import Drums from './Drums';

class JamRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLinkView: false,
      copied: false,
    };
    this.toggleLinkView = this.toggleLinkView.bind(this);
  }

  toggleLinkView() {
    if (this.state.showLinkView) {
      this.setState({ showLinkView: false });
    } else {
      this.setState({ showLinkView: true });
    }
  }
  // TO DO: refactor "peerbars" and card into their own components
  render() {
    return (
      <div id="jamroom">
        <div id="display-inst-name"><h1>You are playing the {this.props.instrument}</h1></div>
        <div className="peer-bar">
          <div id="peer-bar1"><div id="peer-name">You : {this.props.instrument}</div></div>
          {
            !this.props.peers[0]
            ? <div onClick={this.toggleLinkView} id="peer-bar1" className="clickable"><div id="peer-name">+</div></div>
            : <div id="peer-bar1"><div id="peer-name">Friend: {this.props.peers[0].instrument}</div></div>
          }
          {
            !this.props.peers[1]
            ? <div onClick={this.toggleLinkView} id="peer-bar1" className="clickable"><div id="peer-name">+</div></div>
            : <div id="peer-bar1"><div id="peer-name">Friend: {this.props.peers[0].instrument}</div></div>
          }
          {
            !this.props.peers[2]
            ? <div onClick={this.toggleLinkView} id="peer-bar1" className="clickable"><div id="peer-name">+</div></div>
            : <div id="peer-bar1"><div id="peer-name">Friend: {this.props.peers[0].instrument}</div></div>
          }
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
