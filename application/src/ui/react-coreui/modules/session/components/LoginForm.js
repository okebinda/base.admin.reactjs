import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {Translation} from 'react-i18next';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Spinner
} from 'reactstrap';

import Logger from '../../../../../lib/Logger';
import Config from '../../../../../Config';
import {pathTo} from '../../../Routes';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      username: '',
      password:''
    };
  }

  // generic input change handler
  onInputChange = (input, evt) => {
    this.setState({[input]: evt.target.value});
  }

  // submit credentials handler
  submitCredentials = async () => {
    Logger.log('debug', `LoginForm.submitCredentials()`);

    // API POST/PUT payload
    let payload = {
      "username": this.state.username,
      "password": this.state.password
    };

    // create session
    this.props.createSession(payload, () => {
      if (this.props.success) {
          this.setState({redirectToReferrer: true});
      }
    });
  }

  // form submit handler
  handleSubmit = async (evt) => {
    Logger.log('debug', `LoginForm.handleSubmit(###)`);
    evt.preventDefault();
    if (!this.props.isLoading) {
      await this.submitCredentials();
    }
  }

  render() {
    const {isLoading} = this.props;
    const {from} = this.props.location.state || { from: { pathname: pathTo(Config.get('DEFAULT_LOGIN_REDIRECT')) } }
    const {redirectToReferrer} = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <Translation>
        {
          (t) => 
            <div>

              <div className="flash-message row justify-content-sm-center">
                <div className="col-sm-auto">
                  {false === this.props.success
                    ? <Alert color="danger">{t('login_form_failure')}</Alert>
                    : ''
                  }
                </div>
              </div>

              <CardGroup>
                <Card className="p-4">
                  <CardBody>

                    <Form onSubmit={this.handleSubmit}>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder={t('login_form_username')}
                          autoComplete="username"
                          onChange={(e) => this.onInputChange('username', e)}
                          autoFocus
                        />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder={t('login_form_password')}
                          autoComplete="current-password"
                          onChange={(e) => this.onInputChange('password', e)}
                        />
                      </InputGroup>

                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            disabled={isLoading}
                          >
                            {isLoading ? <span><Spinner color="light" size="sm" /> </span> : null }
                            {isLoading ? t('feedback_form_submit_in_process') : t('login_form_submit') }
                          </Button>
                        </Col>
                      </Row>

                    </Form>

                  </CardBody>
                </Card>
              </CardGroup>
            </div>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `LoginForm.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `LoginForm.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `LoginForm.componentWillUnmount()`);
  }
}

export default LoginForm;

Logger.log('silly', `LoginForm loaded.`);
