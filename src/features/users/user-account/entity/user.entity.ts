import { Table, Column, PrimaryColumn } from 'typeorm';
/**
	* The type users.
	*/
@Table('users')
export class User {

  @PrimaryColumn('int', { generated: true })
  public id: number;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public paymentVendorId: number;

  @Column()
  public paymentVendorCardId: number;

  @Column()
  public email: string;
}
