import { databaseConfig } from './database.config';

/**
 * Now the config here can be imported only by using require().
 * It is done to make the config file compatible with sequelize.
 */
export = databaseConfig; // compiles to "module.exports = ..."
