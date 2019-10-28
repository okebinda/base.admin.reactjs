import React, {Component, createRef} from 'react';
import {Translation} from 'react-i18next';
import {
  Alert,
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

import Logger from '../../../../lib/Logger';

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
        Object.assign({}, ...Object.keys(this.props.errors).map(k => ({[k + '_InputFeedback']: this.props.errors[k].map(x => x + ' ')}))),
        () => {
          this.scrollToRef(this.formTop);
        }
      );
    });
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

              <div className="flash-message row justify-content-sm-center">
                <div className="col-sm-auto">
                  {true === this.props.success
                    ? <Alert color="success">{t('feedback_form_success')}</Alert>
                    : null
                  }
                  {false === this.props.success
                    ? <Alert color="danger">{t('feedback_form_error')}</Alert>
                    : null
                  }
                </div>
              </div>

              <Form onSubmit={this.handleSubmit}>

                <Card>
                  <CardHeader>
                    <strong><i className="icon-user pr-1"></i> {t('user_account_header_account')} </strong>
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
