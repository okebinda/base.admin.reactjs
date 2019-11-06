import React, {Component, createRef} from 'react';
import {Redirect} from 'react-router-dom'
import i18next from 'i18next';
import {Translation} from 'react-i18next';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner
} from 'reactstrap';

import FormMetadata from '../../../elements/components/FormMetadata';
import {pathTo} from '../../../Routes';
import Logger from '../../../../lib/Logger';

class TermsOfServiceForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.formTop = createRef();
  }

  initialState = () => {
    Logger.log('debug', `TermsOfServiceForm.initialState()`);

    let state = {};
    for (const val of Object.keys(this.props.data)) {
      state[val] = '';
    }
    return {
      ...state,
      redirectTo: '',
      ...this.formDefaults()
    }
  }

  formDefaults = () => {
    Logger.log('debug', `TermsOfServiceForm.formDefaults()`);

    let defs = {};

    // reset error messages
    for (const val of Object.keys(this.props.data)) {
      defs[val + '_InputFeedback'] = '';
    }
    return defs;
  }

  // scroll handler
  scrollToRef = (ref) => {
    window.scrollTo(0, ref.current.offsetTop);
  }

  // generic input change handler
  onInputChange = (input, value) => {
    this.setState({[input]: value, [input + '_InputFeedback']: ''})
  }

  // submit data handler
  submitData = async () => {
    Logger.log('debug', `TermsOfServiceForm.submitData()`);

    // reset form feedback and disable submit button
    this.setState(this.formDefaults());

    // API POST/PUT payload
    let payload = {};
    for (const input of Object.keys(this.props.data)) {
      if (input in this.state) {
        payload[input] = this.state[input];
      }
    }

    // update form
    if (this.props.id) {
      this.props.update(this.props.id, payload, () => {
        this.setState(this.parseFeedback(this.props.errors));
        if (this.props.success) {
          this.props.sendMessage('success', i18next.t('feedback_form_success_title'), i18next.t('feedback_form_success_body'));
        } else {
          this.props.sendMessage('danger', i18next.t('feedback_form_error_title'), i18next.t('feedback_form_error_body'));
        }
      });

    // create form
    } else {
      this.props.create(payload, () => {
        this.setState(this.parseFeedback(this.props.errors));
        if (this.props.success) {
          this.setState({redirectTo: pathTo('TermsOfServiceEditScreen', {id: this.props.created_id})});
          this.props.sendMessage('success', i18next.t('feedback_form_success_title'), i18next.t('feedback_form_success_body'));
        } else {
          this.props.sendMessage('danger', i18next.t('feedback_form_error_title'), i18next.t('feedback_form_error_body'));
        }
      });
    }
  }

  parseFeedback = (errors, joinChar=' ') => {
    const out = {};
    for (const field in errors) {
      out[field + '_InputFeedback'] = errors[field].join(joinChar);
    }
    return out;
  }

  // form submit handler
  handleSubmit = async (evt) => {
    Logger.log('debug', `TermsOfServiceForm.handleSubmit(###)`);
    evt.preventDefault();
    if (!this.props.isLoading) {
      await this.submitData();
    }
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }

    return (
      <Translation>
        {
          (t) => 
            <div className="form-app-key" ref={this.formTop}>
              
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>

                <Row>

                  <Col md="9">

                    <Card>
                      <CardHeader>
                        <strong><i className="icon-doc pr-1"></i> {t('terms_of_service_header_terms_of_service')} </strong>
                        {this.props.isLoading ? <span className="event-feedback"><Spinner color="dark" size="sm" /> {t('feedback_loading')}</span> : ''}
                        <div className="float-right">{this.props.id ? t('table_record_id', {'id': this.props.id}) : ''}</div>
                      </CardHeader>
                      <CardBody>
                    
                        <FormGroup>
                          <Label for="textInput">{t('terms_of_service_text')}</Label>
                          <Input 
                            type="textarea"
                            value={this.state.text}
                            invalid={this.state.text_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('text', e.target.value)}
                            id="textInput"
                            autoFocus
                          />
                          <FormFeedback>{this.state.text_InputFeedback}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                          <Label for="versionInput">{t('terms_of_service_version')}</Label>
                          <Input 
                            type="text"
                            value={this.state.version}
                            invalid={this.state.version_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('version', e.target.value)}
                            id="versionInput"
                          />
                          <FormFeedback>{this.state.version_InputFeedback}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                          <Label for="publish_dateInput">{t('terms_of_service_publish_date')}</Label>
                          <Input 
                            type="text"
                            value={this.state.publish_date}
                            invalid={this.state.publish_date_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('publish_date', e.target.value)}
                            id="publish_dateInput"
                          />
                          <FormFeedback>{this.state.publish_date_InputFeedback}</FormFeedback>
                        </FormGroup>

                      </CardBody>
                    </Card>

                  </Col>

                  <Col md="3">

                    <FormMetadata
                      id={this.props.id}
                      status={this.state.status}
                      created_at={this.props.created_at}
                      updated_at={this.props.updated_at}
                      onInputChange={this.onInputChange.bind(this)}
                      status_InputFeedback={this.state.status_InputFeedback}
                      sendMessage={this.props.sendMessage.bind(this)}
                      delete={this.props.delete.bind(this)}
                      onDeleteRedirectTo={'TermsOfServicesScreen'}
                      isLoading={this.props.isLoading}
                      isSubmitting={this.props.isSubmitting}
                    />

                  </Col>

                </Row>

              </Form>
            </div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `TermsOfServiceForm.componentDidMount()`);

    // initialize data from props (via the store)
    this.setState(this.props.data);

    // initialize data from API
    if (this.props.id) {
      this.props.load(this.props.id, () => {
        this.setState(this.props.data);
      });
    }
  }

  componentDidUpdate() {
    Logger.log('silly', `TermsOfServiceForm.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `TermsOfServiceForm.componentWillUnmount()`);
    this.props.destroyForm(this.props.created_id ? {success: this.props.success} : null);
  }
}

export default TermsOfServiceForm;

Logger.log('silly', `TermsOfServiceForm loaded.`);
