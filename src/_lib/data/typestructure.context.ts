import { provide } from '../../_ioc/ioc.conf';
import { Connection, createConnection, Repository, DriverOptions, ConnectionOptions } from 'typeorm';
import { TypeStructureConnectionOptions } from './typestructure-context-dev.config';

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
    createConnection(TypeStructureConnectionOptions.Options)
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
