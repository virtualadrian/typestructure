import { Repository } from 'typeorm';
import { provide, inject } from '../../../../_ioc/ioc.conf';

import { User } from '../entity';
import { TypestructureContext } from '../../../../_lib/data/typestructure.context';

/**
 * User Repository type
 *
 * @export
 * @class UserRepository
 */
@provide('UserRepository')
export class UserRepository {

  /**
   * TypeORM User Repository 
   * 
   * @private
   * @type {User}
   * @memberOf UserRepository
   */
  private user: Repository<User>;

  /**
   * Creates an instance of UserRepository.
   *
   * @param {TypestructureContext} apiCtx
   *
   * @memberOf UserRepository
   */
  constructor() {
    this.user = await TypestructureContext.getRepository(User);
  }

  /**
   * Get a user from the database by id
   *
   * @param {number} id
   * @returns {Promise<User>}
   *
   * @memberOf UserRepository
   */
  public get(id: number): Promise<User> {
    // call to the database and return the promisified result
    return this.user.findOne({ id: id });
  }

  /**
   * Remove the user from the database
   * @param userModel
   */
  public remove(userModel: any): void {
    // call to the database and return the promisified result
    this.user.remove(userModel);
  }

  /**
   * Get all users
   * @returns {Promise<User>}
   * @memberOf UserRepository
   */
  public getAll(): Promise<User[]> {
    // call to the database and return the promisified result
    return this.user.find();
  }

  /**
   * create or update a user
   * 
   * @param userModel
   * @returns {Promise<User[]>}
   */
  public createOrUpdate(userModel: any): Promise<User[]>  {
    return this.user.persist(userModel);
  }
}
