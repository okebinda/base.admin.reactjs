import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Translation} from 'react-i18next';
import {Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Spinner} from 'reactstrap';

import BooleanBadge from '../../../elements/components/BooleanBadge';
import StatusBadge from '../../../elements/components/StatusBadge';
import {pathTo} from '../../../Routes';
import Logger from '../../../../lib/Logger';
import Format from '../../../../lib/Format';

class UserRow extends Component {

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
    Logger.log('debug', `UserRow.delete(${id})`);
    this.setState({isDeleting: true});
    this.props.delete(id);
  }

  render() {
    const user = this.props.user;
    const {isDeleting} = this.state;

    // if element has been deleted
    if (!user) {
      return null;
    }

    // otherwise normal view
    return (
      <Translation>
        {
          (t) => 
            <React.Fragment>

              <tr key={user.id.toString()}>
                <th scope="row">{user.id}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.roles.map((role, index) => this.props.roles[role] ? this.props.roles[role].name + ' ' : null)}</td>
                <td><BooleanBadge value={user.is_verified} /></td>
                <td>{Format.date(user.joined_at)}</td>
                <td><StatusBadge status={user.status} /></td>
                <td>{Format.date(user.created_at)}</td>
                <td>
                  <ButtonGroup>
                    <Link to={pathTo('UserEditScreen', {id: user.id})}><Button color="primary" size="sm">{t('action_edit')}</Button></Link>
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
                  <Button color="danger" onClick={() => { this.toggle(); this.delete(user.id); }}>{t('delete_confirm_modal_button_delete')}</Button>
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
    Logger.log('silly', `UserRow.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `UserRow.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `UserRow.componentWillUnmount()`);
  }
}

export default UserRow;

Logger.log('silly', `UserRow loaded.`);
