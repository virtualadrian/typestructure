import { ConnectionOptions, DriverOptions, getConnectionManager } from 'typeorm';
import { Application } from '../../application';

export namespace TypeStructureConnection {

/**
 * This should be replaced with an initialization service 
 * in the server.ts - Ideally loaded from KMS
 */
const Options: ConnectionOptions =
  <ConnectionOptions>{
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
    },
    entities: [
      Application.Path + '/**/*.js'
    ]
  };

  export const Default = getConnectionManager().create(Options);


}
