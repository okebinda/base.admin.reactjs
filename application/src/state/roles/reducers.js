import {Map} from 'immutable';

import {
  ROLE_LIST_REQUEST,
  ROLE_LIST_SUCCESS,
  ROLE_LIST_FAILURE
} from './actions';
import Logger from '../../lib/Logger';

export function roles(
  state=Map({
    areRolesLoading: false
  }),
  action
) {
  Logger.log('debug', `[roles.reducers] roles(%j, %j)`, state, action);

  switch(action.type) {

    case ROLE_LIST_REQUEST:
      return state.mergeDeep({
        areRolesLoading: true
      });

    case ROLE_LIST_SUCCESS:
      return state.mergeDeep({
        areRolesLoading: false,
        lastUpdated: action.receivedAt
      });

    case ROLE_LIST_FAILURE:
      return state.mergeDeep({
        areRolesLoading: false
      });

    default:
      return state;
  }
}

Logger.log('silly', `roles.reducers loaded.`);
