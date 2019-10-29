import Logger from '../../../lib/Logger';

const register = () => {
  Logger.log('debug', `session.register()`);
}

export default register;

Logger.log('silly', `session.register() loaded.`);
