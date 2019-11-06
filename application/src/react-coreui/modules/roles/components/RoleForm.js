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
  Spinner,
} from 'reactstrap';

import FormMetadata from '../../../elements/components/FormMetadata';
import {pathTo} from '../../../Routes';
import Logger from '../../../../lib/Logger';

class RoleForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.formTop = createRef();
  }

  initialState = () => {
    Logger.log('debug', `RoleForm.initialState()`);

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
    Logger.log('debug', `RoleForm.formDefaults()`);

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
    Logger.log('debug', `RoleForm.submitData()`);

    // reset form feedback and disable submit button
    this.setState(this.formDefaults());

    // API POST/PUT payload
    let payload = {
      'login_lockout_policy': this.state['login_lockout_policy'] ? true : false,
      'login_ban_by_ip': this.state['login_ban_by_ip'] ? true : false,
      'password_policy': this.state['password_policy'] ? true : false,
      'is_admin_role': this.state['is_admin_role'] ? true : false,
    };
    for (const input of Object.keys(this.props.data)) {
      if (input in this.state) {
        if (!['login_lockout_policy', 'login_ban_by_ip', 'password_policy', 'is_admin_role'].includes(input)) {
          payload[input] = this.state[input];
        }
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
          this.setState({redirectTo: pathTo('RoleEditScreen', {id: this.props.created_id})});
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
    Logger.log('debug', `RoleForm.handleSubmit(###)`);
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
            <div className="form-role" ref={this.formTop}>
              
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>

                <Row>

                  <Col md="9">

                    <Card>
                      <CardHeader>
                        <strong><i className="icon-shield pr-1"></i> {t('role_header_role')} </strong>
                        {this.props.isLoading ? <span className="event-feedback"><Spinner color="dark" size="sm" /> {t('feedback_loading')}</span> : ''}
                        <div className="float-right">{this.props.id ? t('table_record_id', {'id': this.props.id}) : ''}</div>
                      </CardHeader>
                      <CardBody>
                    
                        <FormGroup>
                          <Label for="nameInput">{t('role_name')}</Label>
                          <Input 
                            type="text"
                            value={this.state.name}
                            invalid={this.state.name_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('name', e.target.value)}
                            id="nameInput"
                            autoFocus
                          />
                          <FormFeedback>{this.state.name_InputFeedback}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                          <Label for="priorityInput">{t('role_priority')}</Label>
                          <Input 
                            type="number"
                            value={this.state.priority}
                            invalid={this.state.priority_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('priority', e.target.value)}
                            id="priorityInput"
                          />
                          <FormFeedback>{this.state.priority_InputFeedback}</FormFeedback>
                        </FormGroup>

                        <FormGroup check>
                          <Input 
                            type="checkbox"
                            value="1"
                            checked={this.state.is_admin_role}
                            invalid={this.state.is_admin_role_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('is_admin_role', !this.state.is_admin_role)}
                            id="is_admin_roleInput"
                          />
                          <Label check for="is_admin_roleInput">{t('role_is_admin_role')}</Label>
                          <FormFeedback>{this.state.is_admin_role_InputFeedback}</FormFeedback>
                        </FormGroup>

                      </CardBody>
                    </Card>

                    <Card>
                      <CardHeader>
                        <strong><i className="icon-lock pr-1"></i> {t('role_header_login_policy')} </strong>
                      </CardHeader>
                      <CardBody>

                        <FormGroup check>
                          <Input 
                            type="checkbox"
                            value="1"
                            checked={this.state.login_lockout_policy}
                            invalid={this.state.login_lockout_policy_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('login_lockout_policy', !this.state.login_lockout_policy)}
                            id="login_lockout_policyInput"
                          />
                          <Label check for="login_lockout_policyInput">{t('role_login_lockout_policy')}</Label>
                          <FormFeedback>{this.state.login_lockout_policy_InputFeedback}</FormFeedback>
                        </FormGroup>

                        <br />

                        <FormGroup>
                          <Label for="login_max_attemptsInput">{t('role_login_max_attempts')}</Label>
                          <Input 
                            type="number"
                            value={this.state.login_max_attempts}
                            invalid={this.state.login_max_attempts_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('login_max_attempts', e.target.value)}
                            id="login_max_attemptsInput"
                          />
                          <FormFeedback>{this.state.login_max_attempts_InputFeedback}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                          <Label for="login_timeframeInput">{t('role_login_timeframe')}</Label>
                          <Input 
                            type="number"
                            value={this.state.login_timeframe}
                            invalid={this.state.login_timeframe_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('login_timeframe', e.target.value)}
                            id="login_timeframeInput"
                          />
                          <FormFeedback>{this.state.login_timeframe_InputFeedback}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                          <Label for="login_ban_timeInput">{t('role_login_ban_time')}</Label>
                          <Input 
                            type="number"
                            value={this.state.login_ban_time}
                            invalid={this.state.login_ban_time_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('login_ban_time', e.target.value)}
                            id="login_ban_timeInput"
                          />
                          <FormFeedback>{this.state.login_ban_time_InputFeedback}</FormFeedback>
                        </FormGroup>

                        <FormGroup check>
                          <Input 
                            type="checkbox"
                            value="1"
                            checked={this.state.login_ban_by_ip}
                            invalid={this.state.login_ban_by_ip_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('login_ban_by_ip', !this.state.login_ban_by_ip)}
                            id="login_ban_by_ipInput"
                          />
                          <Label check for="login_ban_by_ipInput">{t('role_login_ban_by_ip')}</Label>
                          <FormFeedback>{this.state.login_ban_by_ip_InputFeedback}</FormFeedback>
                        </FormGroup>

                      </CardBody>
                    </Card>

                    <Card>
                      <CardHeader>
                        <strong><i className="icon-key pr-1"></i> {t('role_header_password_policy')} </strong>
                      </CardHeader>
                      <CardBody>

                        <FormGroup check>
                          <Input 
                            type="checkbox"
                            value="1"
                            checked={this.state.password_policy}
                            invalid={this.state.password_policy_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('password_policy', !this.state.password_policy)}
                            id="password_policyInput"
                          />
                          <Label check for="password_policyInput">{t('role_password_policy')}</Label>
                          <FormFeedback>{this.state.password_policy_InputFeedback}</FormFeedback>
                        </FormGroup>

                        <br />

                        <FormGroup>
                          <Label for="password_reuse_historyInput">{t('role_password_reuse_history')}</Label>
                          <Input 
                            type="number"
                            value={this.state.password_reuse_history}
                            invalid={this.state.password_reuse_history_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('password_reuse_history', e.target.value)}
                            id="password_reuse_historyInput"
                          />
                          <FormFeedback>{this.state.password_reuse_history_InputFeedback}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                          <Label for="password_reset_daysInput">{t('role_password_reset_days')}</Label>
                          <Input 
                            type="number"
                            value={this.state.password_reset_days}
                            invalid={this.state.password_reset_days_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('password_reset_days', e.target.value)}
                            id="password_reset_daysInput"
                          />
                          <FormFeedback>{this.state.password_reset_days_InputFeedback}</FormFeedback>
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
                      onDeleteRedirectTo={'RolesScreen'}
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
    Logger.log('silly', `RoleForm.componentDidMount()`);

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
    Logger.log('silly', `RoleForm.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `RoleForm.componentWillUnmount()`);
    this.props.destroyForm(this.props.created_id ? {success: this.props.success} : null);
  }
}

export default RoleForm;

Logger.log('silly', `RoleForm loaded.`);
