import {schema as s} from 'normalizr';

import Logger from '../lib/Logger';

const country = new s.Entity('countries');
const region = new s.Entity('regions');
const role = new s.Entity('roles');
const termsOfService = new s.Entity('termsOfServices');
const user = new s.Entity('users', {
  roles: [role]
});
const administrator = new s.Entity('administrators', {
  roles: [role]
});
const appKey = new s.Entity('appKeys');
const login = new s.Entity('logins');

const schema = {
  country: country,
  region: region,
  user: user,
  administrator: administrator,
  role: role,
  appKey: appKey,
  termsOfService: termsOfService,
  login: login,
};

export {schema};

Logger.log('silly', `schema loaded.`);
