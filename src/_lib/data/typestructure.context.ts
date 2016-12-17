import { provide, inject } from '../../_ioc/ioc.conf';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { User } from './../../features/users/user-account/entity/user.entity';
import { Application } from '../../application';
import { ObjectType } from 'typeorm/common/ObjectType';
import {
  Connection,
  ConnectionManager,
  ConnectionOptions,
  DriverOptions,
  EntityManager,
  getConnectionManager,
  Repository,
  FindOptions
} from 'typeorm';
import { TypeStructureConnection } from './typestructure.connection';

@provide('DbContext')
export class DbContext<T> extends EntityManager {

  public connection: Connection;

  constructor(private entityClass: ObjectType<T>) {
    super(TypeStructureConnection.Default);

    if (TypeStructureConnection.Default) return;
    getConnectionManager().createAndConnect(TypeStructureConnection.Options).then(async connection => {
      TypeStructureConnection.Default = connection;
    });
  }

  async save(entity: T): Promise<T> {
    return await this.connection.getRepository(this.entityClass).persist(entity);
  }

  async erase(entity: T): Promise<T|undefined> {
    const repository = this.connection.getRepository(this.entityClass);
    return await repository.findOne(entity).then(async existing => {
      if (existing) {
        return repository.remove(existing);
      }
    });
  }

  async find(conditions?: ObjectLiteral, options?: FindOptions): Promise<T[]> {
    return await super.find<T>(this.entityClass, conditions, options);
  }

  async findOne(conditions?: ObjectLiteral, options?: FindOptions): Promise<T | undefined> {
    return await super.findOne<T>(this.entityClass, conditions, options);
  }

  async findOneById(id: any, options?: FindOptions): Promise<T | undefined> {
    return await super.findOneById(this.entityClass, id, options);
  }

  async findByIds(entityClass: ObjectType<T>, ids: any[], options?: FindOptions): Promise<T[]> {
    return await super.findByIds(this.entityClass, ids, options);
  }

  async persistByName<T>(targetOrEntity: string, entity: T): Promise<T> {
    return await super.persist<T>(targetOrEntity, entity);
  }
}
