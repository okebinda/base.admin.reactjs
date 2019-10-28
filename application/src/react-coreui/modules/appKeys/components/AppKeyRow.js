import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Translation} from 'react-i18next';
import {Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Spinner} from 'reactstrap';

import StatusBadge from '../../../elements/components/StatusBadge';
import {pathTo} from '../../../Routes';
import Logger from '../../../../lib/Logger';
import Format from '../../../../lib/Format';

class AppKeyRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDeleting: false,
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  delete = (id) => {
    Logger.log('debug', `AppKeyRow.delete(${id})`);
    this.setState({isDeleting: true});
    this.props.delete(id);
  }

  render() {
    const app_key = this.props.app_key;
    const {isDeleting} = this.state;

    // if element has been deleted
    if (!app_key) {
      return null;
    }

    // otherwise normal view
    return (
      <Translation>
        {
          (t) => 
            <React.Fragment>

              <tr key={app_key.id.toString()}>
                <th scope="row">{app_key.id}</th>
                <td>{app_key.application}</td>
                <td>{app_key.key}</td>
                <td><StatusBadge status={app_key.status} /></td>
                <td>{Format.date(app_key.created_at)}</td>
                <td>
                  <ButtonGroup>
                    <Link to={pathTo('AppKeyEditScreen', {id: app_key.id})}><Button color="primary" size="sm">{t('action_edit')}</Button></Link>
                    <Button disabled={isDeleting} onClick={this.toggle} color="danger" size="sm">
                      {isDeleting ? <Spinner color="light" size="sm" /> : t('action_delete')}
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>

              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>{t('delete_confirm_modal_header')}</ModalHeader>
                <ModalBody>{t('delete_confirm_modal_body')}</ModalBody>
                <ModalFooter>
                  <Button color="danger" onClick={() => { this.toggle(); this.delete(app_key.id); }}>{t('delete_confirm_modal_button_delete')}</Button>
                  <Button color="secondary" onClick={this.toggle}>{t('delete_confirm_modal_button_cancel')}</Button>
                </ModalFooter>
              </Modal>

            </React.Fragment>
            
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `AppKeyRow.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `AppKeyRow.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `AppKeyRow.componentWillUnmount()`);
  }
}

export default AppKeyRow;

Logger.log('silly', `AppKeyRow loaded.`);
