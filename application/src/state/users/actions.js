import {normalize} from 'normalizr';

import api from '../api';
import {schema} from '../schema';
import {addEntities, removeEntity} from '../actions';
import Logger from '../../lib/Logger';

// ACTION TYPES

export const USER_LIST_REQUEST = 'USER_LIST_REQUEST';
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS';
export const USER_LIST_FAILURE = 'USER_LIST_FAILURE';
export const USER_READ_REQUEST = 'USER_READ_REQUEST';
export const USER_READ_SUCCESS = 'USER_READ_SUCCESS';
export const USER_READ_FAILURE = 'USER_READ_FAILURE';
export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE';
export const USER_CREATE_REQUEST = 'USER_CREATE_REQUEST';
export const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS';
export const USER_CREATE_FAILURE = 'USER_CREATE_FAILURE';
export const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST';
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS';
export const USER_DELETE_FAILURE = 'USER_DELETE_FAILURE';
export const USER_FORM_DESTROY = 'USER_FORM_DESTROY';

// ACTION CREATORS

export function userListRequest(page, limit) {
  Logger.log('debug', `[users.actions] userListRequest(${page}, ${limit})`);
  return {
    type: USER_LIST_REQUEST,
    page: page,
    limit: limit,
  }
}

export function userListSuccess(data) {
  Logger.log('debug', `[users.actions] userListSuccess(%j)`, data);
  return {
    type: USER_LIST_SUCCESS,
    page: data.page,
    limit: data.limit,
    order: data.order,
    result: data.result,
    total: data.total,
    receivedAt: Date.now()
  }
}

export function userListFailure(error) {
  Logger.log('debug', `[users.actions] userListFailure(%j)`, error);
  return {
    type: USER_LIST_FAILURE,
    error: error
  }
}

export function userReadRequest(id) {
  Logger.log('debug', `[users.actions] userReadRequest(${id})`);
  return {
    type: USER_READ_REQUEST,
    id: id
  }
}

export function userReadSuccess(data) {
  Logger.log('debug', `[users.actions] userReadSuccess(%j)`, data);
  return {
    type: USER_READ_SUCCESS,
    id: data.id,
    username: data.username,
    email: data.email,
    roles: data.roles,
    is_verified: data.is_verified,
    terms_of_services: data.terms_of_services,
    first_name: data.first_name,
    last_name: data.last_name,
    joined_at: data.joined_at,
    uri: data.uri,
    password_changed_at: data.password_changed_at,
    status: data.status,
    status_changed_at: data.status_changed_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    receivedAt: Date.now()
  }
}

export function userReadFailure(error) {
  Logger.log('debug', `[users.actions] userReadFailure(%j)`, error);
  return {
    type: USER_READ_FAILURE,
    error: error
  }
}

export function userUpdateRequest(id, data) {
  Logger.log('debug', `[users.actions] userUpdateRequest(${id}, %j)`, data);
  return {
    type: USER_UPDATE_REQUEST,
    username: data.username,
    email: data.email,
    roles: data.roles,
    is_verified: data.is_verified,
    terms_of_services: data.terms_of_services,
    first_name: data.first_name,
    last_name: data.last_name,
    joined_at: data.joined_at,
    status: data.status
  }
}

export function userUpdateSuccess(data) {
  Logger.log('debug', `[users.actions] userUpdateSuccess(%j)`, data);
  return {
    type: USER_UPDATE_SUCCESS,
    id: data.id,
    username: data.username,
    email: data.email,
    roles: data.roles,
    is_verified: data.is_verified,
    terms_of_services: data.terms_of_services,
    first_name: data.first_name,
    last_name: data.last_name,
    joined_at: data.joined_at,
    uri: data.uri,
    password_changed_at: data.password_changed_at,
    status: data.status,
    status_changed_at: data.status_changed_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    receivedAt: Date.now()
  }
}

export function userUpdateFailure(error) {
  Logger.log('debug', `[users.actions] userUpdateFailure(%j)`, error);
  return {
    type: USER_UPDATE_FAILURE,
    error: error
  }
}

export function userCreateRequest(data) {
  Logger.log('debug', `[users.actions] userCreateRequest(%j)`, data);
  return {
    type: USER_CREATE_REQUEST,
    username: data.username,
    email: data.email,
    roles: data.roles,
    is_verified: data.is_verified,
    terms_of_services: data.terms_of_services,
    first_name: data.first_name,
    last_name: data.last_name,
    joined_at: data.joined_at,
    status: data.status
  }
}

export function userCreateSuccess(data) {
  Logger.log('debug', `[users.actions] userCreateSuccess(%j)`, data);
  return {
    type: USER_CREATE_SUCCESS,
    id: data.id,
    username: data.username,
    email: data.email,
    roles: data.roles,
    is_verified: data.is_verified,
    terms_of_services: data.terms_of_services,
    first_name: data.first_name,
    last_name: data.last_name,
    joined_at: data.joined_at,
    uri: data.uri,
    password_changed_at: data.password_changed_at,
    status: data.status,
    status_changed_at: data.status_changed_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    receivedAt: Date.now()
  }
}

export function userCreateFailure(error) {
  Logger.log('debug', `[users.actions] userCreateFailure(%j)`, error);
  return {
    type: USER_CREATE_FAILURE,
    error: error
  }
}

export function userDeleteRequest(id) {
  Logger.log('debug', `[users.actions] userDeleteRequest(${id})`);
  return {
    type: USER_DELETE_REQUEST,
    id: id
  }
}

export function userDeleteSuccess(id) {
  Logger.log('debug', `[users.actions] userDeleteSuccess(${id})`);
  return {
    type: USER_DELETE_SUCCESS,
    id: id,
  }
}

export function userDeleteFailure(error) {
  Logger.log('debug', `[users.actions] userDeleteFailure(%j)`, error);
  return {
    type: USER_DELETE_FAILURE,
    error: error
  }
}

export function userFormDestroy(formState=null) {
  Logger.log('debug', `[users.actions] userFormDestroy(%j)`, formState);
  return {
    type: USER_FORM_DESTROY,
    form: formState
  }
}


// API THUNK ACTION CREATORS

// flatten user object for easier sub-entity normalization
function flattenUser(user) {
  const userProfile = user.profile || {};
  delete user.profile;
  return {...user, ...userProfile};
}

export function loadUsers(page=1, limit=10, cb=function(){}) {
  Logger.log('debug', `[users.actions] loadUsers(${page}, ${limit}, ###)`);

  return async function(dispatch) {
    dispatch(userListRequest(page, limit));

    // call API
    const response = await api.getUsers(page, limit);

    // get users list success
    if (200 === response.get('status')) {

      Logger.log('info', `Get API users list success. Page: ${page}, Limit: ${limit}.`);

      const users = response.getIn(['data', 'users']).map(x => flattenUser(x));
      const normalizedEntities = normalize(users, [schema.user]);

      const data = {
        page: response.getIn(['data', 'page']),
        limit: response.getIn(['data', 'limit']),
        order: 'id.desc',
        total: response.getIn(['data', 'total']),
        result: normalizedEntities.result
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(userListSuccess(data));
      
    // get users list failure
    } else {
      Logger.log('info', `Get API users list failure. Page: ${page}, Limit: ${limit}.`);
      dispatch(userListFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function loadUser(id, cb=function(){}) {
  Logger.log('debug', `[users.actions] loadUser(${id}, ###)`);

  return async function(dispatch) {
    dispatch(userReadRequest(id));

    // call API
    const response = await api.getUser(id);

    // get user success
    if (200 === response.get('status')) {

      Logger.log('info', `Get API user success. ID: ${id}.`);

      const user = flattenUser(response.getIn(['data', 'user']));
      const normalizedEntities = normalize([user], [schema.user]);

      const data = {
        id: response.getIn(['data', 'user', 'id']),
        username: response.getIn(['data', 'user', 'username']),
        email: response.getIn(['data', 'user', 'email']),
        roles: response.getIn(['data', 'user', 'roles']),
        is_verified: response.getIn(['data', 'user', 'is_verified']),
        terms_of_services: response.getIn(['data', 'user', 'terms_of_services']),
        uri: response.getIn(['data', 'user', 'uri']),
        first_name: response.getIn(['data', 'user', 'profile', 'first_name']),
        last_name: response.getIn(['data', 'user', 'profile', 'last_name']),
        joined_at: response.getIn(['data', 'user', 'profile', 'joined_at']),
        password_changed_at: response.getIn(['data', 'user', 'password_changed_at']),
        status: response.getIn(['data', 'user', 'status']),
        status_changed_at: response.getIn(['data', 'user', 'status_changed_at']),
        created_at: response.getIn(['data', 'user', 'created_at']),
        updated_at: response.getIn(['data', 'user', 'updated_at'])
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(userReadSuccess(data));
      
    // get user failure
    } else {
      Logger.log('info', `Get API user failure. ID: ${id}.`);
      dispatch(userReadFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function updateUser(id, data, cb=function(){}) {
  Logger.log('debug', `[users.actions] updateUser(${id}, %j, ###)`, data);

  return async function(dispatch) {
    dispatch(userUpdateRequest(id, data));

    // call API
    const response = await api.putUser(id, data);

    // put user success
    if (200 === response.get('status')) {

      Logger.log('info', `PUT API user success. User: ${id}.`);

      const user = flattenUser(response.getIn(['data', 'user']));
      const normalizedEntities = normalize([user], [schema.user]);

      const data = {
        id: response.getIn(['data', 'user', 'id']),
        email: response.getIn(['data', 'user', 'email']),
        username: response.getIn(['data', 'user', 'username']),
        roles: response.getIn(['data', 'user', 'roles']),
        is_verified: response.getIn(['data', 'user', 'is_verified']),
        terms_of_services: response.getIn(['data', 'user', 'terms_of_services']),
        first_name: response.getIn(['data', 'user', 'profile', 'first_name']),
        last_name: response.getIn(['data', 'user', 'profile', 'last_name']),
        joined_at: response.getIn(['data', 'user', 'profile', 'joined_at']),
        uri: response.getIn(['data', 'user', 'uri']),
        password_changed_at: response.getIn(['data', 'user', 'password_changed_at']),
        status: response.getIn(['data', 'user', 'status']),
        status_changed_at: response.getIn(['data', 'user', 'status_changed_at']),
        created_at: response.getIn(['data', 'user', 'created_at']),
        updated_at: response.getIn(['data', 'user', 'updated_at'])
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(userUpdateSuccess(data));
      
    // get user failure
    } else {
      Logger.log('info', `PUT API user failure. ID: ${id}.`);
      dispatch(userUpdateFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function createUser(data, cb=function(){}) {
  Logger.log('debug', `[users.actions] createUser(%j, ###)`, data);

  return async function(dispatch) {
    dispatch(userCreateRequest(data));

    // call API
    const response = await api.postUsers(data);

    // post user success
    if (201 === response.get('status')) {

      Logger.log('info', `POST API user success. User: ${response.getIn(['data', 'user', 'id'])}.`);

      const user = flattenUser(response.getIn(['data', 'user']));
      const normalizedEntities = normalize([user], [schema.user]);

      const data = {
        id: response.getIn(['data', 'user', 'id']),
        username: response.getIn(['data', 'user', 'username']),
        email: response.getIn(['data', 'user', 'email']),
        roles: response.getIn(['data', 'user', 'roles']),
        is_verified: response.getIn(['data', 'user', 'is_verified']),
        terms_of_services: response.getIn(['data', 'user', 'terms_of_services']),
        first_name: response.getIn(['data', 'user', 'profile', 'first_name']),
        last_name: response.getIn(['data', 'user', 'profile', 'last_name']),
        joined_at: response.getIn(['data', 'user', 'profile', 'joined_at']),
        uri: response.getIn(['data', 'user', 'uri']),
        password_changed_at: response.getIn(['data', 'user', 'password_changed_at']),
        status: response.getIn(['data', 'user', 'status']),
        status_changed_at: response.getIn(['data', 'user', 'status_changed_at']),
        created_at: response.getIn(['data', 'user', 'created_at']),
        updated_at: response.getIn(['data', 'user', 'updated_at'])
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(userCreateSuccess(data));
      
    // get user failure
    } else {
      Logger.log('info', `POST API user failure.`);
      dispatch(userCreateFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function deleteUser(id, cb=function(){}) {
  Logger.log('debug', `[users.actions] deleteUser(${id}, ###)`);

  return async function(dispatch) {
    dispatch(userDeleteRequest(id));

    // call API
    const response = await api.deleteUser(id);

    // delete user success
    if (204 === response.get('status')) {

      Logger.log('info', `DELETE API user success. User: ${id}.`);

      dispatch(removeEntity({entityType: 'users', id: id}));
      dispatch(userDeleteSuccess(id));
      
    // get user failure
    } else {
      Logger.log('info', `DELETE API user failure. ID: ${id}.`);
      dispatch(userDeleteFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

Logger.log('silly', `users.actions loaded.`);
