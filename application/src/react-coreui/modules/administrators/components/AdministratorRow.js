import React, {Component} from 'react';
import {Translation} from 'react-i18next';

import ListActions from '../../../elements/containers/ListActionsContainer';
import StatusBadge from '../../../elements/components/StatusBadge';
import Logger from '../../../../lib/Logger';
import Format from '../../../../lib/Format';

class AdministratorRow extends Component {
  render() {
    const administrator = this.props.administrator;

    // if element has been deleted
    if (!administrator) {
      return null;
    }

    // otherwise normal view
    return (
      <Translation>
        {
          (t) => 
            <React.Fragment>
              <tr key={administrator.id.toString()}>
                <th scope="row">{administrator.id}</th>
                <td>{administrator.username}</td>
                <td>{administrator.email}</td>
                <td>{administrator.first_name}</td>
                <td>{administrator.last_name}</td>
                <td>{administrator.roles.map((role, index) => this.props.roles[role] ? this.props.roles[role].name + ' ' : null)}</td>
                <td>{Format.date(administrator.joined_at)}</td>
                <td><StatusBadge status={administrator.status} /></td>
                <td>{Format.date(administrator.created_at)}</td>
                <td>
                  <ListActions
                    id={administrator.id}
                    editScreen={'AdministratorEditScreen'}
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
    Logger.log('silly', `AdministratorRow.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `AdministratorRow.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `AdministratorRow.componentWillUnmount()`);
  }
}

export default AdministratorRow;

Logger.log('silly', `AdministratorRow loaded.`);
