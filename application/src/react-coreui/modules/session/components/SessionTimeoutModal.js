import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Translation} from 'react-i18next';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import Logger from '../../../../lib/Logger';

const SignOutButton = withRouter(({history, text, destroySession, toggle}) => (
  <Button 
    color="danger"
    onClick={() => {
    destroySession(() => history.push('/'));
    toggle();
  }}>{text}</Button>
));

const ExtendSessionButton = ({text, createSession, authToken, toggle}) => (
  <Button 
    color="primary"
    onClick={() => {
      createSession({username: authToken});
      toggle();
     }}>{text}</Button>
);

class SessionTimeoutModal extends Component {

  static defaultProps = {
    storageType: 'session'
  }

  defaultTimer = 60; // seconds

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      timer: this.defaultTimer
    };
    this.toggle = this.toggle.bind(this);
    this.timeout = null;
    this.countdownTimer = null;
  }

  toggle() {
    Logger.log('debug', `SessionTimeoutModal.toggle()`);
    clearInterval(this.countdownTimer);
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  modalTimer() {
    Logger.log('debug', `SessionTimeoutModal.modalTimer()`);
    if (this.props.authExpires) {
      const now =  Math.round(new Date().getTime()/1000);
      const showModalMs = (this.props.authExpires - now - 120) * 1000;
      if (showModalMs > 0) {

        this.timeout = setTimeout(() => {
          this.toggle();

          let timeleft = this.defaultTimer;
          this.countdownTimer = setInterval(() => {
            timeleft -= 1;
            this.setState({timer: timeleft});
            if(timeleft <= 0){
              this.props.destroySession(() => this.props.history.push('/'));
              this.toggle();
            }
          }, 1000);

        }, showModalMs);

        Logger.log('debug', `SessionTimeoutModal.modalTimer, showModalMs: ${showModalMs}`);
        return;
      }
      this.timeout = null;
    }
  }

  render() {
    return (
      <Translation>
        {
          (t) => 
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>{t('session_timeout_modal_title')}</ModalHeader>
              <ModalBody>
              {t('session_timeout_modal_body', {countdown: this.state.timer})}
              </ModalBody>
              <ModalFooter>
                <SignOutButton
                  text={t('session_timeout_modal_signout')}
                  destroySession={this.props.destroySession}
                  toggle={this.toggle}
                />
                <ExtendSessionButton
                  text={t('session_timeout_modal_extend')}
                  createSession={this.props.createSession}
                  authToken={this.props.authToken}
                  toggle={this.toggle}
                />
              </ModalFooter>
            </Modal>
        }
      </Translation>
    );
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `SessionTimeoutModal.componentDidMount()`);
    this.modalTimer();
  }

  componentDidUpdate(prevProps) {
    Logger.log('silly', `SessionTimeoutModal.componentDidUpdate()`);
    if (this.props.authExpires !== prevProps.authExpires) {
      this.modalTimer();
    }
  }

  componentWillUnmount() {
    Logger.log('silly', `SessionTimeoutModal.componentWillUnmount()`);
    clearInterval(this.timeout);
    clearInterval(this.countdownTimer);
  }
}

export default withRouter(SessionTimeoutModal);

Logger.log('silly', `SessionTimeoutModal loaded.`);
