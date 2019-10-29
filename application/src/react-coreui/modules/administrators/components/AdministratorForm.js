import React, {Component, createRef} from 'react';
import {Redirect} from 'react-router-dom'
import {Translation} from 'react-i18next';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
} from 'reactstrap';

import StatusInput from '../../../elements/components/StatusInput';
import RoleInput from '../../roles/containers/RoleInputContainer';
import {pathTo} from '../../../Routes';
import Logger from '../../../../lib/Logger';

class AdministratorForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.formTop = createRef();
  }

  initialState = () => {
    Logger.log('debug', `AdministratorForm.initialState()`);

    let state = {
      password: ''
    };
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
    Logger.log('debug', `AdministratorForm.formDefaults()`);

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
    Logger.log('debug', `AdministratorForm.submitData()`);

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
      });

    // create form
    } else {
      this.props.create(payload, () => {
        this.setState(Object.assign({}, ...Object.keys(this.props.errors).map(k => ({[k + '_InputFeedback']: this.props.errors[k]}))));
        if (this.props.success) {
          this.setState({redirectTo: pathTo('AdministratorEditScreen', {id: this.props.created_id})});
        } else {
          this.scrollToRef(this.formTop);
        }
      });
    }
  }

  // form submit handler
  handleSubmit = async (evt) => {
    Logger.log('debug', `AdministratorForm.handleSubmit(###)`);
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
            <div className="form-administrator" ref={this.formTop}>
              
              <Form className="form-horizontal" onSubmit={this.handleSubmit}>

                <Row>

                  <Col md="9">

                    <Card>
                      <CardHeader>
                        <strong><i className="icon-user pr-1"></i> {t('administrator_header_account')} </strong>
                      </CardHeader>
                      <CardBody>
                    
                        <FormGroup>
                          <Label for="usernameInput">{t('administrator_username')}</Label>
                          <Input 
                            type="text"
                            value={this.state.username}
                            invalid={this.state.username_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('username', e.target.value.trim())}
                            id="usernameInput"
                            autoFocus
                          />
                          <FormFeedback>{this.state.username_InputFeedback}</FormFeedback>
                        </FormGroup>
                    
                        <FormGroup>
                          <Label for="emailInput">{t('administrator_email')}</Label>
                          <Input 
                            type="text"
                            value={this.state.email}
                            invalid={this.state.email_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('email', e.target.value.toLowerCase().trim())}
                            id="emailInput"
                          />
                          <FormFeedback>{this.state.email_InputFeedback}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                          <Label for="first_nameInput">{t('administrator_first_name')}</Label>
                          <Input 
                            type="first_name"
                            value={this.state.first_name}
                            invalid={this.state.first_name_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('first_name', e.target.value.replace(/\s+/g, ' '))}
                            id="first_nameInput"
                          />
                          <FormFeedback>{this.state.first_name_InputFeedback}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                          <Label for="last_nameInput">{t('administrator_last_name')}</Label>
                          <Input 
                            type="last_name"
                            value={this.state.last_name}
                            invalid={this.state.last_name_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('last_name', e.target.value.replace(/\s+/g, ' '))}
                            id="last_nameInput"
                          />
                          <FormFeedback>{this.state.last_name_InputFeedback}</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                          <Label for="joined_atInput">{t('administrator_joined_at')}</Label>
                          <Input 
                            type="text"
                            value={this.state.joined_at}
                            invalid={this.state.joined_at_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('joined_at', e.target.value)}
                            id="joined_atInput"
                          />
                          <FormFeedback>{this.state.joined_at_InputFeedback}</FormFeedback>
                        </FormGroup>

                        <RoleInput
                          field="roles"
                          values={this.state.roles}
                          feedback={this.state.roles_InputFeedback}
                          onInputChange={this.onInputChange.bind(this)}
                          type="admin"
                        />

                      </CardBody>
                    </Card>

                    <Card>
                      <CardHeader>
                        <strong><i className="icon-key pr-1"></i> {t('user_account_header_password')} </strong>
                      </CardHeader>
                      <CardBody>
                    
                        <FormGroup>
                          <Label for="passwordInput">{t('user_account_form_password')}</Label>
                          <Input 
                            type="password"
                            value={this.state.password}
                            invalid={this.state.password_InputFeedback ? true : false}
                            onChange={(e) => this.onInputChange('password', e.target.value)}
                            id="passwordInput"
                          />
                          <FormFeedback>{this.state.password_InputFeedback}</FormFeedback>
                          <FormText color="muted">{t('user_account_form_hint_password')}</FormText>
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
    Logger.log('silly', `AdministratorForm.componentDidMount()`);

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
    Logger.log('silly', `AdministratorForm.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `AdministratorForm.componentWillUnmount()`);

    // cleanup form state - mostly remove any remaining errors from the store
    // but keep success flash message for newly created records when redirecting to edit form
    this.props.destroyForm(this.props.created_id ? {success: this.props.success} : null);
  }
}

export default AdministratorForm;

Logger.log('silly', `AdministratorForm loaded.`);
