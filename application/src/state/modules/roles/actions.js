import {normalize} from 'normalizr';

import api from '../../api';
import {schema} from '../../schema';
import {addEntities, removeEntity} from '../../actions';
import Logger from '../../../lib/Logger';

export const ROLE_LIST_REQUEST = 'ROLE_LIST_REQUEST';
export const ROLE_LIST_SUCCESS = 'ROLE_LIST_SUCCESS';
export const ROLE_LIST_FAILURE = 'ROLE_LIST_FAILURE';
export const ROLE_READ_REQUEST = 'ROLE_READ_REQUEST';
export const ROLE_READ_SUCCESS = 'ROLE_READ_SUCCESS';
export const ROLE_READ_FAILURE = 'ROLE_READ_FAILURE';
export const ROLE_UPDATE_REQUEST = 'ROLE_UPDATE_REQUEST';
export const ROLE_UPDATE_SUCCESS = 'ROLE_UPDATE_SUCCESS';
export const ROLE_UPDATE_FAILURE = 'ROLE_UPDATE_FAILURE';
export const ROLE_CREATE_REQUEST = 'ROLE_CREATE_REQUEST';
export const ROLE_CREATE_SUCCESS = 'ROLE_CREATE_SUCCESS';
export const ROLE_CREATE_FAILURE = 'ROLE_CREATE_FAILURE';
export const ROLE_DELETE_REQUEST = 'ROLE_DELETE_REQUEST';
export const ROLE_DELETE_SUCCESS = 'ROLE_DELETE_SUCCESS';
export const ROLE_DELETE_FAILURE = 'ROLE_DELETE_FAILURE';
export const ROLE_FORM_DESTROY = 'ROLE_FORM_DESTROY';

export function roleListRequest(page, limit, order, type) {
  Logger.log('debug', `[roles.actions] roleListRequest(${page}, ${limit}, ${order}, ${type})`);
  return {
    type: ROLE_LIST_REQUEST,
    page: page,
    limit: limit,
    roleType: type,
    order: order,
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

export function roleReadRequest(id) {
  Logger.log('debug', `[roles.actions] roleReadRequest(${id})`);
  return {
    type: ROLE_READ_REQUEST,
    id: id
  }
}

export function roleReadSuccess(data) {
  Logger.log('debug', `[roles.actions] roleReadSuccess(%j)`, data);
  return {
    type: ROLE_READ_SUCCESS,
    id: data.id,
    name: data.name,
    login_lockout_policy: data.login_lockout_policy,
    login_max_attempts: data.login_max_attempts,
    login_timeframe: data.login_timeframe,
    login_ban_time: data.login_ban_time,
    login_ban_by_ip: data.login_ban_by_ip,
    password_policy: data.password_policy,
    password_reuse_history: data.password_reuse_history,
    password_reset_days: data.password_reset_days,
    is_admin_role: data.is_admin_role,
    priority: data.priority,
    created_at: data.created_at,
    updated_at: data.updated_at,
    receivedAt: Date.now()
  }
}

export function roleReadFailure(error) {
  Logger.log('debug', `[roles.actions] roleReadFailure(%j)`, error);
  return {
    type: ROLE_READ_FAILURE,
    error: error
  }
}

export function roleUpdateRequest(id, data) {
  Logger.log('debug', `[roles.actions] roleUpdateRequest(${id}, %j)`, data);
  return {
    type: ROLE_UPDATE_REQUEST,
    name: data.name,
    login_lockout_policy: data.login_lockout_policy,
    login_max_attempts: data.login_max_attempts,
    login_timeframe: data.login_timeframe,
    login_ban_time: data.login_ban_time,
    login_ban_by_ip: data.login_ban_by_ip,
    password_policy: data.password_policy,
    password_reuse_history: data.password_reuse_history,
    password_reset_days: data.password_reset_days,
    is_admin_role: data.is_admin_role,
    priority: data.priority
  }
}

export function roleUpdateSuccess(data) {
  Logger.log('debug', `[roles.actions] roleUpdateSuccess(%j)`, data);
  return {
    type: ROLE_UPDATE_SUCCESS,
    id: data.id,
    name: data.name,
    login_lockout_policy: data.login_lockout_policy,
    login_max_attempts: data.login_max_attempts,
    login_timeframe: data.login_timeframe,
    login_ban_time: data.login_ban_time,
    login_ban_by_ip: data.login_ban_by_ip,
    password_policy: data.password_policy,
    password_reuse_history: data.password_reuse_history,
    password_reset_days: data.password_reset_days,
    is_admin_role: data.is_admin_role,
    priority: data.priority,
    created_at: data.created_at,
    updated_at: data.updated_at,
    receivedAt: Date.now()
  }
}

export function roleUpdateFailure(error) {
  Logger.log('debug', `[roles.actions] roleUpdateFailure(%j)`, error);
  return {
    type: ROLE_UPDATE_FAILURE,
    error: error
  }
}

export function roleCreateRequest(data) {
  Logger.log('debug', `[roles.actions] roleCreateRequest(%j)`, data);
  return {
    type: ROLE_CREATE_REQUEST,
    name: data.name,
    login_lockout_policy: data.login_lockout_policy,
    login_max_attempts: data.login_max_attempts,
    login_timeframe: data.login_timeframe,
    login_ban_time: data.login_ban_time,
    login_ban_by_ip: data.login_ban_by_ip,
    password_policy: data.password_policy,
    password_reuse_history: data.password_reuse_history,
    password_reset_days: data.password_reset_days,
    is_admin_role: data.is_admin_role,
    priority: data.priority
  }
}

export function roleCreateSuccess(data) {
  Logger.log('debug', `[roles.actions] roleCreateSuccess(%j)`, data);
  return {
    type: ROLE_CREATE_SUCCESS,
    id: data.id,
    name: data.name,
    login_lockout_policy: data.login_lockout_policy,
    login_max_attempts: data.login_max_attempts,
    login_timeframe: data.login_timeframe,
    login_ban_time: data.login_ban_time,
    login_ban_by_ip: data.login_ban_by_ip,
    password_policy: data.password_policy,
    password_reuse_history: data.password_reuse_history,
    password_reset_days: data.password_reset_days,
    is_admin_role: data.is_admin_role,
    priority: data.priority,
    created_at: data.created_at,
    updated_at: data.updated_at,
    receivedAt: Date.now()
  }
}

export function roleCreateFailure(error) {
  Logger.log('debug', `[roles.actions] roleCreateFailure(%j)`, error);
  return {
    type: ROLE_CREATE_FAILURE,
    error: error
  }
}

export function roleDeleteRequest(id) {
  Logger.log('debug', `[roles.actions] roleDeleteRequest(${id})`);
  return {
    type: ROLE_DELETE_REQUEST,
    id: id
  }
}

export function roleDeleteSuccess(id) {
  Logger.log('debug', `[roles.actions] roleDeleteSuccess(${id})`);
  return {
    type: ROLE_DELETE_SUCCESS,
    id: id,
  }
}

export function roleDeleteFailure(error) {
  Logger.log('debug', `[roles.actions] roleDeleteFailure(%j)`, error);
  return {
    type: ROLE_DELETE_FAILURE,
    error: error
  }
}

export function roleFormDestroy(formState=null) {
  Logger.log('debug', `[roles.actions] roleFormDestroy(%j)`, formState);
  return {
    type: ROLE_FORM_DESTROY,
    form: formState
  }
}

// API THUNK ACTION CREATORS

export function loadRoles(page=1, limit=10, order=null, type=null, cb=function(){}) {
  Logger.log('debug', `[roles.actions] loadRoles(${page}, ${limit}, ${type}, ${order}, ###)`);

  return async function(dispatch) {
    dispatch(roleListRequest(page, limit, order, type));

    // call API
    const response = await api.getRoles(page, limit, order, type);

    // get roles list success
    if (200 === response.get('status')) {

      Logger.log('info', `Get API roles list success. Page: ${page}, Limit: ${limit}, Order: ${order}, Type: ${type}.`);

      const normalizedEntities = normalize(response.getIn(['data', 'roles']), [schema.role]);
      const data = {
        page: response.getIn(['data', 'page']),
        limit: response.getIn(['data', 'limit']),
        order: order,
        total: response.getIn(['data', 'total']),
        result: normalizedEntities.result
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(roleListSuccess(data));
      
    // get roles list failure
    } else {
      Logger.log('info', `Get API roles list failure. Page: ${page}, Limit: ${limit}, Order: ${order}, Type: ${type}.`);
      dispatch(roleListFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function loadRole(id, cb=function(){}) {
  Logger.log('debug', `[roles.actions] loadRole(${id}, ###)`);

  return async function(dispatch) {
    dispatch(roleReadRequest(id));

    // call API
    const response = await api.getRole(id);

    // get role success
    if (200 === response.get('status')) {

      Logger.log('info', `Get API role success. ID: ${id}.`);

      const normalizedEntities = normalize([response.getIn(['data', 'role'])], [schema.role]);
      const data = {
        id: response.getIn(['data', 'role', 'id']),
        name: response.getIn(['data', 'role', 'name']),
        login_lockout_policy: response.getIn(['data', 'role', 'login_lockout_policy']),
        login_max_attempts: response.getIn(['data', 'role', 'login_max_attempts']),
        login_timeframe: response.getIn(['data', 'role', 'login_timeframe']),
        login_ban_time: response.getIn(['data', 'role', 'login_ban_time']),
        login_ban_by_ip: response.getIn(['data', 'role', 'login_ban_by_ip']),
        password_policy: response.getIn(['data', 'role', 'password_policy']),
        password_reuse_history: response.getIn(['data', 'role', 'password_reuse_history']),
        password_reset_days: response.getIn(['data', 'role', 'password_reset_days']),
        is_admin_role: response.getIn(['data', 'role', 'is_admin_role']),
        priority: response.getIn(['data', 'role', 'priority']),
        created_at: response.getIn(['data', 'role', 'created_at']),
        updated_at: response.getIn(['data', 'role', 'updated_at'])
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(roleReadSuccess(data));
      
    // get role failure
    } else {
      Logger.log('info', `Get API role failure. ID: ${id}.`);
      dispatch(roleReadFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function updateRole(id, data, cb=function(){}) {
  Logger.log('debug', `[roles.actions] updateRole(${id}, %j, ###)`, data);

  return async function(dispatch) {
    dispatch(roleUpdateRequest(id, data));

    // call API
    const response = await api.putRole(id, data);
    let success = false;

    // put role success
    if (200 === response.get('status')) {

      Logger.log('info', `PUT API role success. Role: ${id}.`);

      const normalizedEntities = normalize([response.getIn(['data', 'role'])], [schema.role]);
      const data = {
        id: response.getIn(['data', 'role', 'id']),
        name: response.getIn(['data', 'role', 'name']),
        login_lockout_policy: response.getIn(['data', 'role', 'login_lockout_policy']),
        login_max_attempts: response.getIn(['data', 'role', 'login_max_attempts']),
        login_timeframe: response.getIn(['data', 'role', 'login_timeframe']),
        login_ban_time: response.getIn(['data', 'role', 'login_ban_time']),
        login_ban_by_ip: response.getIn(['data', 'role', 'login_ban_by_ip']),
        password_policy: response.getIn(['data', 'role', 'password_policy']),
        password_reuse_history: response.getIn(['data', 'role', 'password_reuse_history']),
        password_reset_days: response.getIn(['data', 'role', 'password_reset_days']),
        is_admin_role: response.getIn(['data', 'role', 'is_admin_role']),
        priority: response.getIn(['data', 'role', 'priority']),
        created_at: response.getIn(['data', 'role', 'created_at']),
        updated_at: response.getIn(['data', 'role', 'updated_at'])
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(roleUpdateSuccess(data));
      success = true;
      
    // get role failure
    } else {
      Logger.log('info', `PUT API role failure. ID: ${id}.`);
      dispatch(roleUpdateFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb(success);
  }
}

export function createRole(data, cb=function(){}) {
  Logger.log('debug', `[roles.actions] createRole(%j, ###)`, data);

  return async function(dispatch) {
    dispatch(roleCreateRequest(data));

    // call API
    const response = await api.postRoles(data);
    let success = false;

    // post role success
    if (201 === response.get('status')) {

      Logger.log('info', `POST API role success. Role: ${response.getIn(['data', 'role', 'id'])}.`);

      const normalizedEntities = normalize([response.getIn(['data', 'role'])], [schema.role]);
      const data = {
        id: response.getIn(['data', 'role', 'id']),
        name: response.getIn(['data', 'role', 'name']),
        login_lockout_policy: response.getIn(['data', 'role', 'login_lockout_policy']),
        login_max_attempts: response.getIn(['data', 'role', 'login_max_attempts']),
        login_timeframe: response.getIn(['data', 'role', 'login_timeframe']),
        login_ban_time: response.getIn(['data', 'role', 'login_ban_time']),
        login_ban_by_ip: response.getIn(['data', 'role', 'login_ban_by_ip']),
        password_policy: response.getIn(['data', 'role', 'password_policy']),
        password_reuse_history: response.getIn(['data', 'role', 'password_reuse_history']),
        password_reset_days: response.getIn(['data', 'role', 'password_reset_days']),
        is_admin_role: response.getIn(['data', 'role', 'is_admin_role']),
        priority: response.getIn(['data', 'role', 'priority']),
        created_at: response.getIn(['data', 'role', 'created_at']),
        updated_at: response.getIn(['data', 'role', 'updated_at'])
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(roleCreateSuccess(data));
      success = true;
      
    // get role failure
    } else {
      Logger.log('info', `POST API role failure.`);
      dispatch(roleCreateFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb(success);
  }
}

export function deleteRole(id, cb=function(){}) {
  Logger.log('debug', `[roles.actions] deleteRole(${id}, ###)`);

  return async function(dispatch) {
    dispatch(roleDeleteRequest(id));

    // call API
    const response = await api.deleteRole(id);
    let success = false;

    // delete role success
    if (204 === response.get('status')) {

      Logger.log('info', `DELETE API role success. ID: ${id}.`);

      dispatch(removeEntity({entityType: 'roles', id: id}));
      dispatch(roleDeleteSuccess(id));
      success = true;
      
    // get role failure
    } else {
      Logger.log('info', `DELETE API role failure. ID: ${id}.`);
      dispatch(roleDeleteFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb(success);
  }
}

Logger.log('silly', `roles.actions loaded.`);
