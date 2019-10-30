import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Translation} from 'react-i18next';
import {Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Spinner} from 'reactstrap';

import BooleanBadge from '../../../elements/components/BooleanBadge';
import {pathTo} from '../../../Routes';
import Logger from '../../../../lib/Logger';
import Format from '../../../../lib/Format';

class RoleRow extends Component {

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
    Logger.log('debug', `RoleRow.delete(${id})`);
    this.setState({isDeleting: true});
    this.props.delete(id);
  }

  render() {
    const role = this.props.role;
    const {isDeleting} = this.state;

    // if element has been deleted
    if (!role) {
      return null;
    }

    // otherwise normal view
    return (
      <Translation>
        {
          (t) => 
            <React.Fragment>

              <tr key={role.id.toString()}>
                <th scope="row">{role.id}</th>
                <td>{role.name}</td>
                <td><BooleanBadge value={role.is_admin_role} /></td>
                <td>{role.priority}</td>
                <td><BooleanBadge value={role.login_lockout_policy} /></td>
                <td><BooleanBadge value={role.password_policy} /></td>
                <td>{Format.date(role.created_at)}</td>
                <td>
                  <ButtonGroup>
                    <Link to={pathTo('RoleEditScreen', {id: role.id})}><Button color="primary" size="sm">{t('action_edit')}</Button></Link>
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
                  <Button color="danger" onClick={() => { this.toggle(); this.delete(role.id); }}>{t('delete_confirm_modal_button_delete')}</Button>
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
    Logger.log('silly', `RoleRow.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `RoleRow.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `RoleRow.componentWillUnmount()`);
  }
}

export default RoleRow;

Logger.log('silly', `RoleRow loaded.`);
