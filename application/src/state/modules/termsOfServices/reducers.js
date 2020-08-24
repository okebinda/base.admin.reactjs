import {Map, List} from 'immutable';

import {
  TERMS_OF_SERVICE_LIST_REQUEST,
  TERMS_OF_SERVICE_LIST_SUCCESS,
  TERMS_OF_SERVICE_LIST_FAILURE,
  TERMS_OF_SERVICE_READ_REQUEST,
  TERMS_OF_SERVICE_READ_SUCCESS,
  TERMS_OF_SERVICE_READ_FAILURE,
  TERMS_OF_SERVICE_UPDATE_REQUEST,
  TERMS_OF_SERVICE_UPDATE_SUCCESS,
  TERMS_OF_SERVICE_UPDATE_FAILURE,
  TERMS_OF_SERVICE_CREATE_REQUEST,
  TERMS_OF_SERVICE_CREATE_SUCCESS,
  TERMS_OF_SERVICE_CREATE_FAILURE,
  TERMS_OF_SERVICE_DELETE_REQUEST,
  TERMS_OF_SERVICE_DELETE_SUCCESS,
  TERMS_OF_SERVICE_DELETE_FAILURE,
  TERMS_OF_SERVICE_FORM_DESTROY
} from './actions'
import Logger from '../../../lib/Logger';

export default function termsOfServices(
  state=Map({
    isLoading: false,
    pages: {}
  }),
  action
) {
  Logger.log('debug', `[termsOfServices.reducers] termsOfServices(%j, %j)`, state, action);

  switch(action.type) {

    case TERMS_OF_SERVICE_LIST_REQUEST:
      return state.mergeDeep({
        isLoading: true
      });

    case TERMS_OF_SERVICE_LIST_SUCCESS:
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

    case TERMS_OF_SERVICE_LIST_FAILURE:
      return state.mergeDeep({
        isLoading: false
      });

    case TERMS_OF_SERVICE_READ_REQUEST:
      return state.mergeDeep({
        isLoading: true
      });

    case TERMS_OF_SERVICE_READ_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        lastUpdated: action.receivedAt
      });

    case TERMS_OF_SERVICE_READ_FAILURE:
      return state.mergeDeep({
        isLoading: false
      });

    case TERMS_OF_SERVICE_UPDATE_REQUEST:
      return state.mergeDeep({
        isLoading: true,
        form: {
          isSubmitting: true,
          success: null,
          errors: null
        }
      });

    case TERMS_OF_SERVICE_UPDATE_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        form: {
          isSubmitting: false,
          success: true,
          errors: null
        },
        lastUpdated: action.receivedAt
      });

    case TERMS_OF_SERVICE_UPDATE_FAILURE:
      return state.mergeDeep({
        isLoading: false,
        form: {
          isSubmitting: false,
          success: false,
          errors: null
        }
      }).setIn(['form', 'errors'], action.error);

    case TERMS_OF_SERVICE_CREATE_REQUEST:
      return state.mergeDeep({
        isLoading: true,
        form: {
          isSubmitting: true,
          success: null,
          errors: null
        }
      });

    case TERMS_OF_SERVICE_CREATE_SUCCESS:
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

    case TERMS_OF_SERVICE_CREATE_FAILURE:
      return state.mergeDeep({
        isLoading: false,
        form: {
          isSubmitting: false,
          success: false,
          errors: null
        }
      }).setIn(['form', 'errors'], action.error);

    case TERMS_OF_SERVICE_DELETE_REQUEST:
      return state.mergeDeep({
        isLoading: true
      });

    case TERMS_OF_SERVICE_DELETE_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        lastUpdated: action.receivedAt
      });

    case TERMS_OF_SERVICE_DELETE_FAILURE:
      return state.mergeDeep({
        isLoading: false
      });

    case TERMS_OF_SERVICE_FORM_DESTROY:
      return state.mergeDeep({
        form: null
      }).set('form', action.form);

    default:
      return state;
  }
}

Logger.log('silly', `termsOfServices.reducers loaded.`);
