import React, {Component} from 'react';
import {Translation} from 'react-i18next';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import Logger from '../../../../lib/Logger';

class DeleteModal extends Component {
  render() {
    return (
      <Translation>
        {
          (t) => 
            <Modal isOpen={this.props.show} toggle={this.props.toggle}>
              <ModalHeader toggle={this.props.toggle}>{t('delete_confirm_modal_header')}</ModalHeader>
              <ModalBody>{t('delete_confirm_modal_body')}</ModalBody>
              <ModalFooter>
                <Button
                  color="danger" 
                  onClick={() => { this.props.toggle(); this.props.delete(this.props.id); }}
                >
                  <i className="fa fa-trash-o"></i>{' '}
                  {t('delete_confirm_modal_button_delete')}
                </Button>
                <Button 
                  color="secondary"
                  onClick={this.props.toggle}
                >
                  <i className="fa fa-remove"></i>{' '}
                  {t('delete_confirm_modal_button_cancel')}
                </Button>
              </ModalFooter>
            </Modal>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `DeleteModal.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `DeleteModal.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `DeleteModal.componentWillUnmount()`);
  }
}

export default DeleteModal;

Logger.log('silly', `DeleteModal loaded.`);
