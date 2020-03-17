import React, {Component, createRef} from 'react';
import i18next from 'i18next';
import {Translation} from 'react-i18next';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Spinner,
} from 'reactstrap';

import Logger from '../../../../../lib/Logger';

class UserAccountForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.initializeState();
    this.formTop = createRef();
  }

  initializeState = () => {
    Logger.log('debug', `UserAccountForm.initializeState()`);

    let state = {};
    for (const val of Object.keys(this.props.data)) {
      state[val] = '';
    }
    return {
      ...state,
      ...this.formDefaults()
    }
  }

  formDefaults = () => {
    Logger.log('debug', `UserAccountForm.formDefaults()`);

    let defs = {};

    // reset error messages
    for (const val of Object.keys(this.props.data)) {
      defs[val + '_InputFeedback'] = '';
    }
    return defs;
  }

  // scroll handler
  scrollToRef = (ref) => {
    if (typeof window !== 'undefined') {
      setTimeout(() => window.scrollTo(0, ref.current.offsetTop), 100);
    }
  }

  // generic input change handler
  onInputChange = (input, value) => {
    this.setState({[input]: value, [input + '_InputFeedback']: ''})
  }

  // submit data handler
  submitData = async () => {
    Logger.log('debug', `UserAccountForm.submitData()`);

    // reset form feedback and disable submit button
    this.setState(this.formDefaults());

    // API POST/PUT payload
    let payload = {};
    for (const input of Object.keys(this.props.data)) {
      if (this.state[input]) {
        payload[input] = this.state[input];
      }
    }

    // update
    this.props.update(payload, () => {
      this.setState(
        this.setState(this.parseFeedback(this.props.errors)),
        () => {}
      );
      if (this.props.success) {
        this.props.sendMessage('success', i18next.t('feedback_form_success_title'), i18next.t('feedback_form_success_body'));
      } else {
        this.props.sendMessage('danger', i18next.t('feedback_form_error_title'), i18next.t('feedback_form_error_body'));
      }
    });
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
    Logger.log('debug', `UserAccountForm.handleSubmit(###)`);
    evt.preventDefault();
    if (!this.props.isLoading) {
      await this.submitData();
    }
  }

  render() {

    const {isLoading} = this.props;

    return (
      <Translation>
        {
          (t) => 
            <div className="user-account-form" ref={this.formTop}>

              <Form onSubmit={this.handleSubmit}>

                <Card>
                  <CardHeader>
                    <strong><i className="icon-user pr-1"></i> {t('user_account_header_account')} </strong>
                    {this.props.isLoading ? <span className="event-feedback"><Spinner color="dark" size="sm" /> {t('feedback_loading')}</span> : ''}
                  </CardHeader>
                  <CardBody>

                    <FormGroup>
                      <Label for="usernameInput">{t('user_account_form_username')}</Label>
                      <Input 
                        type="text"
                        value={this.state.username}
                        invalid={this.state.username_InputFeedback ? true : false}
                        onChange={(e) => this.onInputChange('username', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                        id="usernameInput"
                        autoFocus
                        disabled={isLoading}
                      />
                      <FormFeedback>{this.state.username_InputFeedback}</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                      <Label for="emailInput">{t('user_account_form_email')}</Label>
                      <Input 
                        type="email"
                        value={this.state.email}
                        invalid={this.state.email_InputFeedback ? true : false}
                        onChange={(e) => this.onInputChange('email', e.target.value.toLowerCase().trim())}
                        id="emailInput"
                        disabled={isLoading}
                      />
                      <FormFeedback>{this.state.email_InputFeedback}</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                      <Label for="first_nameInput">{t('user_account_form_first_name')}</Label>
                      <Input 
                        type="text"
                        value={this.state.first_name}
                        invalid={this.state.first_name_InputFeedback ? true : false}
                        onChange={(e) => this.onInputChange('first_name', e.target.value)}
                        id="first_nameInput"
                        disabled={isLoading}
                      />
                      <FormFeedback>{this.state.first_name_InputFeedback}</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                      <Label for="last_nameInput">{t('user_account_form_last_name')}</Label>
                      <Input 
                        type="text"
                        value={this.state.last_name}
                        invalid={this.state.last_name_InputFeedback ? true : false}
                        onChange={(e) => this.onInputChange('last_name', e.target.value)}
                        id="last_nameInput"
                        disabled={isLoading}
                      />
                      <FormFeedback>{this.state.last_name_InputFeedback}</FormFeedback>
                    </FormGroup>

                  </CardBody>

                  <CardFooter>
                    <Button
                      color="primary"
                      size="sm"
                      disabled={isLoading}
                    >
                      {isLoading ? <span><Spinner color="light" size="sm" /> </span> : null }
                      {isLoading ? t('feedback_form_submit_in_process') : t('form_button_submit') }
                    </Button>
                  </CardFooter>

                </Card>
            </Form>
            </div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `UserAccountForm.componentDidMount()`);

    // initialize data from props (via the store)
    this.setState(this.props.data);

    // initialize data from API
    this.props.load(() => {
      this.setState(this.props.data);
    });
  }

  componentDidUpdate() {
    Logger.log('silly', `UserAccountForm.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `UserAccountForm.componentWillUnmount()`);
    this.props.destroyForm();
  }
}

export default UserAccountForm;

Logger.log('silly', `UserAccountForm loaded.`);
