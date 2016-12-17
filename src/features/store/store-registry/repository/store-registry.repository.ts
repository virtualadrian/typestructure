import { StoreRegistry } from './../entity/store-registry.entity';
import { provide, inject } from '../../../../_ioc/ioc.conf';
import { DbContext } from '../../../../_lib/data/typestructure.context';
import { Connection, createConnection, Repository, DriverOptions, ConnectionOptions } from 'typeorm';
import { StoreRegistry } from '../entity';


/**
 * StoreRegistry Repository type
 *
 * @export
 * @class StoreRegistryRepository
 */
@provide('StoreRegistryRepository')
export class StoreRegistryRepository {

  /**
   * Get a StoreRegistry from the database by id
   *
   * @param {number} id
   * @returns {Promise<StoreRegistry>}
   *
   * @memberOf StoreRegistryRepository
   */
  async get(id: number): Promise<StoreRegistry> {
    // call to the database and return the promisified result
    return null; // (await TypestructureContext.get(StoreRegistry)).findOne({ id: id });
  }

  /**
   * Remove the StoreRegistry from the database
   * @param StoreRegistryModel
   */
  async remove(storeRegistryModel: any) {
    // call to the database and return the promisified result
    return null; //(await TypestructureContext.get(StoreRegistry)).remove(storeRegistryModel);
  }

  /**
   * Get all storeRegistrys
   * @returns {Promise<StoreRegistry>}
   * @memberOf StoreRegistryRepository
   */
  async getAll(): Promise<StoreRegistry[]> {

    const em: DbContext<StoreRegistry> = new DbContext<StoreRegistry>();
    em.find()
    // return await createConnection(TypeStructureConnectionOptions.Options).then(async conn => {
    //   let repo = conn.getRepository(StoreRegistry);
    //   conn.entityManager
    //   return repo.find();
    // });
  }

  /**
   * create or update a storeRegistry
   * - this can be split into separate ops
   * @param storeRegistryModel
   * @returns {Promise<StoreRegistry[]>}
   */
  async createOrUpdate(storeRegistryModel: any): Promise<StoreRegistry[]>  {
    return null; //(await TypestructureContext.get(StoreRegistry)).persist(storeRegistryModel);
  }
}
