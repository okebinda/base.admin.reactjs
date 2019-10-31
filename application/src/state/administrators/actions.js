import {normalize} from 'normalizr';

import api from '../api';
import {schema} from '../schema';
import {addEntities, removeEntity} from '../actions';
import Logger from '../../lib/Logger';

// ACTION TYPES

export const ADMINISTRATOR_LIST_REQUEST = 'ADMINISTRATOR_LIST_REQUEST';
export const ADMINISTRATOR_LIST_SUCCESS = 'ADMINISTRATOR_LIST_SUCCESS';
export const ADMINISTRATOR_LIST_FAILURE = 'ADMINISTRATOR_LIST_FAILURE';
export const ADMINISTRATOR_READ_REQUEST = 'ADMINISTRATOR_READ_REQUEST';
export const ADMINISTRATOR_READ_SUCCESS = 'ADMINISTRATOR_READ_SUCCESS';
export const ADMINISTRATOR_READ_FAILURE = 'ADMINISTRATOR_READ_FAILURE';
export const ADMINISTRATOR_UPDATE_REQUEST = 'ADMINISTRATOR_UPDATE_REQUEST';
export const ADMINISTRATOR_UPDATE_SUCCESS = 'ADMINISTRATOR_UPDATE_SUCCESS';
export const ADMINISTRATOR_UPDATE_FAILURE = 'ADMINISTRATOR_UPDATE_FAILURE';
export const ADMINISTRATOR_CREATE_REQUEST = 'ADMINISTRATOR_CREATE_REQUEST';
export const ADMINISTRATOR_CREATE_SUCCESS = 'ADMINISTRATOR_CREATE_SUCCESS';
export const ADMINISTRATOR_CREATE_FAILURE = 'ADMINISTRATOR_CREATE_FAILURE';
export const ADMINISTRATOR_DELETE_REQUEST = 'ADMINISTRATOR_DELETE_REQUEST';
export const ADMINISTRATOR_DELETE_SUCCESS = 'ADMINISTRATOR_DELETE_SUCCESS';
export const ADMINISTRATOR_DELETE_FAILURE = 'ADMINISTRATOR_DELETE_FAILURE';
export const ADMINISTRATOR_FORM_DESTROY = 'ADMINISTRATOR_FORM_DESTROY';

// ACTION CREATORS

export function administratorListRequest(page, limit) {
  Logger.log('debug', `[administrators.actions] administratorListRequest(${page}, ${limit})`);
  return {
    type: ADMINISTRATOR_LIST_REQUEST,
    page: page,
    limit: limit,
  }
}

export function administratorListSuccess(data) {
  Logger.log('debug', `[administrators.actions] administratorListSuccess(%j)`, data);
  return {
    type: ADMINISTRATOR_LIST_SUCCESS,
    page: data.page,
    limit: data.limit,
    order: data.order,
    result: data.result,
    total: data.total,
    receivedAt: Date.now()
  }
}

export function administratorListFailure(error) {
  Logger.log('debug', `[administrators.actions] administratorListFailure(%j)`, error);
  return {
    type: ADMINISTRATOR_LIST_FAILURE,
    error: error
  }
}

export function administratorReadRequest(id) {
  Logger.log('debug', `[administrators.actions] administratorReadRequest(${id})`);
  return {
    type: ADMINISTRATOR_READ_REQUEST,
    id: id
  }
}

export function administratorReadSuccess(data) {
  Logger.log('debug', `[administrators.actions] administratorReadSuccess(%j)`, data);
  return {
    type: ADMINISTRATOR_READ_SUCCESS,
    id: data.id,
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    joined_at: data.joined_at,
    roles: data.roles,
    password_changed_at: data.password_changed_at,
    uri: data.uri,
    status: data.status,
    status_changed_at: data.status_changed_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    receivedAt: Date.now()
  }
}

export function administratorReadFailure(error) {
  Logger.log('debug', `[administrators.actions] administratorReadFailure(%j)`, error);
  return {
    type: ADMINISTRATOR_READ_FAILURE,
    error: error
  }
}

export function administratorUpdateRequest(id, data) {
  Logger.log('debug', `[administrators.actions] administratorUpdateRequest(${id}, %j)`, data);
  return {
    type: ADMINISTRATOR_UPDATE_REQUEST,
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    roles: data.roles,
    joined_at: data.joined_at,
    status: data.status
  }
}

export function administratorUpdateSuccess(data) {
  Logger.log('debug', `[administrators.actions] administratorUpdateSuccess(%j)`, data);
  return {
    type: ADMINISTRATOR_UPDATE_SUCCESS,
    id: data.id,
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    joined_at: data.joined_at,
    roles: data.roles,
    password_changed_at: data.password_changed_at,
    uri: data.uri,
    status: data.status,
    status_changed_at: data.status_changed_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    receivedAt: Date.now()
  }
}

export function administratorUpdateFailure(error) {
  Logger.log('debug', `[administrators.actions] administratorUpdateFailure(%j)`, error);
  return {
    type: ADMINISTRATOR_UPDATE_FAILURE,
    error: error
  }
}

export function administratorCreateRequest(data) {
  Logger.log('debug', `[administrators.actions] administratorCreateRequest(%j)`, data);
  return {
    type: ADMINISTRATOR_CREATE_REQUEST,
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    roles: data.roles,
    joined_at: data.joined_at,
    status: data.status
  }
}

export function administratorCreateSuccess(data) {
  Logger.log('debug', `[administrators.actions] administratorCreateSuccess(%j)`, data);
  return {
    type: ADMINISTRATOR_CREATE_SUCCESS,
    id: data.id,
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    joined_at: data.joined_at,
    roles: data.roles,
    password_changed_at: data.password_changed_at,
    uri: data.uri,
    status: data.status,
    status_changed_at: data.status_changed_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    receivedAt: Date.now()
  }
}

export function administratorCreateFailure(error) {
  Logger.log('debug', `[administrators.actions] administratorCreateFailure(%j)`, error);
  return {
    type: ADMINISTRATOR_CREATE_FAILURE,
    error: error
  }
}

export function administratorDeleteRequest(id) {
  Logger.log('debug', `[administrators.actions] administratorDeleteRequest(${id})`);
  return {
    type: ADMINISTRATOR_DELETE_REQUEST,
    id: id
  }
}

export function administratorDeleteSuccess(id) {
  Logger.log('debug', `[administrators.actions] administratorDeleteSuccess(${id})`);
  return {
    type: ADMINISTRATOR_DELETE_SUCCESS,
    id: id,
  }
}

export function administratorDeleteFailure(error) {
  Logger.log('debug', `[administrators.actions] administratorDeleteFailure(%j)`, error);
  return {
    type: ADMINISTRATOR_DELETE_FAILURE,
    error: error
  }
}

export function administratorFormDestroy(formState=null) {
  Logger.log('debug', `[administrators.actions] administratorFormDestroy(%j)`, formState);
  return {
    type: ADMINISTRATOR_FORM_DESTROY,
    form: formState
  }
}


// API THUNK ACTION CREATORS

export function loadAdministrators(page=1, limit=10, cb=function(){}) {
  Logger.log('debug', `[administrators.actions] loadAdministrators(${page}, ${limit}, ###)`);

  return async function(dispatch) {
    dispatch(administratorListRequest(page, limit));

    // call API
    const response = await api.getAdministrators(page, limit);

    // get administrators list success
    if (200 === response.get('status')) {

      Logger.log('info', `Get API administrators list success. Page: ${page}, Limit: ${limit}.`);

      const normalizedEntities = normalize(response.getIn(['data', 'administrators']), [schema.administrator]);
      const data = {
        page: response.getIn(['data', 'page']),
        limit: response.getIn(['data', 'limit']),
        order: 'id.desc',
        total: response.getIn(['data', 'total']),
        result: normalizedEntities.result
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(administratorListSuccess(data));
      
    // get administrators list failure
    } else {
      Logger.log('info', `Get API administrators list failure. Page: ${page}, Limit: ${limit}.`);
      dispatch(administratorListFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function loadAdministrator(id, cb=function(){}) {
  Logger.log('debug', `[administrators.actions] loadAdministrator(${id}, ###)`);

  return async function(dispatch) {
    dispatch(administratorReadRequest(id));

    // call API
    const response = await api.getAdministrator(id);

    // get administrator success
    if (200 === response.get('status')) {

      Logger.log('info', `Get API administrator success. ID: ${id}.`);

      const normalizedEntities = normalize([response.getIn(['data', 'administrator'])], [schema.administrator]);
      const data = {
        id: response.getIn(['data', 'administrator', 'id']),
        username: response.getIn(['data', 'administrator', 'username']),
        email: response.getIn(['data', 'administrator', 'email']),
        first_name: response.getIn(['data', 'administrator', 'profile', 'first_name']),
        last_name: response.getIn(['data', 'administrator', 'profile', 'last_name']),
        roles: response.getIn(['data', 'administrator', 'roles']),
        uri: response.getIn(['data', 'administrator', 'uri']),
        joined_at: response.getIn(['data', 'administrator', 'profile', 'joined_at']),
        password_changed_at: response.getIn(['data', 'administrator', 'password_changed_at']),
        status: response.getIn(['data', 'administrator', 'status']),
        status_changed_at: response.getIn(['data', 'administrator', 'status_changed_at']),
        created_at: response.getIn(['data', 'administrator', 'created_at']),
        updated_at: response.getIn(['data', 'administrator', 'updated_at'])
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(administratorReadSuccess(data));

    // get administrator failure
    } else {
      Logger.log('info', `Get API administrator failure. ID: ${id}.`);
      dispatch(administratorReadFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function updateAdministrator(id, data, cb=function(){}) {
  Logger.log('debug', `[administrators.actions] updateAdministrator(${id}, %j, ###)`, data);

  return async function(dispatch) {
    dispatch(administratorUpdateRequest(id, data));

    // call API
    const response = await api.putAdministrator(id, data);

    // put administrator success
    if (200 === response.get('status')) {

      Logger.log('info', `PUT API administrator success. Administrator: ${id}.`);

      const normalizedEntities = normalize([response.getIn(['data', 'administrator'])], [schema.administrator]);
      const data = {
        id: response.getIn(['data', 'administrator', 'id']),
        username: response.getIn(['data', 'administrator', 'username']),
        email: response.getIn(['data', 'administrator', 'email']),
        first_name: response.getIn(['data', 'administrator', 'first_name']),
        last_name: response.getIn(['data', 'administrator', 'last_name']),
        roles: response.getIn(['data', 'administrator', 'roles']),
        joined_at: response.getIn(['data', 'administrator', 'joined_at']),
        uri: response.getIn(['data', 'administrator', 'uri']),
        password_changed_at: response.getIn(['data', 'administrator', 'password_changed_at']),
        status: response.getIn(['data', 'administrator', 'status']),
        status_changed_at: response.getIn(['data', 'administrator', 'status_changed_at']),
        created_at: response.getIn(['data', 'administrator', 'created_at']),
        updated_at: response.getIn(['data', 'administrator', 'updated_at'])
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(administratorUpdateSuccess(data));
      
    // get administrator failure
    } else {
      Logger.log('info', `PUT API administrator failure. ID: ${id}.`);
      dispatch(administratorUpdateFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function createAdministrator(data, cb=function(){}) {
  Logger.log('debug', `[administrators.actions] createAdministrator(%j, ###)`, data);

  return async function(dispatch) {
    dispatch(administratorCreateRequest(data));

    // call API
    const response = await api.postAdministrators(data);

    // post administrator success
    if (201 === response.get('status')) {

      Logger.log('info', `POST API administrator success. Administrator: ${response.getIn(['data', 'administrator', 'id'])}.`);

      const normalizedEntities = normalize([response.getIn(['data', 'administrator'])], [schema.administrator]);
      const data = {
        id: response.getIn(['data', 'administrator', 'id']),
        username: response.getIn(['data', 'administrator', 'username']),
        email: response.getIn(['data', 'administrator', 'email']),
        first_name: response.getIn(['data', 'administrator', 'first_name']),
        last_name: response.getIn(['data', 'administrator', 'last_name']),
        roles: response.getIn(['data', 'administrator', 'roles']),
        joined_at: response.getIn(['data', 'administrator', 'joined_at']),
        uri: response.getIn(['data', 'administrator', 'uri']),
        password_changed_at: response.getIn(['data', 'administrator', 'password_changed_at']),
        status: response.getIn(['data', 'administrator', 'status']),
        status_changed_at: response.getIn(['data', 'administrator', 'status_changed_at']),
        created_at: response.getIn(['data', 'administrator', 'created_at']),
        updated_at: response.getIn(['data', 'administrator', 'updated_at'])
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(administratorCreateSuccess(data));
      
    // get administrator failure
    } else {
      Logger.log('info', `POST API administrator failure.`);
      dispatch(administratorCreateFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function deleteAdministrator(id, cb=function(){}) {
  Logger.log('debug', `[administrators.actions] deleteAdministrator(${id}, ###)`);

  return async function(dispatch) {
    dispatch(administratorDeleteRequest(id));

    // call API
    const response = await api.deleteAdministrator(id);
    let success = false;

    // delete administrator success
    if (204 === response.get('status')) {

      Logger.log('info', `DELETE API administrator success. Administrator: ${id}.`);

      dispatch(removeEntity({entityType: 'administrators', id: id}));
      dispatch(administratorDeleteSuccess(id));
      success = true;
      
    // get administrator failure
    } else {
      Logger.log('info', `DELETE API administrator failure. ID: ${id}.`);
      dispatch(administratorDeleteFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb(success);
  }
}

Logger.log('silly', `administrators.actions loaded.`);
