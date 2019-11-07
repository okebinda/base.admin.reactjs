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
  Tooltip
} from 'reactstrap';

import Logger from '../../../../lib/Logger';

class UpdatePasswordForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.initializeState();
    this.formTop = createRef();
    this.togglePasswordTooltip = this.togglePasswordTooltip.bind(this);
  }

  initializeState = () => {
    Logger.log('debug', `UpdatePasswordForm.initializeState()`);

    let state = {};
    for (const val of Object.keys(this.props.data)) {
      state[val] = '';
    }
    return {
      ...state,
      ...this.formDefaults(),
      passwordTooltipOpen: false
    }
  }

  formDefaults = () => {
    Logger.log('debug', `UpdatePasswordForm.formDefaults()`);

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

  togglePasswordTooltip() {
    this.setState({
      passwordTooltipOpen: !this.state.passwordTooltipOpen
    });
  }

  // submit data handler
  submitData = async () => {
    Logger.log('debug', `UpdatePasswordForm.submitData()`);

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
    Logger.log('debug', `UpdatePasswordForm.handleSubmit(###)`);
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
            <div className="password-form" ref={this.formTop}>

              <Form onSubmit={this.handleSubmit}>

                <Card>
                  <CardHeader>
                    <strong><i className="icon-key pr-1"></i> {t('update_password_header')} </strong>
                    {this.props.isLoading ? <span className="event-feedback"><Spinner color="dark" size="sm" /> {t('feedback_loading')}</span> : ''}
                  </CardHeader>
                  <CardBody>

                    <FormGroup>
                      <Label for="previous_passwordInput">{t('update_password_form_previous_password')}</Label>
                      <Input 
                        type="password"
                        value={this.state.previous_password}
                        invalid={this.state.previous_password_InputFeedback ? true : false}
                        onChange={(e) => this.onInputChange('previous_password', e.target.value)}
                        id="previous_passwordInput"
                      />
                      <FormFeedback>{this.state.previous_password_InputFeedback}</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                      <Tooltip placement="top" isOpen={this.state.passwordTooltipOpen} target="password1Label" toggle={this.togglePasswordTooltip}>
                        {t('register_tooltip_password')}
                      </Tooltip>
                      <Label for="password1Input" id="password1Label">{t('update_password_form_password1')}</Label>
                      <Input 
                        type="password"
                        value={this.state.password1}
                        invalid={this.state.password1_InputFeedback ? true : false}
                        onChange={(e) => this.onInputChange('password1', e.target.value)}
                        id="password1Input"
                      />
                      <FormFeedback>{this.state.password1_InputFeedback}</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                      <Label for="password2Input">{t('update_password_form_password2')}</Label>
                      <Input 
                        type="password"
                        value={this.state.password2}
                        invalid={this.state.password2_InputFeedback ? true : false}
                        onChange={(e) => this.onInputChange('password2', e.target.value)}
                        id="password2Input"
                      />
                      <FormFeedback>{this.state.password2_InputFeedback}</FormFeedback>
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
    Logger.log('silly', `UpdatePasswordForm.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `UpdatePasswordForm.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `UpdatePasswordForm.componentWillUnmount()`);
    this.props.destroyForm();
  }
}

export default UpdatePasswordForm;

Logger.log('silly', `UpdatePasswordForm loaded.`);
