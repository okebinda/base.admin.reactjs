import React, {Component} from 'react';
import {Translation} from 'react-i18next';

import StatusBadge from '../../../elements/components/StatusBadge';
import ListActions from '../../../elements/containers/ListActionsContainer';
import Logger from '../../../../../lib/Logger';
import Format from '../../../../../lib/Format';

class TermsOfServiceRow extends Component {
  render() {
    const termsOfService = this.props.termsOfService;

    // if element has been deleted
    if (!termsOfService) {
      return null;
    }

    // otherwise normal view
    return (
      <Translation>
        {
          (t) => 
            <React.Fragment>
              <tr key={termsOfService.id.toString()}>
                <th scope="row">{termsOfService.id}</th>
                <td>{termsOfService.text.substring(0, 31)}</td>
                <td>{termsOfService.version}</td>
                <td>{termsOfService.publish_date}</td>
                <td><StatusBadge status={termsOfService.status} /></td>
                <td>{Format.date(termsOfService.created_at)}</td>
                <td>
                  <ListActions
                    id={termsOfService.id}
                    editScreen={'TermsOfServiceEditScreen'}
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
    Logger.log('silly', `TermsOfServiceRow.componentDidMount()`);
  }

  componentDidUpdate() {
    Logger.log('silly', `TermsOfServiceRow.componentDidUpdate()`);
  }

  componentWillUnmount() {
    Logger.log('silly', `TermsOfServiceRow.componentWillUnmount()`);
  }
}

export default TermsOfServiceRow;

Logger.log('silly', `TermsOfServiceRow loaded.`);
