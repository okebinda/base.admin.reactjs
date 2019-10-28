import {schema as s} from 'normalizr';

import Logger from '../lib/Logger';

const country = new s.Entity('countries');
const region = new s.Entity('regions');
const role = new s.Entity('roles');
const terms_of_service = new s.Entity('terms_of_services');
const user = new s.Entity('users', {
  roles: [role]
});
const app_key = new s.Entity('app_keys');

const schema = {
  country: country,
  region: region,
  user: user,
  role: role,
  app_key: app_key,
  terms_of_service: terms_of_service
};

export {schema};

Logger.log('silly', `schema loaded.`);
