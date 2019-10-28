import {normalize} from 'normalizr';

import api from '../api';
import {schema} from '../schema';
import {addEntities} from '../actions';
import Logger from '../../lib/Logger';

export const COUNTRY_LIST_REQUEST = 'COUNTRY_LIST_REQUEST';
export const COUNTRY_LIST_SUCCESS = 'COUNTRY_LIST_SUCCESS';
export const COUNTRY_LIST_FAILURE = 'COUNTRY_LIST_FAILURE';
export const REGION_LIST_REQUEST = 'REGION_LIST_REQUEST';
export const REGION_LIST_SUCCESS = 'REGION_LIST_SUCCESS';
export const REGION_LIST_FAILURE = 'REGION_LIST_FAILURE';

export function countryListRequest(page, limit) {
  Logger.log('debug', `[location.actions] countryListRequest(${page}, ${limit})`);
  return {
    type: COUNTRY_LIST_REQUEST,
    page: page,
    limit: limit,
  }
}

export function countryListSuccess(data) {
  Logger.log('debug', `[location.actions] countryListSuccess(%j)`, data);
  return {
    type: COUNTRY_LIST_SUCCESS,
    page: data.page,
    limit: data.limit,
    order: data.order,
    result: data.result,
    total: data.total,
    receivedAt: Date.now()
  }
}

export function countryListFailure(error) {
  Logger.log('debug', `[location.actions] countryListFailure(%j)`, error);
  return {
    type: COUNTRY_LIST_FAILURE,
    error: error
  }
}

export function regionListRequest(countryCode, page, limit) {
  Logger.log('debug', `[location.actions] regionListRequest(${countryCode}, ${page}, ${limit})`);
  return {
    type: REGION_LIST_REQUEST,
    countryCode: countryCode,
    page: page,
    limit: limit,
  }
}

export function regionListSuccess(data) {
  Logger.log('debug', `[location.actions] regionListSuccess(%j)`, data);
  return {
    type: REGION_LIST_SUCCESS,
    page: data.page,
    limit: data.limit,
    order: data.order,
    result: data.result,
    total: data.total,
    receivedAt: Date.now()
  }
}

export function regionListFailure(error) {
  Logger.log('debug', `[location.actions] regionListFailure(%j)`, error);
  return {
    type: REGION_LIST_FAILURE,
    error: error
  }
}

// API THUNK ACTION CREATORS

export function loadCountries(page=1, limit=250, cb=function(){}) {
  Logger.log('debug', `[location.actions] loadCountries(${page}, ${limit}, ###)`);

  return async function(dispatch) {
    dispatch(countryListRequest(page, limit));

    // call API
    const response = await api.getCountries(page, limit);

    // get countries list success
    if (200 === response.get('status')) {

      Logger.log('info', `Get API countries list success. Page: ${page}, Limit: ${limit}.`);

      const normalizedCountries = normalize(response.getIn(['data', 'countries']), [schema.country]);
      const countrySuccessData = {
        page: response.getIn(['data', 'page']),
        limit: response.getIn(['data', 'limit']),
        order: 'date.desc',
        total: response.getIn(['data', 'total']),
        result: normalizedCountries.result
      };

      dispatch(addEntities(normalizedCountries));
      dispatch(countryListSuccess(countrySuccessData));
      
    // get countries list failure
    } else {
      Logger.log('info', `Get API countries list failure. Page: ${page}, Limit: ${limit}.`);
      dispatch(countryListFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

export function loadRegions(countryCode, page=1, limit=250, cb=function(){}) {
  Logger.log('debug', `[location.actions] loadRegions(${countryCode}, ${page}, ${limit}, ###)`);

  return async function(dispatch) {
    dispatch(regionListRequest(countryCode, page, limit));

    // call API
    const response = await api.getRegions(countryCode, page, limit);

    // get regions list success
    if (200 === response.get('status')) {

      Logger.log('info', `Get API regions list success. Country Code: ${countryCode}, Page: ${page}, Limit: ${limit}.`);

      const normalizedRegions = normalize(response.getIn(['data', 'regions']), [schema.region]);
      for (const key in normalizedRegions.entities.regions) {
        normalizedRegions.entities.regions[key]['country'] = countryCode;
      }

      const regionSuccessData = {
        page: response.getIn(['data', 'page']),
        limit: response.getIn(['data', 'limit']),
        order: 'date.desc',
        total: response.getIn(['data', 'total']),
        result: normalizedRegions.result
      };

      dispatch(addEntities(normalizedRegions));
      dispatch(regionListSuccess(regionSuccessData));
      
    // get regions list failure
    } else {
      Logger.log('info', `Get API regions list failure. Country Code: ${countryCode}, Page: ${page}, Limit: ${limit}.`);
      dispatch(regionListFailure(response.getIn(['data', 'error'])));
    }

    // callback function
    cb();
  }
}

Logger.log('silly', `location.actions loaded.`);
