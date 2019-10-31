import React, {Component} from 'react';
import {Translation} from 'react-i18next';

import ListActions from '../../../elements/containers/ListActionsContainer';
import StatusBadge from '../../../elements/components/StatusBadge';
import Logger from '../../../../lib/Logger';
import Format from '../../../../lib/Format';

class AppKeyRow extends Component {
  render() {
    const app_key = this.props.app_key;

    // if element has been deleted
    if (!app_key) {
      return null;
    }

    // otherwise normal view
    return (
      <Translation>
        {
          (t) => 
            <React.Fragment>
              <tr key={app_key.id.toString()}>
                <th scope="row">{app_key.id}</th>
                <td>{app_key.application}</td>
                <td>{app_key.key}</td>
                <td><StatusBadge status={app_key.status} /></td>
                <td>{Format.date(app_key.created_at)}</td>
                <td>
                  <ListActions
                    id={app_key.id}
                    editScreen={'AppKeyEditScreen'}
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
    Logger.log('silly', `AppKeyRow.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `AppKeyRow.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `AppKeyRow.componentWillUnmount()`);
  }
}

export default AppKeyRow;

Logger.log('silly', `AppKeyRow loaded.`);
