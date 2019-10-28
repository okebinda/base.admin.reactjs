import {Map, List} from 'immutable';

import {
  APP_KEY_LIST_REQUEST,
  APP_KEY_LIST_SUCCESS,
  APP_KEY_LIST_FAILURE,
  APP_KEY_READ_REQUEST,
  APP_KEY_READ_SUCCESS,
  APP_KEY_READ_FAILURE,
  APP_KEY_UPDATE_REQUEST,
  APP_KEY_UPDATE_SUCCESS,
  APP_KEY_UPDATE_FAILURE,
  APP_KEY_CREATE_REQUEST,
  APP_KEY_CREATE_SUCCESS,
  APP_KEY_CREATE_FAILURE,
  APP_KEY_DELETE_REQUEST,
  APP_KEY_DELETE_SUCCESS,
  APP_KEY_DELETE_FAILURE,
  APP_KEY_FORM_DESTROY
} from './actions'
import Logger from '../../lib/Logger';

export function appKeys(
  state=Map({
    isLoading: false,
    pages: {}
  }),
  action
) {
  Logger.log('debug', `[appKeys.reducers] appKeys(%j, %j)`, state, action);

  switch(action.type) {

    case APP_KEY_LIST_REQUEST:
      return state.mergeDeep({
        isLoading: true
      });

    case APP_KEY_LIST_SUCCESS:
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
      }).setIn(['app_keys', action.order, action.limit, action.page], List(action.result));

    case APP_KEY_LIST_FAILURE:
      return state.mergeDeep({
        isLoading: false
      });

    case APP_KEY_READ_REQUEST:
      return state.mergeDeep({
        isLoading: true
      });

    case APP_KEY_READ_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        lastUpdated: action.receivedAt
      });

    case APP_KEY_READ_FAILURE:
      return state.mergeDeep({
        isLoading: false
      });

    case APP_KEY_UPDATE_REQUEST:
      return state.mergeDeep({
        isLoading: true,
        form: {
          isSubmitting: true,
          success: null,
          errors: null
        }
      });

    case APP_KEY_UPDATE_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        form: {
          isSubmitting: false,
          success: true,
          errors: null
        },
        lastUpdated: action.receivedAt
      });

    case APP_KEY_UPDATE_FAILURE:
      return state.mergeDeep({
        isLoading: false,
        form: {
          isSubmitting: false,
          success: false,
          errors: null
        }
      }).setIn(['form', 'errors'], action.error);

    case APP_KEY_CREATE_REQUEST:
      return state.mergeDeep({
        isLoading: true,
        form: {
          isSubmitting: true,
          success: null,
          errors: null
        }
      });

    case APP_KEY_CREATE_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        form: {
          isSubmitting: false,
          success: true,
          created_id: parseInt(action.id),
          errors: null
        },
        lastUpdated: action.receivedAt
      });

    case APP_KEY_CREATE_FAILURE:
      return state.mergeDeep({
        isLoading: false,
        form: {
          isSubmitting: false,
          success: false,
          errors: null
        }
      }).setIn(['form', 'errors'], action.error);

    case APP_KEY_DELETE_REQUEST:
      return state.mergeDeep({
        isLoading: true
      });

    case APP_KEY_DELETE_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        lastUpdated: action.receivedAt
      });

    case APP_KEY_DELETE_FAILURE:
      return state.mergeDeep({
        isLoading: false
      });

    case APP_KEY_FORM_DESTROY:
      return state.mergeDeep({
        form: null
      }).set('form', action.form);

    default:
      return state;
  }
}

Logger.log('silly', `appKeys.reducers loaded.`);
