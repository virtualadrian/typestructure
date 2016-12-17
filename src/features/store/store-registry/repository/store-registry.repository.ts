import { provide, inject } from '../../../../_ioc/ioc.conf';
import { DbContext } from '../../../../_lib/data/typestructure.context';
import { Connection, ConnectionOptions, createConnection, DriverOptions, EntityManager, Repository } from 'typeorm';
import { StoreRegistry } from '../entity';


/**
 * StoreRegistry Repository type
 *
 * @export
 * @class StoreRegistryRepository
 */
@provide('StoreRegistryRepository')
export class StoreRegistryRepository {

  private db: DbContext<StoreRegistry>;

  constructor() {
    this.db = new DbContext<StoreRegistry>(StoreRegistry);
  }

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
    return await this.db.findOneById(id);
  }

  /**
   * Remove the StoreRegistry from the database
   * @param StoreRegistryModel
   */
  async remove(storeRegistry: StoreRegistry): Promise<StoreRegistry> {
    return await this.db.erase(storeRegistry);
  }

  /**
   * Get all storeRegistrys
   * @returns {Promise<StoreRegistry>}
   * @memberOf StoreRegistryRepository
   */
  async getAll(): Promise<StoreRegistry[]> {
    return await this.db.find();
  }

  /**
   * create or update a storeRegistry
   * - this can be split into separate ops
   * @param storeRegistryModel
   * @returns {Promise<StoreRegistry[]>}
   */
  async createOrUpdate(storeRegistry: StoreRegistry): Promise<StoreRegistry | StoreRegistry[]>  {
    return await this.db.save(storeRegistry);
  }
}
