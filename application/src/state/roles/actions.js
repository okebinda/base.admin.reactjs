import {normalize} from 'normalizr';

import api from '../api';
import {schema} from '../schema';
import {addEntities} from '../actions';
import Logger from '../../lib/Logger';

export const ROLE_LIST_REQUEST = 'ROLE_LIST_REQUEST';
export const ROLE_LIST_SUCCESS = 'ROLE_LIST_SUCCESS';
export const ROLE_LIST_FAILURE = 'ROLE_LIST_FAILURE';

export function roleListRequest(page, limit) {
  Logger.log('debug', `[roles.actions] roleListRequest(${page}, ${limit})`);
  return {
    type: ROLE_LIST_REQUEST,
    page: page,
    limit: limit,
  }
}

export function roleListSuccess(data) {
  Logger.log('debug', `[roles.actions] roleListSuccess(%j)`, data);
  return {
    type: ROLE_LIST_SUCCESS,
    page: data.page,
    limit: data.limit,
    order: data.order,
    result: data.result,
    total: data.total,
    receivedAt: Date.now()
  }
}

export function roleListFailure(error) {
  Logger.log('debug', `[roles.actions] roleListFailure(%j)`, error);
  return {
    type: ROLE_LIST_FAILURE,
    error: error
  }
}

// API THUNK ACTION CREATORS

export function loadRoles(page=1, limit=10, type=null, cb=function(){}) {
  Logger.log('debug', `[roles.actions] loadRoles(${page}, ${limit}, ###)`);

  return async function(dispatch) {
    dispatch(roleListRequest(page, limit));

    // call API
    const response = await api.getRoles(page, limit, type);

    // get roles list success
    if (200 === response.get('status')) {

      Logger.log('info', `Get API roles list success. Page: ${page}, Limit: ${limit}.`);

      const normalizedEntities = normalize(response.getIn(['data', 'roles']), [schema.role]);
      const data = {
        page: response.getIn(['data', 'page']),
        limit: response.getIn(['data', 'limit']),
        order: 'name.asc',
        total: response.getIn(['data', 'total']),
        result: normalizedEntities.result
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(roleListSuccess(data));
      
    // get roles list failure
    } else {
      Logger.log('info', `Get API roles list failure. Page: ${page}, Limit: ${limit}.`);
      dispatch(roleListFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

Logger.log('silly', `roles.actions loaded.`);
