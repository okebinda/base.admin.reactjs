import api from './api';
import Logger from '../lib/Logger';
import Events from '../lib/EventEmitter';
import Auth from '../lib/Auth';
import Config from '../Config';

export const ADD_ENTITIES = 'ADD_ENTITIES';
export const REMOVE_ENTITY = 'REMOVE_ENTITY';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const SESSION_CREATE_REQUEST = 'SESSION_CREATE_REQUEST';
export const SESSION_CREATE_SUCCESS = 'SESSION_CREATE_SUCCESS';
export const SESSION_CREATE_FAILURE = 'SESSION_CREATE_FAILURE';
export const SESSION_FORM_DESTROY = 'SESSION_FORM_DESTROY';
export const SESSION_DESTROY = 'SESSION_DESTROY';
export const SESSION_HYDRATE = 'SESSION_HYDRATE';

export const addEntities = (entities) => {
  Logger.log('debug', `[actions] addEntities(%j)`, entities);
  return {
    type: ADD_ENTITIES,
    payload: entities
  }
};

export const removeEntity = (payload) => {
  Logger.log('debug', `[actions] removeEntity(%j)`, payload);
  return {
    type: REMOVE_ENTITY,
    payload: payload
  }
};

export const sendMessage = (level, title, body, expires) => {
  Logger.log('debug', `[actions] sendMessage("${level}", "${title}", "${body}", ${expires})`);
  if (typeof expires === 'undefined') {
    expires = Config.get('DEFAULT_MESSAGE_TIMEOUT');
  }
  return {
    type: SEND_MESSAGE,
    level: level,
    title: title,
    body: body,
    expires: expires
  }
};

export const removeMessage = (key) => {
  Logger.log('debug', `[actions] removeMessage("${key}")`);
  return {
    type: REMOVE_MESSAGE,
    key: key
  }
};

export function sessionCreateRequest(data) {
  Logger.log('debug', `[actions] sessionCreateRequest()`);
  return {
    type: SESSION_CREATE_REQUEST,
    username: data.username,
    password: data.password,
  }
}

export function sessionCreateSuccess(data) {
  Logger.log('debug', `[actions] sessionCreateSuccess(%j)`, data);
  Auth.saveSession(data.authToken, data.authExpiration, data.authExpires, data.userId, data.username);
  return {
    type: SESSION_CREATE_SUCCESS,
    authToken: data.authToken,
    authExpiration: data.authExpiration,
    authExpires: data.authExpires,
    userId: data.userId,
    username: data.username,
    receivedAt: Date.now()
  }
}

export function sessionCreateFailure(error) {
  Logger.log('debug', `[actions] sessionCreateFailure(%j)`, error);
  return {
    type: SESSION_CREATE_FAILURE,
    error: error
  }
}

export function sessionFormDestroy(formState=null) {
  Logger.log('debug', `[state.actions] sessionFormDestroy(###)`, formState);
  return {
    type: SESSION_FORM_DESTROY,
    form: formState
  }
}

export function sessionHydrate(data) {
  Logger.log('debug', `[state.actions] sessionHydrate()`);
  Events.dispatch('SESSION_HYDRATE');
  return {
    type: SESSION_HYDRATE,
    authToken: data.authToken,
    authExpiration: data.authExpiration,
    authExpires: data.authExpires,
    userId: data.userId,
    username: data.username
  }
}

export function sessionDestroy() {
  Logger.log('debug', `[actions] sessionDestroy()`);
  Auth.deleteSession();
  return {
    type: SESSION_DESTROY
  }
}


// API THUNK ACTION CREATORS

export function createSession(data, cb=function(){}) {
  Logger.log('debug', `[actions] createSession(###, ###)`);

  return async function(dispatch) {
    
    dispatch(sessionCreateRequest(data));

    // call API
    const response = await api.getToken(data.username, data.password);
    let success = false;

    // get token success
    if (200 === response.get('status')) {

      Logger.log('info', `GET API token success. User: ${response.getIn(['data', 'user_id'])}`);
      success = true;

      const sessionSuccessData = {
        authToken: response.getIn(['data', 'token']),
        authExpiration: response.getIn(['data', 'expiration']),
        authExpires: Math.round(new Date().getTime()/1000) + parseInt(response.getIn(['data', 'expiration'])),
        userId: response.getIn(['data', 'user_id']),
        username: response.getIn(['data', 'username'])
      };

      dispatch(sessionCreateSuccess(sessionSuccessData));
      
    // get metric failure
    } else {
      Logger.log('info', `GET API token failure.`);
      dispatch(sessionCreateFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb(success);
  }
}

export function destroySession(cb=function(){}) {
  Logger.log('debug', `[actions] destroySession(###)`);
  return async function(dispatch) {
    dispatch(sessionDestroy());
    cb();
  }
}

Logger.log('silly', `actions loaded.`);
