
import { provide } from '../../_ioc/ioc.conf';
import { Connection, createConnection, Repository, DriverOptions, ConnectionOptions } from 'typeorm';
// import { default as environment } from './typestructure-context-dev.config';

// import { User } from  '../../features/users';

import { User } from  './index.entity';

// dev configtypestructure-context-dev
const development: ConnectionOptions = <ConnectionOptions>{
  driver: <DriverOptions>{
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'notRoot',
    password: 'this_is_my_password_there_are_many_like_it',
    database: 'typestructure_example',
  },
  connection: {
    autoSchemaSync: false // set to false in order to avoid DB issues
  },
  entities: [
      User
  ]
};




/**
 * TypestructureContext Context object to the database
 *
 * @export
 * @class TypestructureContext
 */
@provide('TypestructureContext')
export  class TypestructureContext {

  /**
   * Application level app context
   *
   * @private
   * @type {Connection}
   * @memberOf TypestructureContext
   */
  private static apiCtx: Connection;

  /**
   * Creates an instance of TypestructureContext.
   * @memberOf TypestructureContext
   */
  constructor() {
    if (TypestructureContext.apiCtx) return;

    // create connection and set it for self
    createConnection(development)
      .then((conn) => {
        TypestructureContext.apiCtx = conn;
      })
      .catch(err => {
        console.dir(err);
        throw(err);
      });
  }

  /**
   * @param {string} entity
   * @returns {Repository<any>}
   * @memberOf TypestructureContext
   */
  public getRepository(entity: string): Repository<any> {
    return TypestructureContext.apiCtx.getRepository(entity);
  }
}
