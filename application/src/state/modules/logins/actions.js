import {normalize} from 'normalizr';

import api from '../../api';
import {schema} from '../../schema';
import {addEntities} from '../../actions';
import Logger from '../../../lib/Logger';

// ACTION TYPES

export const LOGIN_LIST_REQUEST = 'LOGIN_LIST_REQUEST';
export const LOGIN_LIST_SUCCESS = 'LOGIN_LIST_SUCCESS';
export const LOGIN_LIST_FAILURE = 'LOGIN_LIST_FAILURE';

// ACTION CREATORS

export function loginListRequest(page, limit, order, filter) {
  Logger.log('debug', `[logins.actions] loginListRequest(${page}, ${limit}, ${order}, %j)`, filter);
  return {
    type: LOGIN_LIST_REQUEST,
    page: page,
    limit: limit,
    order: order,
    filter: filter,
  }
}

export function loginListSuccess(data) {
  Logger.log('debug', `[logins.actions] loginListSuccess(%j)`, data);
  return {
    type: LOGIN_LIST_SUCCESS,
    page: data.page,
    limit: data.limit,
    order: data.order,
    result: data.result,
    total: data.total,
    receivedAt: Date.now()
  }
}

export function loginListFailure(error) {
  Logger.log('debug', `[logins.actions] loginListFailure(%j)`, error);
  return {
    type: LOGIN_LIST_FAILURE,
    error: error
  }
}

// API THUNK ACTION CREATORS

export function loadLogins(page=1, limit=10, order=null, filter=null, cb=function(){}) {
  Logger.log('debug', `[logins.actions] loadLogins(${page}, ${limit}, ${order}, ###)`);

  return async function(dispatch) {
    dispatch(loginListRequest(page, limit, order, filter));

    // call API
    const response = await api.getLogins(page, limit, order, filter);
    let success = false;

    // get logins list success
    if (200 === response.get('status')) {

      Logger.log('info', `Get API logins list success. Page: ${page}, Limit: ${limit}, Order: ${order}.`);

      const normalizedEntities = normalize(response.getIn(['data', 'logins']), [schema.login]);
      const data = {
        page: response.getIn(['data', 'page']),
        limit: response.getIn(['data', 'limit']),
        order: order,
        total: response.getIn(['data', 'total']),
        result: normalizedEntities.result
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(loginListSuccess(data));
      success = true;
      
    // get logins list failure
    } else {
      Logger.log('info', `Get API logins list failure. Page: ${page}, Limit: ${limit}, Order: ${order}.`);
      dispatch(loginListFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb(success);
  }
}

Logger.log('silly', `logins.actions loaded.`);
