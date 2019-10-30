import React, {Component} from 'react';
import {Translation} from 'react-i18next';

import BooleanBadge from '../../../elements/components/BooleanBadge';
import Logger from '../../../../lib/Logger';
import Format from '../../../../lib/Format';

class LoginRow extends Component {

  render() {
    const login = this.props.login;

    // if element has been deleted
    if (!login) {
      return null;
    }

    // otherwise normal view
    return (
      <Translation>
        {
          (t) => 
            <React.Fragment>

              <tr key={login.id.toString()}>
                <th scope="row">{login.id}</th>
                <td>{login.user_id}</td>
                <td>{login.username}</td>
                <td>{login.ip_address}</td>
                <td><BooleanBadge value={login.success} /></td>
                <td>{Format.date(login.attempt_date, 'mm/dd/yyyy HH:mm:ss Z')}</td>
              </tr>

            </React.Fragment>
            
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `LoginRow.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `LoginRow.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `LoginRow.componentWillUnmount()`);
  }
}

export default LoginRow;

Logger.log('silly', `LoginRow loaded.`);
