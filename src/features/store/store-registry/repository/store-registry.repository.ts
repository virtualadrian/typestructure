import { Repository } from 'typeorm';
import { provide, inject } from '../../../../_ioc/ioc.conf';
import { TypestructureContext } from '../../../../_lib/data/typestructure.context';

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
   * ORM Repository for StoreRegistry
   * 
   * @private
   * @type {Repository<StoreRegistry>}
   * @memberOf StoreRegistryRepository
   */
  private storeRegistry: Repository<StoreRegistry>

  /**
   * Creates an instance of StoreRegistryRepository.
   * 
   * 
   * @memberOf StoreRegistryRepository
   */
  constructor() {
    this.storeRegistry = TypestructureContext.getRepository(StoreRegistry);
  }

  /**
   * Get a StoreRegistry from the database by id
   *
   * @param {number} id
   * @returns {Promise<StoreRegistry>}
   *
   * @memberOf StoreRegistryRepository
   */
  public get(id: number): Promise<StoreRegistry> {
    // call to the database and return the promisified result
    return this.storeRegistry.findOne({ id: id });
  }

  /**
   * Remove the StoreRegistry from the database
   * @param StoreRegistryModel
   */
  public remove(storeRegistryModel: any): void {
    // call to the database and return the promisified result
    this.storeRegistry.remove(storeRegistryModel);
  }

  /**
   * Get all storeRegistrys
   * @returns {Promise<StoreRegistry>}
   * @memberOf StoreRegistryRepository
   */
  public getAll(): Promise<StoreRegistry[]> {
    // call to the database and return the promisified result
    return this.storeRegistry.find();
  }

  /**
   * create or update a storeRegistry
   * - this can be split into separate ops
   * @param storeRegistryModel
   * @returns {Promise<StoreRegistry[]>}
   */
  public createOrUpdate(storeRegistryModel: any): Promise<StoreRegistry[]>  {
    return this.storeRegistry.persist(storeRegistryModel);
  }
}
