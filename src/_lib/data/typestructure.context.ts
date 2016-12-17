import { ObjectType } from 'typeorm/common/ObjectType';
import { provide } from '../../_ioc/ioc.conf';
import { Connection, createConnection, Repository, DriverOptions, ConnectionOptions } from 'typeorm';
import { TypeStructureConnectionOptions } from './typestructure-context-dev.config';

export namespace TypestructureContext {

  /**
   * Application level app context
   *
   * @private
   * @type {Connection}
   * @memberOf TypestructureContext
   */
  let apiContextConnection: Connection;

  /**
   * Gets the current DB Connection for the context
   * creates a new if falsy
   * @returns {Connection}
   */
  function getApiContextConnection(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      // return existing connection immediately
      if (apiContextConnection) resolve(apiContextConnection);
      // create connection
      createConnection(TypeStructureConnectionOptions.Options)
        .then((conn) => {
          apiContextConnection = conn;
          resolve(apiContextConnection);
        })
        .catch(err => {
          console.dir(err);
          reject(err);
        });
    });
  }

  /**
   * @param {string} entity
   * @returns {Repository<any>}
   * @memberOf TypestructureContext
   */
  export function getRepository<T>(entityClass: ObjectType<T>): Promise<Repository<T>> {
    return new Promise((resolve, reject) => {
      // get Context Connection handle and request Repository
      getApiContextConnection().then((apiCtxConn) => {
        resolve(apiCtxConn.getRepository(entityClass));
      })
      .catch((err) => reject(err));
    });
  }
}
