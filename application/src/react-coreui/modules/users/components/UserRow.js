import React, {Component} from 'react';
import {Translation} from 'react-i18next';

import ListActions from '../../../elements/containers/ListActionsContainer';
import BooleanBadge from '../../../elements/components/BooleanBadge';
import StatusBadge from '../../../elements/components/StatusBadge';
import Logger from '../../../../lib/Logger';
import Format from '../../../../lib/Format';

class UserRow extends Component {
  render() {
    const user = this.props.user;

    // if element has been deleted
    if (!user) {
      return null;
    }

    // otherwise normal view
    return (
      <Translation>
        {
          (t) => 
            <React.Fragment>
              <tr key={user.id.toString()}>
                <th scope="row">{user.id}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.roles.map((role, index) => this.props.roles[role] ? this.props.roles[role].name + ' ' : null)}</td>
                <td><BooleanBadge value={user.is_verified} /></td>
                <td>{Format.date(user.joined_at)}</td>
                <td><StatusBadge status={user.status} /></td>
                <td>{Format.date(user.created_at)}</td>
                <td>
                  <ListActions
                    id={user.id}
                    editScreen={'UserEditScreen'}
                    delete={this.props.delete.bind(this)}
                  />
                </td>
              </tr>
            </React.Fragment>
        }
      </Translation>
    )
  }

  /* LIFECYCLE EVENTS */

  componentDidMount() {
    Logger.log('silly', `UserRow.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `UserRow.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `UserRow.componentWillUnmount()`);
  }
}

export default UserRow;

Logger.log('silly', `UserRow loaded.`);
