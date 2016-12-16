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
   * Creates an instance of UserRepository.
   *
   * @param {TypestructureContext} apiCtx
   *
   * @memberOf UserRepository
   */
  constructor(
    @inject('TypestructureContext') private apiCtx: TypestructureContext
  ) { }

  /**
   * Get a user from the database by id
   *
   * @param {number} id
   * @returns {Promise<User>}
   *
   * @memberOf UserRepository
   */
  public get(id: number): Promise<User> {
    const user: Repository<User> = this.apiCtx.getRepository('User');

    // call to the database and return the promisified result
    return user.findOne({ id: id });
  }

  /**
   * Remove the user from the database
   * @param userModel
   */
  public remove(userModel: any): void {
    const user: Repository<User> = this.apiCtx.getRepository('User');

    // call to the database and return the promisified result
    user.remove(userModel);
  }

  /**
   * Get all users
   * @returns {Promise<User>}
   * @memberOf UserRepository
   */
  public getAll(): Promise<User[]> {
    const user: Repository<User> = this.apiCtx.getRepository('User');

    // call to the database and return the promisified result
    return user.find();
  }

  /**
   * create or update a user
   * - this can be split into separate ops
   * @param userModel
   * @returns {Promise<User[]>}
   */
  public createOrUpdate(userModel: any): Promise<User[]>  {
    const user: Repository<User> = this.apiCtx.getRepository('User');

    // call to the database and return the promisified result
    let usr = user.persist(userModel);

    return usr;
  }
}
