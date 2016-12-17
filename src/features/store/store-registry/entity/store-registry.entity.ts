import { Table, Column, PrimaryColumn } from 'typeorm';
/**
	* The type StoreRegistry.
	*/
@Table('store_registry')
export class StoreRegistry {

  @PrimaryColumn('int')
  public id: number;

  @Column()
  public store: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public streetAddress: string;

  @Column()
  public city: string;

  @Column()
  public state: string;

  @Column()
  public zip: number;

  @Column()
  public country: string;

  @Column()
  public email: string;

  @Column()
  public phone: number;
}
