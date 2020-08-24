import {normalize} from 'normalizr';

import api from '../../api';
import {schema} from '../../schema';
import {addEntities, removeEntity} from '../../actions';
import Logger from '../../../lib/Logger';

// ACTION TYPES

export const TERMS_OF_SERVICE_LIST_REQUEST = 'TERMS_OF_SERVICE_LIST_REQUEST';
export const TERMS_OF_SERVICE_LIST_SUCCESS = 'TERMS_OF_SERVICE_LIST_SUCCESS';
export const TERMS_OF_SERVICE_LIST_FAILURE = 'TERMS_OF_SERVICE_LIST_FAILURE';
export const TERMS_OF_SERVICE_READ_REQUEST = 'TERMS_OF_SERVICE_READ_REQUEST';
export const TERMS_OF_SERVICE_READ_SUCCESS = 'TERMS_OF_SERVICE_READ_SUCCESS';
export const TERMS_OF_SERVICE_READ_FAILURE = 'TERMS_OF_SERVICE_READ_FAILURE';
export const TERMS_OF_SERVICE_UPDATE_REQUEST = 'TERMS_OF_SERVICE_UPDATE_REQUEST';
export const TERMS_OF_SERVICE_UPDATE_SUCCESS = 'TERMS_OF_SERVICE_UPDATE_SUCCESS';
export const TERMS_OF_SERVICE_UPDATE_FAILURE = 'TERMS_OF_SERVICE_UPDATE_FAILURE';
export const TERMS_OF_SERVICE_CREATE_REQUEST = 'TERMS_OF_SERVICE_CREATE_REQUEST';
export const TERMS_OF_SERVICE_CREATE_SUCCESS = 'TERMS_OF_SERVICE_CREATE_SUCCESS';
export const TERMS_OF_SERVICE_CREATE_FAILURE = 'TERMS_OF_SERVICE_CREATE_FAILURE';
export const TERMS_OF_SERVICE_DELETE_REQUEST = 'TERMS_OF_SERVICE_DELETE_REQUEST';
export const TERMS_OF_SERVICE_DELETE_SUCCESS = 'TERMS_OF_SERVICE_DELETE_SUCCESS';
export const TERMS_OF_SERVICE_DELETE_FAILURE = 'TERMS_OF_SERVICE_DELETE_FAILURE';
export const TERMS_OF_SERVICE_FORM_DESTROY = 'TERMS_OF_SERVICE_FORM_DESTROY';

// ACTION CREATORS

export function termsOfServiceListRequest(page, limit, order) {
  Logger.log('debug', `[termsOfServices.actions] termsOfServiceListRequest(${page}, ${limit}, ${order})`);
  return {
    type: TERMS_OF_SERVICE_LIST_REQUEST,
    page: page,
    limit: limit,
    order: order,
  }
}

export function termsOfServiceListSuccess(data) {
  Logger.log('debug', `[termsOfServices.actions] termsOfServiceListSuccess(%j)`, data);
  return {
    type: TERMS_OF_SERVICE_LIST_SUCCESS,
    page: data.page,
    limit: data.limit,
    order: data.order,
    result: data.result,
    total: data.total,
    receivedAt: Date.now()
  }
}

export function termsOfServiceListFailure(error) {
  Logger.log('debug', `[termsOfServices.actions] termsOfServiceListFailure(%j)`, error);
  return {
    type: TERMS_OF_SERVICE_LIST_FAILURE,
    error: error
  }
}

export function termsOfServiceReadRequest(id) {
  Logger.log('debug', `[termsOfServices.actions] termsOfServiceReadRequest(${id})`);
  return {
    type: TERMS_OF_SERVICE_READ_REQUEST,
    id: id
  }
}

export function termsOfServiceReadSuccess(data) {
  Logger.log('debug', `[termsOfServices.actions] termsOfServiceReadSuccess(%j)`, data);
  return {
    type: TERMS_OF_SERVICE_READ_SUCCESS,
    id: data.id,
    text: data.text,
    version: data.version,
    publish_date: data.publish_date,
    status: data.status,
    status_changed_at: data.status_changed_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    receivedAt: Date.now()
  }
}

export function termsOfServiceReadFailure(error) {
  Logger.log('debug', `[termsOfServices.actions] termsOfServiceReadFailure(%j)`, error);
  return {
    type: TERMS_OF_SERVICE_READ_FAILURE,
    error: error
  }
}

export function termsOfServiceUpdateRequest(id, data) {
  Logger.log('debug', `[termsOfServices.actions] termsOfServiceUpdateRequest(${id}, %j)`, data);
  return {
    type: TERMS_OF_SERVICE_UPDATE_REQUEST,
    text: data.text,
    version: data.version,
    publish_date: data.publish_date,
    status: data.status
  }
}

export function termsOfServiceUpdateSuccess(data) {
  Logger.log('debug', `[termsOfServices.actions] termsOfServiceUpdateSuccess(%j)`, data);
  return {
    type: TERMS_OF_SERVICE_UPDATE_SUCCESS,
    id: data.id,
    text: data.text,
    version: data.version,
    publish_date: data.publish_date,
    status: data.status,
    status_changed_at: data.status_changed_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    receivedAt: Date.now()
  }
}

export function termsOfServiceUpdateFailure(error) {
  Logger.log('debug', `[termsOfServices.actions] termsOfServiceUpdateFailure(%j)`, error);
  return {
    type: TERMS_OF_SERVICE_UPDATE_FAILURE,
    error: error
  }
}

export function termsOfServiceCreateRequest(data) {
  Logger.log('debug', `[termsOfServices.actions] termsOfServiceCreateRequest(%j)`, data);
  return {
    type: TERMS_OF_SERVICE_CREATE_REQUEST,
    text: data.text,
    version: data.version,
    publish_date: data.publish_date,
    status: data.status
  }
}

export function termsOfServiceCreateSuccess(data) {
  Logger.log('debug', `[termsOfServices.actions] termsOfServiceCreateSuccess(%j)`, data);
  return {
    type: TERMS_OF_SERVICE_CREATE_SUCCESS,
    id: data.id,
    text: data.text,
    version: data.version,
    publish_date: data.publish_date,
    status: data.status,
    status_changed_at: data.status_changed_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    receivedAt: Date.now()
  }
}

export function termsOfServiceCreateFailure(error) {
  Logger.log('debug', `[termsOfServices.actions] termsOfServiceCreateFailure(%j)`, error);
  return {
    type: TERMS_OF_SERVICE_CREATE_FAILURE,
    error: error
  }
}

export function termsOfServiceDeleteRequest(id) {
  Logger.log('debug', `[termsOfServices.actions] termsOfServiceDeleteRequest(${id})`);
  return {
    type: TERMS_OF_SERVICE_DELETE_REQUEST,
    id: id
  }
}

export function termsOfServiceDeleteSuccess(id) {
  Logger.log('debug', `[termsOfServices.actions] termsOfServiceDeleteSuccess(${id})`);
  return {
    type: TERMS_OF_SERVICE_DELETE_SUCCESS,
    id: id,
  }
}

export function termsOfServiceDeleteFailure(error) {
  Logger.log('debug', `[termsOfServices.actions] termsOfServiceDeleteFailure(%j)`, error);
  return {
    type: TERMS_OF_SERVICE_DELETE_FAILURE,
    error: error
  }
}

export function termsOfServiceFormDestroy(formState=null) {
  Logger.log('debug', `[termsOfServices.actions] termsOfServiceFormDestroy(%j)`, formState);
  return {
    type: TERMS_OF_SERVICE_FORM_DESTROY,
    form: formState
  }
}


// API THUNK ACTION CREATORS

export function loadTermsOfServices(page=1, limit=10, order=null, cb=function(){}) {
  Logger.log('debug', `[termsOfServices.actions] loadTermsOfServices(${page}, ${limit}, ###)`);

  return async function(dispatch) {
    dispatch(termsOfServiceListRequest(page, limit, order));

    // call API
    const response = await api.getTermsOfServices(page, limit, order);

    // get ToS list success
    if (200 === response.get('status')) {

      Logger.log('info', `Get API ToS list success. Page: ${page}, Limit: ${limit}, Order: ${order}.`);

      const normalizedEntities = normalize(response.getIn(['data', 'terms_of_services']), [schema.termsOfService]);
      const data = {
        page: response.getIn(['data', 'page']),
        limit: response.getIn(['data', 'limit']),
        order: order,
        total: response.getIn(['data', 'total']),
        result: normalizedEntities.result
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(termsOfServiceListSuccess(data));
      
    // get ToS list failure
    } else {
      Logger.log('info', `Get API ToS list failure. Page: ${page}, Limit: ${limit}, Order: ${order}.`);
      dispatch(termsOfServiceListFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function loadTermsOfService(id, cb=function(){}) {
  Logger.log('debug', `[termsOfServices.actions] loadTermsOfService(${id}, ###)`);

  return async function(dispatch) {
    dispatch(termsOfServiceReadRequest(id));

    // call API
    const response = await api.getTermsOfService(id);
    let success = false;

    // get ToS success
    if (200 === response.get('status')) {

      Logger.log('info', `Get API ToS success. ID: ${id}.`);
      success = true;

      const normalizedEntities = normalize([response.getIn(['data', 'terms_of_service'])], [schema.termsOfService]);
      const data = {
        id: response.getIn(['data', 'terms_of_service', 'id']),
        text: response.getIn(['data', 'terms_of_service', 'text']),
        version: response.getIn(['data', 'terms_of_service', 'version']),
        publish_date: response.getIn(['data', 'terms_of_service', 'publish_date']),
        status: response.getIn(['data', 'terms_of_service', 'status']),
        status_changed_at: response.getIn(['data', 'terms_of_service', 'status_changed_at']),
        created_at: response.getIn(['data', 'terms_of_service', 'created_at']),
        updated_at: response.getIn(['data', 'terms_of_service', 'updated_at'])
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(termsOfServiceReadSuccess(data));
      
    // get ToS failure
    } else {
      Logger.log('info', `Get API ToS failure. ID: ${id}.`);
      dispatch(termsOfServiceReadFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb(success);
  }
}

export function updateTermsOfService(id, data, cb=function(){}) {
  Logger.log('debug', `[termsOfServices.actions] updateTermsOfService(${id}, %j, ###)`, data);

  return async function(dispatch) {
    dispatch(termsOfServiceUpdateRequest(id, data));

    // call API
    const response = await api.putTermsOfService(id, data);
    let success = false;

    // put ToS success
    if (200 === response.get('status')) {

      Logger.log('info', `PUT API ToS success. User: ${id}.`);

      const normalizedEntities = normalize([response.getIn(['data', 'terms_of_service'])], [schema.termsOfService]);
      const data = {
        id: response.getIn(['data', 'terms_of_service', 'id']),
        text: response.getIn(['data', 'terms_of_service', 'text']),
        version: response.getIn(['data', 'terms_of_service', 'version']),
        publish_date: response.getIn(['data', 'terms_of_service', 'publish_date']),
        status: response.getIn(['data', 'terms_of_service', 'status']),
        status_changed_at: response.getIn(['data', 'terms_of_service', 'status_changed_at']),
        created_at: response.getIn(['data', 'terms_of_service', 'created_at']),
        updated_at: response.getIn(['data', 'terms_of_service', 'updated_at'])
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(termsOfServiceUpdateSuccess(data));
      success = true;
      
    // get ToS failure
    } else {
      Logger.log('info', `PUT API ToS failure. ID: ${id}.`);
      dispatch(termsOfServiceUpdateFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb(success);
  }
}

export function createTermsOfService(data, cb=function(){}) {
  Logger.log('debug', `[termsOfServices.actions] createTermsOfService(%j, ###)`, data);

  return async function(dispatch) {
    dispatch(termsOfServiceCreateRequest(data));

    // call API
    const response = await api.postTermsOfServices(data);
    let success = false;

    // post ToS success
    if (201 === response.get('status')) {

      Logger.log('info', `POST API ToS success. ID: ${response.getIn(['data', 'terms_of_service', 'id'])}.`);

      const normalizedEntities = normalize([response.getIn(['data', 'terms_of_service'])], [schema.termsOfService]);
      const data = {
        id: response.getIn(['data', 'terms_of_service', 'id']),
        text: response.getIn(['data', 'terms_of_service', 'text']),
        version: response.getIn(['data', 'terms_of_service', 'version']),
        publish_date: response.getIn(['data', 'terms_of_service', 'publish_date']),
        status: response.getIn(['data', 'terms_of_service', 'status']),
        status_changed_at: response.getIn(['data', 'terms_of_service', 'status_changed_at']),
        created_at: response.getIn(['data', 'terms_of_service', 'created_at']),
        updated_at: response.getIn(['data', 'terms_of_service', 'updated_at'])
      };

      dispatch(addEntities(normalizedEntities));
      dispatch(termsOfServiceCreateSuccess(data));
      success = true;
      
    // get ToS failure
    } else {
      Logger.log('info', `POST API ToS failure.`);
      dispatch(termsOfServiceCreateFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb(success);
  }
}

export function deleteTermsOfService(id, cb=function(){}) {
  Logger.log('debug', `[termsOfServices.actions] deleteTermsOfService(${id}, ###)`);

  return async function(dispatch) {
    dispatch(termsOfServiceDeleteRequest(id));

    // call API
    const response = await api.deleteTermsOfService(id);
    let success = false;

    // delete ToS success
    if (204 === response.get('status')) {

      Logger.log('info', `DELETE API ToS success. ID: ${id}.`);

      dispatch(removeEntity({entityType: 'terms_of_services', id: id}));
      dispatch(termsOfServiceDeleteSuccess(id));
      success = true;
      
    // get ToS failure
    } else {
      Logger.log('info', `DELETE API ToS failure. ID: ${id}.`);
      dispatch(termsOfServiceDeleteFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb(success);
  }
}

Logger.log('silly', `termsOfServices.actions loaded.`);
