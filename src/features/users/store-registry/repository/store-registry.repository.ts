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
   * Creates an instance of StoreRegistryRepository.
   *
   * @param {TypestructureContext} apiCtx
   *
   * @memberOf StoreRegistryRepository
   */
  constructor(
    @inject('TypestructureContext') private apiCtx: TypestructureContext
  ) { }

  /**
   * Get a StoreRegistry from the database by id
   *
   * @param {number} id
   * @returns {Promise<StoreRegistry>}
   *
   * @memberOf StoreRegistryRepository
   */
  public get(id: number): Promise<StoreRegistry> {
    const StoreRegistry: Repository<StoreRegistry> = this.apiCtx.getRepository('StoreRegistry');

    // call to the database and return the promisified result
    return StoreRegistry.findOne({ id: id });
  }

  /**
   * Remove the StoreRegistry from the database
   * @param StoreRegistryModel
   */
  public remove(storeRegistryModel: any): void {
    const storeRegistry: Repository<StoreRegistry> = this.apiCtx.getRepository('StoreRegistry');

    // call to the database and return the promisified result
    storeRegistry.remove(storeRegistryModel);
  }

  /**
   * Get all storeRegistrys
   * @returns {Promise<StoreRegistry>}
   * @memberOf StoreRegistryRepository
   */
  public getAll(): Promise<StoreRegistry[]> {
    const storeRegistry: Repository<StoreRegistry> = this.apiCtx.getRepository('StoreRegistry');

    // call to the database and return the promisified result
    return storeRegistry.find();
  }

  /**
   * create or update a storeRegistry
   * - this can be split into separate ops
   * @param storeRegistryModel
   * @returns {Promise<StoreRegistry[]>}
   */
  public createOrUpdate(storeRegistryModel: any): Promise<StoreRegistry[]>  {
    const storeRegistry: Repository<StoreRegistry> = this.apiCtx.getRepository('StoreRegistry');

    // call to the database and return the promisified result
    let usr = storeRegistry.persist(storeRegistryModel);

    return usr;
  }
}
