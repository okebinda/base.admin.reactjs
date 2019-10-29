import axios from 'axios';
import {Map} from 'immutable';

import store from './store';
import Logger from '../lib/Logger';
import Config from '../Config';

class API {

  constructor(config, axios) {
    Logger.log('debug', `API.constructor(%j, %j)`, config, axios);

    // config props
    this.environment = config.get('ENVIRONMENT');
    this.base_url = config.get('API_BASE_URL');
    this.app_key = config.get('API_APP_KEY');

    // internal props
    this.axios = axios;
    this.authToken = null;
  }

  // get authentication token
  _getAuthToken() {
    Logger.log('debug', `API._getAuthToken()`);
    this.authToken = store.getState().session.get('authToken');
    return this.authToken;
  }

  // get request headers
  _getRequestHeaders(validateStatus=null, authenticate=true) {
    Logger.log('debug', `API._getRequestHeaders(${validateStatus}, ${authenticate})`);

    if (authenticate && !this._getAuthToken()) {
      return false;
    }
    const authConfig = this._getAuthToken()
      ? {"auth": {"username": this._getAuthToken()}}
      : {};
    const vaildateStatusConfig = validateStatus
      ? {"validateStatus": (status) => status < validateStatus}
      : {};
    return {...authConfig, ...vaildateStatusConfig};
  }

  // get full URI for an API endpoint
  _getUri(path) {
    Logger.log('debug', `API._getUri(${path})`);
    return this.base_url + path + (path.includes('?') ? '&' : '?') + 'app_key=' + this.app_key;
  }

  // generic API call helper
  async _callApi(method, path, payload=null, authenticate=true) {
    Logger.log('debug', `API._callApi(###, ${path}, %j, ${authenticate})`, payload);

    // get headers and check authentication token
    const requestHeaders = this._getRequestHeaders(500, authenticate);
    if (false === requestHeaders) {
      return Map({'status': 401, 'data': {'error': `Not Authenticated`}});
    }

    if (payload) {

      // call API with payload
      return await method(path, payload, requestHeaders)
        .then(async function(response) {
          Logger.log('verbose', "API Response: %j", response);
          return Map(response);
        })
        .catch(function(error) {
          Logger.log('error', `${error}`);
          return Map({'status': 500, 'data': {'error': `${error}`}});
        });

    } else {

      // call API without payload
      return await method(path, requestHeaders)
        .then(async function(response) {
          Logger.log('verbose', "API Response: %j", response);
          return Map(response);
        })
        .catch(function(error) {
          Logger.log('error', `${error}`);
          return Map({'status': 500, 'data': {'error': `${error}`}});
        });
    }
  }

  // GET method
  async GET(path, authenticate=true) {
    Logger.log('debug', `API.GET(${path}, ${authenticate})`);
    return await this._callApi(this.axios.get, path, null, authenticate);
  }

  // POST method
  async POST(path, payload, authenticate=true) {
    Logger.log('debug', `API.POST(${path}, %j, ${authenticate})`, payload);
    return await this._callApi(this.axios.post, path, payload, authenticate);
  }

  // PUT method
  async PUT(path, payload, authenticate=true) {
    Logger.log('debug', `API.PUT(${path}, %j, ${authenticate})`, payload);
    return await this._callApi(this.axios.put, path, payload, authenticate);
  }

  // DELETE method
  async DELETE(path, authenticate=true) {
    Logger.log('debug', `API.DELETE(${path}, ${authenticate})`);
    return await this._callApi(this.axios.delete, path, null, authenticate);
  }

  // GET /token
  async getToken(username, password) {
    Logger.log('debug', `API.getToken(###, ###)`);

    // prep credentials header config
    const authConfig = {
      "auth": {
        "username": username,
        "password": password
      },
      "validateStatus": function (status) {
        return status < 500;
      }
    }

    // call API
    const output = await this.axios.get(this._getUri(`/token`), authConfig)
      .then(async function(response) {
        Logger.log('verbose', "API Response: %j", response);
        return Map(response);
      })
      .catch(function(error) {
        Logger.log('error', `${error}`);
        return Map({'status': 500, 'data': {'error': `${error}`}});
      });

    return output;
  }

  // GET /account
  async getAccount() {
    Logger.log('debug', `API.getAccount()`);
    return await this.GET(this._getUri(`/user_account`));
  }

  // PUT /account
  async putAccount(payload) {
    Logger.log('debug', `API.putAccount(%j)`, payload);
    return await this.PUT(this._getUri(`/user_account`), payload);
  }

  // PUT /account/password
  async putAccountPassword(payload) {
    Logger.log('debug', `API.putAccountPassword(%j)`, payload);
    return await this.PUT(this._getUri(`/user_account/password`), payload);
  }

  // GET /categories
  async getCategories(page=1, limit=10) {
    Logger.log('debug', `API.getCategories(${page}, ${limit})`);
    return await this.GET(this._getUri(`/categories/${parseInt(page)}/${parseInt(limit)}`));
  }

  // GET /roles
  async getRoles(page=1, limit=10, type=null) {
    Logger.log('debug', `API.getRoles(${page}, ${limit})`);
    if (type) {
      return await this.GET(this._getUri(`/roles/${type}/${parseInt(page)}/${parseInt(limit)}`));
    } else {
      return await this.GET(this._getUri(`/roles/${parseInt(page)}/${parseInt(limit)}`));
    }
  }

  // GET /countries
  async getCountries(page=1, limit=250) {
    Logger.log('debug', `API.getCountries(${page}, ${limit})`);
    return await this.GET(this._getUri(`/countries/${parseInt(page)}/${parseInt(limit)}`));
  }

  // GET /regions/{countryCode}
  async getRegions(countryCode, page=1, limit=100) {
    Logger.log('debug', `API.getRegions(${countryCode}, ${page}, ${limit})`);
    return await this.GET(this._getUri(`/regions/${countryCode}/${parseInt(page)}/${parseInt(limit)}`));
  }

  // GET /users
  async getUsers(page=1, limit=10) {
    Logger.log('debug', `API.getUsers(${page}, ${limit})`);
    return await this.GET(this._getUri(`/users/${parseInt(page)}/${parseInt(limit)}?order_by=id.desc`));
  }

  // GET /user/{id}
  async getUser(id) {
    Logger.log('debug', `API.getUser(${id})`);
    return await this.GET(this._getUri(`/user/${parseInt(id)}`));
  }

  // POST /users
  async postUsers(payload) {
    Logger.log('debug', `API.postUsers(%j)`, payload);
    return await this.POST(this._getUri(`/users`), payload);
  }

  // PUT /user/{id}
  async putUser(id, payload) {
    Logger.log('debug', `API.putUser(${id}, %j)`, payload);
    return await this.PUT(this._getUri(`/user/${parseInt(id)}`), payload);
  }

  // DELETE /user/{id}
  async deleteUser(id) {
    Logger.log('debug', `API.deleteUser(${id})`);
    return await this.DELETE(this._getUri(`/user/${parseInt(id)}`));
  }

  // GET /administrators
  async getAdministrators(page=1, limit=10) {
    Logger.log('debug', `API.getAdministrators(${page}, ${limit})`);
    return await this.GET(this._getUri(`/administrators/${parseInt(page)}/${parseInt(limit)}?order_by=id.desc`));
  }

  // GET /administrator/{id}
  async getAdministrator(id) {
    Logger.log('debug', `API.getAdministrator(${id})`);
    return await this.GET(this._getUri(`/administrator/${parseInt(id)}`));
  }

  // POST /administrators
  async postAdministrators(payload) {
    Logger.log('debug', `API.postAdministrators(%j)`, payload);
    return await this.POST(this._getUri(`/administrators`), payload);
  }

  // PUT /administrator/{id}
  async putAdministrator(id, payload) {
    Logger.log('debug', `API.putAdministrator(${id}, %j)`, payload);
    return await this.PUT(this._getUri(`/administrator/${parseInt(id)}`), payload);
  }

  // DELETE /administrator/{id}
  async deleteAdministrator(id) {
    Logger.log('debug', `API.deleteAdministrator(${id})`);
    return await this.DELETE(this._getUri(`/administrator/${parseInt(id)}`));
  }

  // GET /app_keys
  async getAppKeys(page=1, limit=10) {
    Logger.log('debug', `API.getAppKeys(${page}, ${limit})`);
    return await this.GET(this._getUri(`/app_keys/${parseInt(page)}/${parseInt(limit)}?order_by=id.asc`));
  }

  // GET /app_key/{id}
  async getAppKey(id) {
    Logger.log('debug', `API.getAppKey(${id})`);
    return await this.GET(this._getUri(`/app_key/${parseInt(id)}`));
  }

  // POST /app_keys
  async postAppKeys(payload) {
    Logger.log('debug', `API.postAppKeys(%j)`, payload);
    return await this.POST(this._getUri(`/app_keys`), payload);
  }

  // PUT /app_key/{id}
  async putAppKey(id, payload) {
    Logger.log('debug', `API.putAppKey(${id}, %j)`, payload);
    return await this.PUT(this._getUri(`/app_key/${parseInt(id)}`), payload);
  }

  // DELETE /app_key/{id}
  async deleteAppKey(id) {
    Logger.log('debug', `API.deleteAppKey(${id})`);
    return await this.DELETE(this._getUri(`/app_key/${parseInt(id)}`));
  }

  // GET /terms_of_services
  async getTermsOfServices(page=1, limit=10) {
    Logger.log('debug', `API.getTermsOfServices(${page}, ${limit})`);
    return await this.GET(this._getUri(`/terms_of_services/${parseInt(page)}/${parseInt(limit)}?order_by=id.asc`));
  }

  // GET /terms_of_service/{id}
  async getTermsOfService(id) {
    Logger.log('debug', `API.getTermsOfService(${id})`);
    return await this.GET(this._getUri(`/terms_of_service/${parseInt(id)}`));
  }

  // POST /terms_of_services
  async postTermsOfServices(payload) {
    Logger.log('debug', `API.postTermsOfServices(%j)`, payload);
    return await this.POST(this._getUri(`/terms_of_services`), payload);
  }

  // PUT /terms_of_service/{id}
  async putTermsOfService(id, payload) {
    Logger.log('debug', `API.putTermsOfService(${id}, %j)`, payload);
    return await this.PUT(this._getUri(`/terms_of_service/${parseInt(id)}`), payload);
  }

  // DELETE /terms_of_service/{id}
  async deleteTermsOfService(id) {
    Logger.log('debug', `API.deleteTermsOfService(${id})`);
    return await this.DELETE(this._getUri(`/terms_of_service/${parseInt(id)}`));
  }
}

const api = new API(Config, axios);

export default api;

Logger.log('debug', `API loaded.`);
