import {schema as s} from 'normalizr';

import Logger from '../lib/Logger';

const country = new s.Entity('countries');
const region = new s.Entity('regions');
const role = new s.Entity('roles');
const terms_of_service = new s.Entity('terms_of_services');
const user = new s.Entity('users', {
  roles: [role]
});
const administrator = new s.Entity('administrators', {
  roles: [role]
});
const app_key = new s.Entity('app_keys');
const login = new s.Entity('logins');

const schema = {
  country: country,
  region: region,
  user: user,
  administrator: administrator,
  role: role,
  app_key: app_key,
  terms_of_service: terms_of_service,
  login: login
};

export {schema};

Logger.log('silly', `schema loaded.`);
