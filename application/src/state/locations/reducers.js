import {Map} from 'immutable';

import {
  COUNTRY_LIST_REQUEST,
  COUNTRY_LIST_SUCCESS,
  COUNTRY_LIST_FAILURE,
  REGION_LIST_REQUEST,
  REGION_LIST_SUCCESS,
  REGION_LIST_FAILURE
} from './actions';
import Logger from '../../lib/Logger';

export function locations(
  state=Map({
    areCountriesLoading: false,
    areRegionsLoading: false
  }),
  action
) {
  Logger.log('debug', `[location.reducers] locations(%j, %j)`, state, action);

  switch(action.type) {

    case COUNTRY_LIST_REQUEST:
      return state.mergeDeep({
        areCountriesLoading: true
      });

    case COUNTRY_LIST_SUCCESS:
      return state.mergeDeep({
        areCountriesLoading: false,
        lastUpdated: action.receivedAt
      });

    case COUNTRY_LIST_FAILURE:
      return state.mergeDeep({
        areCountriesLoading: false
      });
    
    case REGION_LIST_REQUEST:
      return state.mergeDeep({
        areRegionsLoading: true
      });
  
    case REGION_LIST_SUCCESS:
      return state.mergeDeep({
        areRegionsLoading: false,
        lastUpdated: action.receivedAt
      });

    case REGION_LIST_FAILURE:
      return state.mergeDeep({
        areRegionsLoading: false
      });

    default:
      return state;
  }
}

Logger.log('silly', `location.reducers loaded.`);
