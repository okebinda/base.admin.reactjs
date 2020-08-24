import {Map} from 'immutable';

import {
  USER_ACCOUNT_READ_REQUEST,
  USER_ACCOUNT_READ_SUCCESS,
  USER_ACCOUNT_READ_FAILURE,
  USER_ACCOUNT_UPDATE_REQUEST,
  USER_ACCOUNT_UPDATE_SUCCESS,
  USER_ACCOUNT_UPDATE_FAILURE,
  USER_ACCOUNT_FORM_DESTROY,
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAILURE,
  PASSWORD_FORM_DESTROY
} from './actions'
import Logger from '../../../lib/Logger';

export default function userAccount(
  state=Map({
    isLoading: false,
    isPasswordLoading: false
  }),
  action
) {
  Logger.log('debug', `[userAccount.reducers] userAccount(%j, %j)`, state, action);

  switch(action.type) {

    case USER_ACCOUNT_READ_REQUEST:
      return state.mergeDeep({
        isLoading: true
      });

    case USER_ACCOUNT_READ_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        data: {
          username: action.username,
          email: action.email,
          first_name: action.first_name,
          last_name: action.last_name,
          lastUpdated: action.receivedAt
        }
      });

    case USER_ACCOUNT_READ_FAILURE:
      return state.mergeDeep({
        isLoading: false
      });

    case USER_ACCOUNT_UPDATE_REQUEST:
      return state.mergeDeep({
        isLoading: true,
        form: null
      });

    case USER_ACCOUNT_UPDATE_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        data: {
          username: action.username,
          email: action.email,
          first_name: action.first_name,
          last_name: action.last_name,
          lastUpdated: action.receivedAt
        },
        form: {
          success: true,
          errors: null
        },
        lastUpdated: action.receivedAt
      });

    case USER_ACCOUNT_UPDATE_FAILURE:
      return state.mergeDeep({
        isLoading: false,
        form: {
          success: false,
          errors: null
        }
      }).setIn(['form', 'errors'], action.error);

    case USER_ACCOUNT_FORM_DESTROY:
      return state.mergeDeep({
        form: null
      }).set('form', action.form);

    case PASSWORD_UPDATE_REQUEST:
      return state.mergeDeep({
        isPasswordLoading: true,
        passwordForm: null
      });

    case PASSWORD_UPDATE_SUCCESS:
      return state.mergeDeep({
        isPasswordLoading: false,
        passwordForm: {
          success: true,
          errors: null
        }
      });

    case PASSWORD_UPDATE_FAILURE:
      return state.mergeDeep({
        isPasswordLoading: false,
        passwordForm: {
          success: false,
          errors: null
        }
      }).setIn(['passwordForm', 'errors'], action.error);

    case PASSWORD_FORM_DESTROY:
      return state.mergeDeep({
        form: null
      }).set('passwordForm', action.form);

    default:
      return state;
  }
}

Logger.log('silly', `userAccount.reducers loaded.`);
