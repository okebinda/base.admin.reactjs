import {Map, List} from 'immutable';

import {
  LOGIN_LIST_REQUEST,
  LOGIN_LIST_SUCCESS,
  LOGIN_LIST_FAILURE
} from './actions'
import Logger from '../../lib/Logger';

export function logins(
  state=Map({
    isLoading: false,
    pages: {}
  }),
  action
) {
  Logger.log('debug', `[logins.reducers] logins(%j, %j)`, state, action);

  switch(action.type) {

    case LOGIN_LIST_REQUEST:
      return state.mergeDeep({
        isLoading: true
      });

    case LOGIN_LIST_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        pages: {
          [action.order]: {
            [action.limit]: {
              [action.page]: null
            }
          }
        },
        total: action.total,
        lastUpdated: action.receivedAt
      }).setIn(['pages', action.order, action.limit, action.page], List(action.result));

    case LOGIN_LIST_FAILURE:
      return state.mergeDeep({
        isLoading: false
      });

    default:
      return state;
  }
}

Logger.log('silly', `logins.reducers loaded.`);
