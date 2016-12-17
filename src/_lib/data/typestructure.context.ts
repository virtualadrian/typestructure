import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import * as console from 'console';
import { User } from './../../features/users/user-account/entity/user.entity';
import { Application } from '../../application';
import { ObjectType } from 'typeorm/common/ObjectType';
import { provide } from '../../_ioc/ioc.conf';
import {
  Connection,
  ConnectionManager,
  ConnectionOptions,
  DriverOptions,
  EntityManager,
  getConnectionManager,
  Repository
} from 'typeorm';
import { TypeStructureConnection } from './typestructure-context-dev.config';

export class DbContext<T> extends EntityManager {

  public connection: Connection;

  private entityClass: ObjectType<T>;

  constructor() {
    super(TypeStructureConnection.Default);
  }
   find<Entity>(): Promise<{}[]> {
     return super.find<T>(this.entityClass);
   }

   find<Entity>(condition: ObjectLiteral): Promise<{}[]> {
     return super.find<T>(this.entityClass, condition);
   }

    /**
     * Finds entities that match given conditions.
     */
    find<Entity>(entityClass: ObjectType<Entity>, conditions: ObjectLiteral): Promise<Entity[]> { 

    }
    
    /**
     * Finds entities that match given conditions.
     */
    find<Entity>(entityClass: ObjectType<Entity>, options: FindOptions): Promise<Entity[]> { 

    }

    /**
     * Finds entities that match given conditions.
     */
    find<Entity>(entityClass: ObjectType<Entity>, conditions: ObjectLiteral, options: FindOptions): Promise<Entity[]>;

  // /**
  //  * @param {string} entity
  //  * @returns {Repository<any>}
  //  * @memberOf TypestructureContext
  //  */
  // Execute<T>(entityClass: ObjectType<T>): Promise<Repository<T>> {


  //     // get Context Connection handle and request Repository
  //     return await createConnection(DbContext.Options).then(async conn => {

  //        return conn.getRepository(entityClass)
  //     }).catch((err) => {
  //         throw(err);
  //     });
  // }
}

// export class TypestructureData<T> {

//   /**
//    * Application level app context
//    *
//    * @private
//    * @type {Connection}
//    * @memberOf TypestructureContext
//    */
//   public Data: Repository<T>;

//   private entityClass: ObjectType<T>;

//   public static async Create<T>(entity: ObjectType<T>): TypestructureData<T> {
//     return new TypestructureData<T>(await TypestructureContext.getRepository(entity));
//   }

//   constructor(public data: Repository<T>) {
//     //this.DataRepository = async() => { return await TypestructureContext.getRepository<T>(this.entityClass); };
//   }


//   // /**
//   //  * Gets the current DB Connection for the context
//   //  * creates a new if falsy
//   //  * @returns {Connection}
//   //  */
//   // async function getApiContextConnection(): Promise<Connection> {
//   //   if (apiContextConnection) return apiContextConnection;
//   //   return createConnection(TypeStructureConnectionOptions.Options)
//   //       .then(async conn => { return conn; })
//   //       .catch(err => Application.Catch(err));
//   // }

//   /**
//    * @param {string} entity
//    * @returns {Repository<any>}
//    * @memberOf TypestructureContext
//    */
//   async getRepository(): Promise<Repository<T>> {
//       // get Context Connection handle and request Repository
//       return createConnection(TypeStructureConnectionOptions.Options).then(async conn => {
//          return conn.getRepository(this.entityClass);
//       });
//   }
// }
