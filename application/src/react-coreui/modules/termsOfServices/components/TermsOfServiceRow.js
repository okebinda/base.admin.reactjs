import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Translation} from 'react-i18next';
import {Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Spinner} from 'reactstrap';

import StatusBadge from '../../../elements/components/StatusBadge';
import {pathTo} from '../../../Routes';
import Logger from '../../../../lib/Logger';
import Format from '../../../../lib/Format';

class TermsOfServiceRow extends Component {

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
    Logger.log('debug', `TermsOfServiceRow.delete(${id})`);
    this.setState({isDeleting: true});
    this.props.delete(id);
  }

  render() {
    const termsOfService = this.props.termsOfService;
    const {isDeleting} = this.state;

    // if element has been deleted
    if (!termsOfService) {
      return null;
    }

    // otherwise normal view
    return (
      <Translation>
        {
          (t) => 
            <React.Fragment>

              <tr key={termsOfService.id.toString()}>
                <th scope="row">{termsOfService.id}</th>
                <td>{termsOfService.text.substring(0, 31)}</td>
                <td>{termsOfService.version}</td>
                <td>{termsOfService.publish_date}</td>
                <td><StatusBadge status={termsOfService.status} /></td>
                <td>{Format.date(termsOfService.created_at)}</td>
                <td>
                  <ButtonGroup>
                    <Link to={pathTo('TermsOfServiceEditScreen', {id: termsOfService.id})}><Button color="primary" size="sm">{t('action_edit')}</Button></Link>
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
                  <Button color="danger" onClick={() => { this.toggle(); this.delete(termsOfService.id); }}>{t('delete_confirm_modal_button_delete')}</Button>
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
    Logger.log('silly', `TermsOfServiceRow.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `TermsOfServiceRow.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `TermsOfServiceRow.componentWillUnmount()`);
  }
}

export default TermsOfServiceRow;

Logger.log('silly', `TermsOfServiceRow loaded.`);
