import React, {Component} from 'react';
import {Translation} from 'react-i18next';

import ListActions from '../../../elements/containers/ListActionsContainer';
import BooleanBadge from '../../../elements/components/BooleanBadge';
import Logger from '../../../../../lib/Logger';
import Format from '../../../../../lib/Format';

class RoleRow extends Component {
  render() {
    const role = this.props.role;

    // if element has been deleted
    if (!role) {
      return null;
    }

    // otherwise normal view
    return (
      <Translation>
        {
          (t) => 
            <React.Fragment>
              <tr key={role.id.toString()}>
                <th scope="row">{role.id}</th>
                <td>{role.name}</td>
                <td><BooleanBadge value={role.is_admin_role} /></td>
                <td>{role.priority}</td>
                <td><BooleanBadge value={role.login_lockout_policy} /></td>
                <td><BooleanBadge value={role.password_policy} /></td>
                <td>{Format.date(role.created_at)}</td>
                <td>
                  <ListActions
                    id={role.id}
                    editScreen={'RoleEditScreen'}
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
    Logger.log('silly', `RoleRow.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `RoleRow.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `RoleRow.componentWillUnmount()`);
  }
}

export default RoleRow;

Logger.log('silly', `RoleRow loaded.`);
