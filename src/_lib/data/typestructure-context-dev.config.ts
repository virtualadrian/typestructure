import { ConnectionOptions, DriverOptions } from 'typeorm';

namespace TypeStructureConnectionOptions {
  /**
   * connection information - we will change this to come from
   * a configuration.
   *
   * @private
   * @type {environmentOptions}
   */
  export declare let Context: any;
}

/**
 * This should be replaced with an initialization service 
 * in the server.ts - Ideally loaded from KMS
 */
TypeStructureConnectionOptions.Context = <ConnectionOptions>{
  driver: <DriverOptions>{
    type: 'mysql',
    host: '159.203.175.171',
    port: 3306,
    username: 'root',
    password: 'HI123',
    database: 'WebstormDB',
  },
  connection: {
    autoSchemaSync: false // WARNING: Could Drop DB if {True}
  }
};
