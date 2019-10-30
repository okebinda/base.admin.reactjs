import {normalize} from 'normalizr';

import api from '../api';
import {schema} from '../schema';
import {addEntities} from '../actions';
import Logger from '../../lib/Logger';

// ACTION TYPES

export const LOGIN_LIST_REQUEST = 'LOGIN_LIST_REQUEST';
export const LOGIN_LIST_SUCCESS = 'LOGIN_LIST_SUCCESS';
export const LOGIN_LIST_FAILURE = 'LOGIN_LIST_FAILURE';

// ACTION CREATORS

export function loginListRequest(page, limit) {
  Logger.log('debug', `[logins.actions] loginListRequest(${page}, ${limit})`);
  return {
    type: LOGIN_LIST_REQUEST,
    page: page,
    limit: limit
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

export function loadLogins(page=1, limit=10, cb=function(){}) {
  Logger.log('debug', `[logins.actions] loadLogins(${page}, ${limit}, ###)`);

  return async function(dispatch) {
    dispatch(loginListRequest(page, limit));

    // call API
    const response = await api.getLogins(page, limit);

    // get logins list success
    if (200 === response.get('status')) {

      Logger.log('info', `Get API logins list success. Page: ${page}, Limit: ${limit}.`);

      const normalizedEntities = normalize(response.getIn(['data', 'logins']), [schema.login]);
      const data = {
        page: response.getIn(['data', 'page']),
        limit: response.getIn(['data', 'limit']),
        order: 'attempt_date.desc',
        total: response.getIn(['data', 'total']),
        result: normalizedEntities.result
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(loginListSuccess(data));
      
    // get logins list failure
    } else {
      Logger.log('info', `Get API logins list failure. Page: ${page}, Limit: ${limit}.`);
      dispatch(loginListFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

Logger.log('silly', `logins.actions loaded.`);
