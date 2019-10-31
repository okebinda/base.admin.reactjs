import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import i18next from 'i18next';
import {Translation} from 'react-i18next';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Spinner
} from 'reactstrap';

import Logger from '../../../lib/Logger';
import StatusInput from './StatusInput';
import {pathTo} from '../../Routes';
import Format from '../../../lib/Format';
import Config from '../../../Config';

class FormMetadata extends Component {

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
    Logger.log('debug', `FormMetadata.delete(${id})`);
    this.setState({isDeleting: true});
    this.props.delete(id, (success) => {
      if (success) {
        this.setState({redirectTo: pathTo(this.props.onDeleteRedirectTo)});
        this.props.sendMessage('success', i18next.t('feedback_form_success_title'), i18next.t('feedback_delete_success_body'));
      } else {
        this.props.sendMessage('success', i18next.t('feedback_form_error_title'), i18next.t('feedback_delete_error_body'));
      }
    });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    return (
      <Translation>
        {
          (t) => 
            <React.Fragment>

              <Card>

                <CardHeader>
                  <strong><i className="icon-info pr-1"></i> {t('form_metadata_header')} </strong>
                </CardHeader>

                <CardBody>

                  {this.props.created_at
                    ? <p>Created: <small>{Format.date(this.props.created_at, Config.get('DEFAULT_DATETIME_FORMAT'))}</small></p>
                    : ''}
                  {this.props.updated_at && this.props.updated_at !== this.props.created_at
                    ? <p>Updated: <small>{Format.date(this.props.updated_at, Config.get('DEFAULT_DATETIME_FORMAT'))}</small></p>
                    : ''}

                  <StatusInput
                    field="status"
                    value={this.props.status}
                    feedback={this.props.status_InputFeedback}
                    onInputChange={this.props.onInputChange.bind(this)}
                  />

                  <Row>

                    <Col>
                      {this.props.id
                        ? <Button
                            color="danger"
                            block={true}
                            disabled={this.state.isDeleting}
                            onClick={this.toggle}
                          >
                            {this.state.isDeleting
                              ? <Spinner color="light" size="sm" />
                              : <i className="fa fa-trash-o"></i>}{' '}
                            {t('action_delete')}
                          </Button>
                        : null
                      }
                    </Col>
                      
                    <Col>
                      <Button
                        color="primary"
                        block={true}
                        disabled={this.props.isLoading}
                      >
                        {this.props.isSubmitting 
                          ? <span><Spinner color="light" size="sm" /> </span>
                          : <i className="fa fa-dot-circle-o"></i> }{' '}
                        {t('form_button_submit')}
                      </Button>
                    </Col>

                  </Row>

                </CardBody>
              </Card>

              <Modal isOpen={this.state.deleteModal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>{t('delete_confirm_modal_header')}</ModalHeader>
                <ModalBody>{t('delete_confirm_modal_body')}</ModalBody>
                <ModalFooter>
                  <Button
                    color="danger" 
                    onClick={() => { this.toggle(); this.delete(this.props.id); }}
                  >
                    {t('delete_confirm_modal_button_delete')}
                  </Button>
                  <Button 
                    color="secondary"
                    onClick={this.toggle}
                  >
                    {t('delete_confirm_modal_button_cancel')}
                  </Button>
                </ModalFooter>
              </Modal>

            </React.Fragment>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `FormMetadata.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `FormMetadata.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `FormMetadata.componentWillUnmount()`);
  }
}

export default FormMetadata;

Logger.log('silly', `FormMetadata loaded.`);
