import { provide, inject } from '../../_ioc/ioc.conf';
import { ConnectionOptions, DriverOptions, getConnectionManager, Connection } from 'typeorm';
import { Application } from '../../application';

@provide('TypeStructureConnection')
export class TypeStructureConnection {

  /**
   * This should be replaced with an initialization service 
   * in the server.ts - Ideally loaded from KMS
   */
  public static Options: ConnectionOptions =
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

    /**
     * Default application connection
     * 
     * @static
     * @type {Connection}
     * @memberOf TypeStructureConnection
     */
    public static Default: Connection;
}
