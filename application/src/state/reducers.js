import {combineReducers} from 'redux';
import {Map} from 'immutable';

import {
  ADD_ENTITIES,
  REMOVE_ENTITY,
  SESSION_CREATE_REQUEST,
  SESSION_CREATE_SUCCESS,
  SESSION_CREATE_FAILURE,
  SESSION_DESTROY
} from './actions';
import {userAccount} from './userAccount/reducers';
import {locations} from './locations/reducers';
import {roles} from './roles/reducers';
import {users} from './users/reducers';
import {administrators} from './administrators/reducers';
import {appKeys} from './appKeys/reducers';
import {termsOfServices} from './termsOfServices/reducers';
import Auth from '../lib/Auth';
import Logger from '../lib/Logger';

export function entities(
  state=Map({}),
  action
) {
  Logger.log('debug', `[reducers] entities(%j, %j)`, state, action);

  switch(action.type) {

    case ADD_ENTITIES:
      // return state.mergeDeep(action.payload.entities);
      const tempState = {};
      for (var key in action.payload.entities) {
        tempState[key] = {...state.get(key, {}), ...action.payload.entities[key]};
      }
      return state.merge(tempState);

    case REMOVE_ENTITY:
      return state.deleteIn([action.payload.entityType, action.payload.id]);

    default:
      return state;
  }
}

const initialSessionState = Map({
  isLoading: false,
  ...Auth.getSession()
});

export function session(
  state=initialSessionState,
  action
) {
  Logger.log('debug', `[reducers] session(%j, %j)`, state, action);

  switch(action.type) {

    case SESSION_CREATE_REQUEST:
      return state.mergeDeep({
        isLoading: true,
        form: null
      });

    case SESSION_CREATE_SUCCESS:
      return state.mergeDeep({
        isLoading: false,
        form: {
          success: true
        },
        authToken: action.authToken,
        authExpiration: action.authExpiration,
        authExpires: action.authExpires,
        userId: action.userId,
        username: action.username,
        lastUpdated: action.receivedAt
      });

    case SESSION_CREATE_FAILURE:
      return state.mergeDeep({
        isLoading: false,
        form: {
          success: false
        }
      }).setIn(['form', 'errors'], action.error);
    
    case SESSION_DESTROY:
      return Map({
        isLoading: false
      });

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  session,
  entities,
  userAccount,
  locations,
  roles,
  users,
  administrators,
  appKeys,
  termsOfServices,
});

export default rootReducer;

Logger.log('silly', `reducers loaded.`);
