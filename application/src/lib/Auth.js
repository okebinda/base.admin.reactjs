import storage from './Storage';
import Logger from './Logger';
import Config from '../Config';

class Auth {

  constructor(storageType='session') {
    Logger.log('debug', `Auth.constructor(${storageType})`);
    this.storageType = storageType;
    this.storage = storage;
  }

  saveSession(authToken, authExpiration, authExpires, userId, username) {
    Logger.log('info', `Authentication success. User: ${userId}`);
    this.storage.set(this.storageType, 'authToken', authToken);
    this.storage.set(this.storageType, 'authExpiration', authExpiration);
    this.storage.set(this.storageType, 'authExpires', authExpires);
    this.storage.set(this.storageType, 'userId', userId);
    this.storage.set(this.storageType, 'username', username);
  }

  getSession() {
    Logger.log('debug', `Auth.getSession()`);
    return {
      authToken: this.storage.get(this.storageType, 'authToken'),
      authExpiration: this.storage.get(this.storageType, 'authExpiration'),
      authExpires: this.storage.get(this.storageType, 'authExpires'),
      userId: this.storage.get(this.storageType, 'userId'),
      username: this.storage.get(this.storageType, 'username')
    }
  }

  deleteSession() {
    Logger.log('debug', `Auth.deleteSession()`);
    this.storage.remove(this.storageType, 'authToken');
    this.storage.remove(this.storageType, 'userId');
    this.storage.remove(this.storageType, 'username');
    this.storage.remove(this.storageType, 'authExpiration');
    this.storage.remove(this.storageType, 'authExpires');
  }
}

const auth = new Auth(Config.get('AUTH_STORAGE'));
export default auth;

Logger.log('silly', `Auth loaded.`);
