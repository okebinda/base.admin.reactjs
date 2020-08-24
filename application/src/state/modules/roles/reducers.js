import {Map, List} from 'immutable';

import {
  ROLE_LIST_REQUEST,
  ROLE_LIST_SUCCESS,
  ROLE_LIST_FAILURE,
  ROLE_READ_REQUEST,
  ROLE_READ_SUCCESS,
  ROLE_READ_FAILURE,
  ROLE_UPDATE_REQUEST,
  ROLE_UPDATE_SUCCESS,
  ROLE_UPDATE_FAILURE,
  ROLE_CREATE_REQUEST,
  ROLE_CREATE_SUCCESS,
  ROLE_CREATE_FAILURE,
  ROLE_DELETE_REQUEST,
  ROLE_DELETE_SUCCESS,
  ROLE_DELETE_FAILURE,
  ROLE_FORM_DESTROY
} from './actions';
import Logger from '../../../lib/Logger';

export default function roles(
  state=Map({
    areRolesLoading: false,
    pages: {}
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

    case ROLE_LIST_FAILURE:
      return state.mergeDeep({
        areRolesLoading: false
      });

    case ROLE_READ_REQUEST:
      return state.mergeDeep({
        areRolesLoading: true
      });

    case ROLE_READ_SUCCESS:
      return state.mergeDeep({
        areRolesLoading: false,
        lastUpdated: action.receivedAt
      });

    case ROLE_READ_FAILURE:
      return state.mergeDeep({
        areRolesLoading: false
      });
    
    case ROLE_UPDATE_REQUEST:
      return state.mergeDeep({
        areRolesLoading: true,
        form: {
          isSubmitting: true,
          success: null,
          errors: null
        }
      });

    case ROLE_UPDATE_SUCCESS:
      return state.mergeDeep({
        areRolesLoading: false,
        form: {
          isSubmitting: false,
          success: true,
          errors: null
        },
        lastUpdated: action.receivedAt
      });

    case ROLE_UPDATE_FAILURE:
      return state.mergeDeep({
        areRolesLoading: false,
        form: {
          isSubmitting: false,
          success: false,
          errors: null
        }
      }).setIn(['form', 'errors'], action.error);
    
    case ROLE_CREATE_REQUEST:
      return state.mergeDeep({
        areRolesLoading: true,
        form: {
          isSubmitting: true,
          success: null,
          errors: null
        }
      });

    case ROLE_CREATE_SUCCESS:
      return state.mergeDeep({
        areRolesLoading: false,
        form: {
          isSubmitting: false,
          success: true,
          created_id: parseInt(action.id),
          errors: null
        },
        lastUpdated: action.receivedAt
      });

    case ROLE_CREATE_FAILURE:
      return state.mergeDeep({
        areRolesLoading: false,
        form: {
          isSubmitting: false,
          success: false,
          errors: null
        }
      }).setIn(['form', 'errors'], action.error);
    
    case ROLE_DELETE_REQUEST:
      return state.mergeDeep({
        areRolesLoading: true
      });

    case ROLE_DELETE_SUCCESS:
      return state.mergeDeep({
        areRolesLoading: false,
        lastUpdated: action.receivedAt
      });

    case ROLE_DELETE_FAILURE:
      return state.mergeDeep({
        areRolesLoading: false
      });

    case ROLE_FORM_DESTROY:
      return state.mergeDeep({
        form: null
      }).set('form', action.form);

    default:
      return state;
  }
}

Logger.log('silly', `roles.reducers loaded.`);
