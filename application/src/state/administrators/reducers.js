import {Map, List} from 'immutable';

import {
  ADMINISTRATOR_LIST_REQUEST,
  ADMINISTRATOR_LIST_SUCCESS,
  ADMINISTRATOR_LIST_FAILURE,
  ADMINISTRATOR_READ_REQUEST,
  ADMINISTRATOR_READ_SUCCESS,
  ADMINISTRATOR_READ_FAILURE,
  ADMINISTRATOR_UPDATE_REQUEST,
  ADMINISTRATOR_UPDATE_SUCCESS,
  ADMINISTRATOR_UPDATE_FAILURE,
  ADMINISTRATOR_CREATE_REQUEST,
  ADMINISTRATOR_CREATE_SUCCESS,
  ADMINISTRATOR_CREATE_FAILURE,
  ADMINISTRATOR_DELETE_REQUEST,
  ADMINISTRATOR_DELETE_SUCCESS,
  ADMINISTRATOR_DELETE_FAILURE,
  ADMINISTRATOR_FORM_DESTROY
} from './actions'
import Logger from '../../lib/Logger';

export function administrators(
  state=Map({
    isLoading: false,
    pages: {}
  }),
  action
) {
  Logger.log('debug', `[administrators.reducers] administrators(%j, %j)`, state, action);

  switch(action.type) {

    case ADMINISTRATOR_LIST_REQUEST:
      return state.mergeDeep({
        isLoading: true
      });

    case ADMINISTRATOR_LIST_SUCCESS:
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

    case ADMINISTRATOR_LIST_FAILURE:
      return state.mergeDeep({
        isLoading: false
      });

    case ADMINISTRATOR_READ_REQUEST:
      return state.mergeDeep({
        isLoading: true
      });

    case ADMINISTRATOR_READ_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        lastUpdated: action.receivedAt
      });

    case ADMINISTRATOR_READ_FAILURE:
      return state.mergeDeep({
        isLoading: false
      });

    case ADMINISTRATOR_UPDATE_REQUEST:
      return state.mergeDeep({
        isLoading: true,
        form: {
          isSubmitting: true,
          success: null,
          errors: null
        }
      });

    case ADMINISTRATOR_UPDATE_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        form: {
          isSubmitting: false,
          success: true,
          errors: null
        },
        lastUpdated: action.receivedAt
      });

    case ADMINISTRATOR_UPDATE_FAILURE:
      return state.mergeDeep({
        isLoading: false,
        form: {
          isSubmitting: false,
          success: false,
          errors: null
        }
      }).setIn(['form', 'errors'], action.error);

    case ADMINISTRATOR_CREATE_REQUEST:
      return state.mergeDeep({
        isLoading: true,
        form: {
          isSubmitting: true,
          success: null,
          errors: null
        }
      });

    case ADMINISTRATOR_CREATE_SUCCESS:
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

    case ADMINISTRATOR_CREATE_FAILURE:
      return state.mergeDeep({
        isLoading: false,
        form: {
          isSubmitting: false,
          success: false,
          errors: null
        }
      }).setIn(['form', 'errors'], action.error);

    case ADMINISTRATOR_DELETE_REQUEST:
      return state.mergeDeep({
        isLoading: true
      });

    case ADMINISTRATOR_DELETE_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        lastUpdated: action.receivedAt
      });

    case ADMINISTRATOR_DELETE_FAILURE:
      return state.mergeDeep({
        isLoading: false
      });

    case ADMINISTRATOR_FORM_DESTROY:
      return state.mergeDeep({
        form: null
      }).set('form', action.form);

    default:
      return state;
  }
}

Logger.log('silly', `administrators.reducers loaded.`);
