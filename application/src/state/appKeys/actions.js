import {normalize} from 'normalizr';

import api from '../api';
import {schema} from '../schema';
import {addEntities, removeEntity} from '../actions';
import Logger from '../../lib/Logger';

// ACTION TYPES

export const APP_KEY_LIST_REQUEST = 'APP_KEY_LIST_REQUEST';
export const APP_KEY_LIST_SUCCESS = 'APP_KEY_LIST_SUCCESS';
export const APP_KEY_LIST_FAILURE = 'APP_KEY_LIST_FAILURE';
export const APP_KEY_READ_REQUEST = 'APP_KEY_READ_REQUEST';
export const APP_KEY_READ_SUCCESS = 'APP_KEY_READ_SUCCESS';
export const APP_KEY_READ_FAILURE = 'APP_KEY_READ_FAILURE';
export const APP_KEY_UPDATE_REQUEST = 'APP_KEY_UPDATE_REQUEST';
export const APP_KEY_UPDATE_SUCCESS = 'APP_KEY_UPDATE_SUCCESS';
export const APP_KEY_UPDATE_FAILURE = 'APP_KEY_UPDATE_FAILURE';
export const APP_KEY_CREATE_REQUEST = 'APP_KEY_CREATE_REQUEST';
export const APP_KEY_CREATE_SUCCESS = 'APP_KEY_CREATE_SUCCESS';
export const APP_KEY_CREATE_FAILURE = 'APP_KEY_CREATE_FAILURE';
export const APP_KEY_DELETE_REQUEST = 'APP_KEY_DELETE_REQUEST';
export const APP_KEY_DELETE_SUCCESS = 'APP_KEY_DELETE_SUCCESS';
export const APP_KEY_DELETE_FAILURE = 'APP_KEY_DELETE_FAILURE';
export const APP_KEY_FORM_DESTROY = 'APP_KEY_FORM_DESTROY';

// ACTION CREATORS

export function appKeyListRequest(page, limit) {
  Logger.log('debug', `[appKeys.actions] appKeyListRequest(${page}, ${limit})`);
  return {
    type: APP_KEY_LIST_REQUEST,
    page: page,
    limit: limit
  }
}

export function appKeyListSuccess(data) {
  Logger.log('debug', `[appKeys.actions] appKeyListSuccess(%j)`, data);
  return {
    type: APP_KEY_LIST_SUCCESS,
    page: data.page,
    limit: data.limit,
    order: data.order,
    result: data.result,
    total: data.total,
    receivedAt: Date.now()
  }
}

export function appKeyListFailure(error) {
  Logger.log('debug', `[appKeys.actions] appKeyListFailure(%j)`, error);
  return {
    type: APP_KEY_LIST_FAILURE,
    error: error
  }
}

export function appKeyReadRequest(id) {
  Logger.log('debug', `[appKeys.actions] appKeyReadRequest(${id})`);
  return {
    type: APP_KEY_READ_REQUEST,
    id: id
  }
}

export function appKeyReadSuccess(data) {
  Logger.log('debug', `[appKeys.actions] appKeyReadSuccess(%j)`, data);
  return {
    type: APP_KEY_READ_SUCCESS,
    id: data.id,
    application: data.application,
    key: data.key,
    status: data.status,
    status_changed_at: data.status_changed_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    receivedAt: Date.now()
  }
}

export function appKeyReadFailure(error) {
  Logger.log('debug', `[appKeys.actions] appKeyReadFailure(%j)`, error);
  return {
    type: APP_KEY_READ_FAILURE,
    error: error
  }
}

export function appKeyUpdateRequest(id, data) {
  Logger.log('debug', `[appKeys.actions] appKeyUpdateRequest(${id}, %j)`, data);
  return {
    type: APP_KEY_UPDATE_REQUEST,
    application: data.application,
    key: data.key,
    status: data.status
  }
}

export function appKeyUpdateSuccess(data) {
  Logger.log('debug', `[appKeys.actions] appKeyUpdateSuccess(%j)`, data);
  return {
    type: APP_KEY_UPDATE_SUCCESS,
    id: data.id,
    application: data.application,
    key: data.key,
    status: data.status,
    status_changed_at: data.status_changed_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    receivedAt: Date.now()
  }
}

export function appKeyUpdateFailure(error) {
  Logger.log('debug', `[appKeys.actions] appKeyUpdateFailure(%j)`, error);
  return {
    type: APP_KEY_UPDATE_FAILURE,
    error: error
  }
}

export function appKeyCreateRequest(data) {
  Logger.log('debug', `[appKeys.actions] appKeyCreateRequest(%j)`, data);
  return {
    type: APP_KEY_CREATE_REQUEST,
    application: data.application,
    key: data.key,
    status: data.status
  }
}

export function appKeyCreateSuccess(data) {
  Logger.log('debug', `[appKeys.actions] appKeyCreateSuccess(%j)`, data);
  return {
    type: APP_KEY_CREATE_SUCCESS,
    id: data.id,
    application: data.application,
    key: data.key,
    status: data.status,
    status_changed_at: data.status_changed_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    receivedAt: Date.now()
  }
}

export function appKeyCreateFailure(error) {
  Logger.log('debug', `[appKeys.actions] appKeyCreateFailure(%j)`, error);
  return {
    type: APP_KEY_CREATE_FAILURE,
    error: error
  }
}

export function appKeyDeleteRequest(id) {
  Logger.log('debug', `[appKeys.actions] appKeyDeleteRequest(${id})`);
  return {
    type: APP_KEY_DELETE_REQUEST,
    id: id
  }
}

export function appKeyDeleteSuccess(id) {
  Logger.log('debug', `[appKeys.actions] appKeyDeleteSuccess(${id})`);
  return {
    type: APP_KEY_DELETE_SUCCESS,
    id: id,
  }
}

export function appKeyDeleteFailure(error) {
  Logger.log('debug', `[appKeys.actions] appKeyDeleteFailure(%j)`, error);
  return {
    type: APP_KEY_DELETE_FAILURE,
    error: error
  }
}

export function appKeyFormDestroy(formState=null) {
  Logger.log('debug', `[appKeys.actions] appKeyFormDestroy(%j)`, formState);
  return {
    type: APP_KEY_FORM_DESTROY,
    form: formState
  }
}


// API THUNK ACTION CREATORS

export function loadAppKeys(page=1, limit=10, cb=function(){}) {
  Logger.log('debug', `[appKeys.actions] loadAppKeys(${page}, ${limit}, ###)`);

  return async function(dispatch) {
    dispatch(appKeyListRequest(page, limit));

    // call API
    const response = await api.getAppKeys(page, limit);

    // get app keys list success
    if (200 === response.get('status')) {

      Logger.log('info', `Get API app keys list success. Page: ${page}, Limit: ${limit}.`);

      const normalizedEntities = normalize(response.getIn(['data', 'app_keys']), [schema.app_key]);
      const data = {
        page: response.getIn(['data', 'page']),
        limit: response.getIn(['data', 'limit']),
        order: 'id.asc',
        total: response.getIn(['data', 'total']),
        result: normalizedEntities.result
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(appKeyListSuccess(data));
      
    // get app keys list failure
    } else {
      Logger.log('info', `Get API app keys list failure. Page: ${page}, Limit: ${limit}.`);
      dispatch(appKeyListFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function loadAppKey(id, cb=function(){}) {
  Logger.log('debug', `[appKeys.actions] loadAppKey(${id}, ###)`);

  return async function(dispatch) {
    dispatch(appKeyReadRequest(id));

    // call API
    const response = await api.getAppKey(id);

    // get app key success
    if (200 === response.get('status')) {

      Logger.log('info', `Get API app key success. ID: ${id}.`);

      const normalizedEntities = normalize([response.getIn(['data', 'app_key'])], [schema.app_key]);
      const data = {
        id: response.getIn(['data', 'app_key', 'id']),
        application: response.getIn(['data', 'app_key', 'application']),
        key: response.getIn(['data', 'app_key', 'key']),
        status: response.getIn(['data', 'app_key', 'status']),
        status_changed_at: response.getIn(['data', 'app_key', 'status_changed_at']),
        created_at: response.getIn(['data', 'app_key', 'created_at']),
        updated_at: response.getIn(['data', 'app_key', 'updated_at'])
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(appKeyReadSuccess(data));
      
    // get app key failure
    } else {
      Logger.log('info', `Get API app key failure. ID: ${id}.`);
      dispatch(appKeyReadFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function updateAppKey(id, data, cb=function(){}) {
  Logger.log('debug', `[appKeys.actions] updateAppKey(${id}, %j, ###)`, data);

  return async function(dispatch) {
    dispatch(appKeyUpdateRequest(id, data));

    // call API
    const response = await api.putAppKey(id, data);

    // put app key success
    if (200 === response.get('status')) {

      Logger.log('info', `PUT API app key success. User: ${id}.`);

      const normalizedEntities = normalize([response.getIn(['data', 'app_key'])], [schema.app_key]);
      const data = {
        id: response.getIn(['data', 'app_key', 'id']),
        application: response.getIn(['data', 'app_key', 'application']),
        key: response.getIn(['data', 'app_key', 'key']),
        status: response.getIn(['data', 'app_key', 'status']),
        status_changed_at: response.getIn(['data', 'app_key', 'status_changed_at']),
        created_at: response.getIn(['data', 'app_key', 'created_at']),
        updated_at: response.getIn(['data', 'app_key', 'updated_at'])
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(appKeyUpdateSuccess(data));
      
    // get app key failure
    } else {
      Logger.log('info', `PUT API app key failure. ID: ${id}.`);
      dispatch(appKeyUpdateFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function createAppKey(data, cb=function(){}) {
  Logger.log('debug', `[appKeys.actions] createAppKey(%j, ###)`, data);

  return async function(dispatch) {
    dispatch(appKeyCreateRequest(data));

    // call API
    const response = await api.postAppKeys(data);

    // post app keys success
    if (201 === response.get('status')) {

      Logger.log('info', `POST API app keys success. Post: ${response.getIn(['data', 'app_key', 'id'])}.`);

      const normalizedEntities = normalize([response.getIn(['data', 'app_key'])], [schema.app_key]);
      const data = {
        id: response.getIn(['data', 'app_key', 'id']),
        application: response.getIn(['data', 'app_key', 'application']),
        key: response.getIn(['data', 'app_key', 'key']),
        status: response.getIn(['data', 'app_key', 'status']),
        status_changed_at: response.getIn(['data', 'app_key', 'status_changed_at']),
        created_at: response.getIn(['data', 'app_key', 'created_at']),
        updated_at: response.getIn(['data', 'app_key', 'updated_at'])
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(appKeyCreateSuccess(data));
      
    // get app keys failure
    } else {
      Logger.log('info', `POST API app keys failure.`);
      dispatch(appKeyCreateFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function deleteAppKey(id, cb=function(){}) {
  Logger.log('debug', `[appKeys.actions] deleteAppKey(${id}, ###)`);

  return async function(dispatch) {
    dispatch(appKeyDeleteRequest(id));

    // call API
    const response = await api.deleteAppKey(id);
    let success = false;

    // delete app key success
    if (204 === response.get('status')) {

      Logger.log('info', `DELETE API app key success. ID: ${id}.`);

      dispatch(removeEntity({entityType: 'app_keys', id: id}));
      dispatch(appKeyDeleteSuccess(id));
      success = true;
      
    // get app key failure
    } else {
      Logger.log('info', `DELETE API app key failure. ID: ${id}.`);
      dispatch(appKeyDeleteFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb(success);
  }
}

Logger.log('silly', `appKeys.actions loaded.`);
