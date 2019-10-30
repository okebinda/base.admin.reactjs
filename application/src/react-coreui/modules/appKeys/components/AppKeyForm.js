import React, {Component, createRef} from 'react';
import {Redirect} from 'react-router-dom'
import i18next from 'i18next';
import {Translation} from 'react-i18next';
import {
  Button,
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
  Spinner,
} from 'reactstrap';

import StatusInput from '../../../elements/components/StatusInput';
import {pathTo} from '../../../Routes';
import Logger from '../../../../lib/Logger';

class AppKeyForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.formTop = createRef();
  }

  initialState = () => {
    Logger.log('debug', `AppKeyForm.initialState()`);

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
    Logger.log('debug', `AppKeyForm.formDefaults()`);

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
    Logger.log('debug', `AppKeyForm.submitData()`);

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
        this.setState(Object.assign({}, ...Object.keys(this.props.errors).map(k => ({[k + '_InputFeedback']: this.props.errors[k]}))));
        this.scrollToRef(this.formTop);
        if (this.props.success) {
          this.props.sendMessage('success', i18next.t('feedback_form_success_title'), i18next.t('feedback_form_success_body'));
        } else {
          this.props.sendMessage('danger', i18next.t('feedback_form_error_title'), i18next.t('feedback_form_error_body'));
        }
      });

    // create form
    } else {
      this.props.create(payload, () => {
        this.setState(Object.assign({}, ...Object.keys(this.props.errors).map(k => ({[k + '_InputFeedback']: this.props.errors[k]}))));
        if (this.props.success) {
          this.setState({redirectTo: pathTo('AppKeyEditScreen', {id: this.props.created_id})});
          this.props.sendMessage('success', i18next.t('feedback_form_success_title'), i18next.t('feedback_form_success_body'));
        } else {
          this.scrollToRef(this.formTop);
          this.props.sendMessage('danger', i18next.t('feedback_form_error_title'), i18next.t('feedback_form_error_body'));
        }
      });
    }
  }

  // form submit handler
  handleSubmit = async (evt) => {
    Logger.log('debug', `AppKeyForm.handleSubmit(###)`);
    evt.preventDefault();
    if (!this.props.isLoading) {
      await this.submitData();
    }
  }

  render() {
    const {isLoading, isSubmitting} = this.props;

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
                        <strong><i className="icon-key pr-1"></i> {t('app_key_header_app_key')} </strong>
                        {this.props.isLoading ? <span className="event-feedback"><Spinner color="dark" size="sm" /> {t('feedback_loading')}</span> : ''}
                        <div className="float-right">{this.props.id ? t('table_record_id', {'id': this.props.id}) : ''}</div>
                      </CardHeader>
                      <CardBody>
                    
                        <FormGroup>
                          <Label for="textInput">{t('app_key_application')}</Label>
                          <Input 
                            type="text"
                            value={this.state.application}
                            invalid={this.state.application_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('application', e.target.value)}
                            id="applicationInput"
                            autoFocus
                          />
                          <FormFeedback>{this.state.application_InputFeedback}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                          <Label for="keyInput">{t('app_key_key')}</Label>
                          <Input 
                            type="text"
                            value={this.state.key}
                            invalid={this.state.key_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('key', e.target.value)}
                            id="keyInput"
                          />
                          <FormFeedback>{this.state.key_InputFeedback}</FormFeedback>
                        </FormGroup>

                      </CardBody>
                    </Card>

                  </Col>

                  <Col md="3">

                    <Card>
                      <CardBody>

                        <StatusInput
                          field="status"
                          value={this.state.status}
                          feedback={this.state.status_InputFeedback}
                          onInputChange={this.onInputChange.bind(this)}
                        />

                        <Button
                          color="primary"
                          disabled={isLoading}
                        >
                          {isSubmitting ? <span><Spinner color="light" size="sm" /> </span> : null }
                          {isSubmitting ? t('feedback_form_submit_in_process') : t('form_button_submit') }
                        </Button>

                      </CardBody>
                    </Card>

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
    Logger.log('silly', `AppKeyForm.componentDidMount()`);

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
    Logger.log('silly', `AppKeyForm.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `AppKeyForm.componentWillUnmount()`);
    this.props.destroyForm(this.props.created_id ? {success: this.props.success} : null);
  }
}

export default AppKeyForm;

Logger.log('silly', `AppKeyForm loaded.`);
