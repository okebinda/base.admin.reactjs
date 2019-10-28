import Logger from '../../lib/Logger';
import api from '../api';

export const USER_ACCOUNT_READ_REQUEST = 'USER_ACCOUNT_READ_REQUEST';
export const USER_ACCOUNT_READ_SUCCESS = 'USER_ACCOUNT_READ_SUCCESS';
export const USER_ACCOUNT_READ_FAILURE = 'USER_ACCOUNT_READ_FAILURE';
export const USER_ACCOUNT_UPDATE_REQUEST = 'USER_ACCOUNT_UPDATE_REQUEST';
export const USER_ACCOUNT_UPDATE_SUCCESS = 'USER_ACCOUNT_UPDATE_SUCCESS';
export const USER_ACCOUNT_UPDATE_FAILURE = 'USER_ACCOUNT_UPDATE_FAILURE';
export const USER_ACCOUNT_FORM_DESTROY = 'USER_ACCOUNT_FORM_DESTROY';
export const PASSWORD_UPDATE_REQUEST = 'PASSWORD_UPDATE_REQUEST';
export const PASSWORD_UPDATE_SUCCESS = 'PASSWORD_UPDATE_SUCCESS';
export const PASSWORD_UPDATE_FAILURE = 'PASSWORD_UPDATE_FAILURE';
export const PASSWORD_FORM_DESTROY = 'PASSWORD_FORM_DESTROY';

export function userAccountReadRequest() {
  Logger.log('debug', `[userAccount.actions] userAccountReadRequest()`);
  return {
    type: USER_ACCOUNT_READ_REQUEST
  }
}

export function userAccountReadSuccess(data) {
  Logger.log('debug', `[userAccount.actions] userAccountReadSuccess(%j)`, data);
  return {
    type: USER_ACCOUNT_READ_SUCCESS,
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    receivedAt: Date.now()
  }
}

export function userAccountReadFailure(error) {
  Logger.log('debug', `[userAccount.actions] userAccountReadFailure(%j)`, error);
  return {
    type: USER_ACCOUNT_READ_FAILURE,
    error: error
  }
}

export function userAccountUpdateRequest(data) {
  Logger.log('debug', `[userAccount.actions] userAccountUpdateRequest(%j)`, data);
  return {
    type: USER_ACCOUNT_UPDATE_REQUEST,
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    title: data.title,
  }
}

export function userAccountUpdateSuccess(data) {
  Logger.log('debug', `[userAccount.actions] userAccountUpdateSuccess(%j)`, data);
  return {
    type: USER_ACCOUNT_UPDATE_SUCCESS,
    username: data.username,
    email: data.email,
    first_name: data.first_name,
    last_name: data.last_name,
    receivedAt: Date.now()
  }
}

export function userAccountUpdateFailure(error) {
  Logger.log('debug', `[userAccount.actions] userAccountUpdateFailure(%j)`, error);
  return {
    type: USER_ACCOUNT_UPDATE_FAILURE,
    error: error
  }
}

export function userAccountFormDestroy(formState=null) {
  Logger.log('debug', `[userAccount.actions] userAccountFormDestroy(%j)`, formState);
  return {
    type: USER_ACCOUNT_FORM_DESTROY,
    form: formState
  }
}

export function passwordUpdateRequest() {
  Logger.log('debug', `[userAccount.actions] passwordUpdateRequest()`);
  return {
    type: PASSWORD_UPDATE_REQUEST
  }
}

export function passwordUpdateSuccess() {
  Logger.log('debug', `[userAccount.actions] passwordUpdateSuccess()`);
  return {
    type: PASSWORD_UPDATE_SUCCESS
  }
}

export function passwordUpdateFailure(error) {
  Logger.log('debug', `[userAccount.actions] passwordUpdateFailure(%j)`, error);
  return {
    type: PASSWORD_UPDATE_FAILURE,
    error: error
  }
}

export function passwordFormDestroy(formState=null) {
  Logger.log('debug', `[userAccount.actions] passwordFormDestroy(%j)`, formState);
  return {
    type: PASSWORD_FORM_DESTROY,
    form: formState
  }
}

// API THUNK ACTION CREATORS

export function loadUserAccount(cb=function(){}) {
  Logger.log('debug', `[userAccount.actions] loadUserAccount(###)`);

  return async function(dispatch) {
    dispatch(userAccountReadRequest());

    // call API
    const response = await api.getAccount();

    // get user account success
    if (200 === response.get('status')) {

      Logger.log('info', `Get API user account success.`);

      const data = {
        username: response.getIn(['data', 'user_account', 'username']),
        email: response.getIn(['data', 'user_account', 'email']),
        first_name: response.getIn(['data', 'user_account', 'first_name']),
        last_name: response.getIn(['data', 'user_account', 'last_name'])
      };

      dispatch(userAccountReadSuccess(data));
      
    // get user account failure
    } else {
      Logger.log('info', `Get API user account failure.`);
      dispatch(userAccountReadFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function updateUserAccount(data, cb=function(){}) {
  Logger.log('debug', `[userAccount.actions] updateUserAccount(%j, ###)`, data);

  return async function(dispatch) {
    dispatch(userAccountUpdateRequest(data));

    // call API
    const response = await api.putAccount(data);

    // put user account success
    if (200 === response.get('status')) {

      Logger.log('info', `PUT API user account success.`);

      const data = {
        username: response.getIn(['data', 'user_account', 'username']),
        email: response.getIn(['data', 'user_account', 'email']),
        first_name: response.getIn(['data', 'user_account', 'first_name']),
        last_name: response.getIn(['data', 'user_account', 'last_name'])
      };

      dispatch(userAccountUpdateSuccess(data));
      
    // get user account failure
    } else {
      Logger.log('info', `PUT API user account failure.`);
      dispatch(userAccountUpdateFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function updatePassword(data, cb=function(){}) {
  Logger.log('debug', `[userAccount.actions] updatePassword(###, ###)`);

  return async function(dispatch) {
    dispatch(passwordUpdateRequest());

    // call API
    const response = await api.putAccountPassword(data);

    // put password success
    if (200 === response.get('status')) {
      Logger.log('info', `PUT API password success.`);
      dispatch(passwordUpdateSuccess());
      
    // get user account failure
    } else {
      Logger.log('info', `PUT API password failure.`);
      dispatch(passwordUpdateFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

Logger.log('silly', `userAccount.actions loaded.`);
