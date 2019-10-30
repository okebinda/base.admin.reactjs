import React, {Component} from 'react';
import {Toast, ToastBody, ToastHeader} from 'reactstrap';

import Logger from '../../../lib/Logger';

const Messages = (props) => {
  return(
    <div aria-live="polite" aria-atomic="true" className="messages-container">
      <div className="messages-subcontainer">
        {props.messages.mapEntries(([i, m]) =>
          [<Message
            key={i}
            index={i}
            level={m.level}
            title={m.title}
            body={m.body}
            expires={m.expires}
            remove={props.remove.bind(this)}
          />]
        ).toArray()}
      </div>
    </div>
  );
};

class Message extends Component {

  constructor(props) {
    super(props);
    this.timeout = null;
  }

  toggle = (key) => this.props.remove(key);

  timer = (key, expires) => {
    if (expires) {
      this.timeout = setTimeout(() => {
        this.toggle(key);
      }, expires * 1000);
    }
  }

  render() {
    return(
      <Toast>
        <ToastHeader toggle={() => this.toggle(this.props.index)} icon={this.props.level}>
          {this.props.title}
        </ToastHeader>
        <ToastBody>
          {this.props.body}
        </ToastBody>
      </Toast>
    );
  }

  componentDidMount() {
    this.timer(this.props.index, this.props.expires);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }
}

export default Messages;

Logger.log('silly', `Messages loaded.`);
