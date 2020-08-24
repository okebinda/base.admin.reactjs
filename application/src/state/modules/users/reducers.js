import {Map, List} from 'immutable';

import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_READ_REQUEST,
  USER_READ_SUCCESS,
  USER_READ_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_FORM_DESTROY
} from './actions'
import Logger from '../../../lib/Logger';

export default function users(
  state=Map({
    isLoading: false,
    pages: {}
  }),
  action
) {
  Logger.log('debug', `[users.reducers] users(%j, %j)`, state, action);

  switch(action.type) {

    case USER_LIST_REQUEST:
      return state.mergeDeep({
        isLoading: true
      });

    case USER_LIST_SUCCESS:
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

    case USER_LIST_FAILURE:
      return state.mergeDeep({
        isLoading: false
      });

    case USER_READ_REQUEST:
      return state.mergeDeep({
        isLoading: true
      });

    case USER_READ_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        lastUpdated: action.receivedAt
      });

    case USER_READ_FAILURE:
      return state.mergeDeep({
        isLoading: false
      });

    case USER_UPDATE_REQUEST:
      return state.mergeDeep({
        isLoading: true,
        form: {
          isSubmitting: true,
          success: null,
          errors: null
        }
      });

    case USER_UPDATE_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        form: {
          isSubmitting: false,
          success: true,
          errors: null
        },
        lastUpdated: action.receivedAt
      });

    case USER_UPDATE_FAILURE:
      return state.mergeDeep({
        isLoading: false,
        form: {
          isSubmitting: false,
          success: false,
          errors: null
        }
      }).setIn(['form', 'errors'], action.error);

    case USER_CREATE_REQUEST:
      return state.mergeDeep({
        isLoading: true,
        form: {
          isSubmitting: true,
          success: null,
          errors: null
        }
      });

    case USER_CREATE_SUCCESS:
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

    case USER_CREATE_FAILURE:
      return state.mergeDeep({
        isLoading: false,
        form: {
          isSubmitting: false,
          success: false,
          errors: null
        }
      }).setIn(['form', 'errors'], action.error);

    case USER_DELETE_REQUEST:
      return state.mergeDeep({
        isLoading: true
      });

    case USER_DELETE_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        lastUpdated: action.receivedAt
      });

    case USER_DELETE_FAILURE:
      return state.mergeDeep({
        isLoading: false
      });

    case USER_FORM_DESTROY:
      return state.mergeDeep({
        form: null
      }).set('form', action.form);

    default:
      return state;
  }
}

Logger.log('silly', `users.reducers loaded.`);
