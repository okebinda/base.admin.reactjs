import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Translation} from 'react-i18next';
import {Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Spinner} from 'reactstrap';

import StatusBadge from '../../../elements/components/StatusBadge';
import {pathTo} from '../../../Routes';
import Logger from '../../../../lib/Logger';
import Format from '../../../../lib/Format';

class AdministratorRow extends Component {

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
    Logger.log('debug', `AdministratorRow.delete(${id})`);
    this.setState({isDeleting: true});
    this.props.delete(id);
  }

  render() {
    const administrator = this.props.administrator;
    const {isDeleting} = this.state;

    // if element has been deleted
    if (!administrator) {
      return null;
    }

    // otherwise normal view
    return (
      <Translation>
        {
          (t) => 
            <React.Fragment>

              <tr key={administrator.id.toString()}>
                <th scope="row">{administrator.id}</th>
                <td>{administrator.username}</td>
                <td>{administrator.email}</td>
                <td>{administrator.first_name}</td>
                <td>{administrator.last_name}</td>
                <td>{administrator.roles.map((role, index) => this.props.roles[role] ? this.props.roles[role].name + ' ' : null)}</td>
                <td>{Format.date(administrator.joined_at)}</td>
                <td><StatusBadge status={administrator.status} /></td>
                <td>{Format.date(administrator.created_at)}</td>
                <td>
                  <ButtonGroup>
                    <Link to={pathTo('AdministratorEditScreen', {id: administrator.id})}><Button color="primary" size="sm">{t('action_edit')}</Button></Link>
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
                  <Button color="danger" onClick={() => { this.toggle(); this.delete(administrator.id); }}>{t('delete_confirm_modal_button_delete')}</Button>
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
    Logger.log('silly', `AdministratorRow.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `AdministratorRow.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `AdministratorRow.componentWillUnmount()`);
  }
}

export default AdministratorRow;

Logger.log('silly', `AdministratorRow loaded.`);
