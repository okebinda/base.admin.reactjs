import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import i18next from 'i18next';
import {Translation} from 'react-i18next';
import {
  Button,
  ButtonGroup,
  Spinner
} from 'reactstrap';

import DeleteModal from './DeleteModal';
import Logger from '../../../../lib/Logger';
import {pathTo} from '../../Routes';

class ListActions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDeleting: false,
      deleteModal: false,
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      deleteModal: !prevState.deleteModal
    }));
  }

  delete = (id) => {
    Logger.log('debug', `ListActions.delete(${id})`);
    this.setState({isDeleting: true});
    this.props.delete(id, (success) => {
      if (success) {
        this.props.sendMessage('success', i18next.t('feedback_form_success_title'), i18next.t('feedback_delete_success_body'));
      } else {
        this.setState({isDeleting: false});
        this.props.sendMessage('danger', i18next.t('feedback_form_error_title'), i18next.t('feedback_delete_error_body'));
      }
    });
  }

  render() {
    return (
      <Translation>
        {
          (t) => 
            <React.Fragment>

              <ButtonGroup>
                <Link to={pathTo(this.props.editScreen, {id: this.props.id})}>
                  <Button color="primary" size="sm">
                    <i className="fa fa-pencil-square-o"></i>{' '}
                    {t('action_edit')}
                  </Button>
                </Link>
                <Button disabled={this.state.isDeleting} onClick={this.toggle} color="danger" size="sm">
                  {this.state.isDeleting
                    ? <Spinner color="light" size="sm" /> 
                    : <i className="fa fa-trash-o"></i>}{' '}
                  {t('action_delete')}
                </Button>
              </ButtonGroup>

              <DeleteModal
                id={this.props.id}
                show={this.state.deleteModal}
                toggle={this.toggle.bind(this)}
                delete={this.delete.bind(this)}
              />

            </React.Fragment>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `ListActions.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `ListActions.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `ListActions.componentWillUnmount()`);
  }
}

export default ListActions;

Logger.log('silly', `ListActions loaded.`);
