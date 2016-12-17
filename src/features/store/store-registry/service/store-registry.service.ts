import { inject, provide, apiConfig } from '../../../../_ioc/ioc.conf';
import { StoreRegistryRepository } from '../repository';
import { StoreRegistryModel } from '../model';

@provide('StoreRegistryService')
export class StoreRegistryService {

  /**
   * constructor for StoreRegistryService
   */
  constructor(
    @inject('StoreRegistryRepository') private storeRegistryRepository: StoreRegistryRepository) {
  };

  /**
   *
   *
   * @param {number} id
   * @returns {Promise<any>}
   *
   * @memberOf StoreRegistryService
   */
  public get(id: number): Promise<any> {
    return this.storeRegistryRepository.get(id);
  }

  /**
   * Get all of the StoreRegistry entities
   * 
   * @returns {Promise<any>}
   * 
   * @memberOf StoreRegistryService
   */
  async getAll(): Promise<any> {
    return this.storeRegistryRepository.getAll();
  }

  /**
   * Create or update a StoreRegistry
   * 
   * @param {*} storeRegistryModel
   * @returns {Promise<any>}
   * 
   * @memberOf StoreRegistryService
   */
  public createOrUpdate(storeRegistryModel: any): Promise<any> {
    return this.storeRegistryRepository.createOrUpdate(storeRegistryModel);
  }

  /**
   * Remove a StoreRegistry  entity
   * 
   * @param {*} storeRegistryModel
   * 
   * @memberOf StoreRegistryService
   */
  public remove(storeRegistryModel: any): void {
    this.storeRegistryRepository.remove(storeRegistryModel);
  }
}
