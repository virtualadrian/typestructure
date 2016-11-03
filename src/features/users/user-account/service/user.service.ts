import { inject, provide, apiConfig } from '../../../ioc/ioc.conf';
import { UserRepository } from '../repository/user.repository';


import { UserCreateRequest } from './';

@provide('UserService')
export class UserService {

  /**
   * constructor for UserService
   */
  constructor(
    @inject('UserRepository') private userRepository: UserRepository) {
  };

  /**
   *
   *
   * @param {number} id
   * @returns {Promise<any>}
   *
   * @memberOf UserService
   */
  public get(id: number): Promise<any> {
    return this.userRepository.get(id);
  }

  public getAll(): Promise<any> {
    return this.userRepository.getAll();
  }

  public createOrUpdate(userModel: any): Promise<any> {
    return this.userRepository.createOrUpdate(userModel);
  }

  public remove(userModel: any): void {
    this.userRepository.remove(userModel);
  }

  // /**
  //  * get all charges
  //  */
  // public getAll(): Promise<StripeNode.IList<StripeNode.charges.ICharge>> {
  //   return this.chargeRepository.getAll();
  // }

  // /**
  //  * update a charge
  //  */
  // public update(id: string, charge: Object): void {
  //   let chg: StripeNode.charges.ICharge = <StripeNode.charges.ICharge>charge;
  //   this.chargeRepository.update(id, chg);
  // }

  // /**
  //  * create a charge from a charge request
  //  */
  // public create(chargeRequest: StripeChargeCreateRequest): void {

  //   let chgCreate: StripeNode.charges.IChargeCreationOptions =
  //   <StripeNode.charges.IChargeCreationOptions>{};

  //   // create the strip charge
  //   chgCreate.amount = 1999;
  //   chgCreate.currency = 'usd';
  //   chgCreate.source = chargeRequest.tokenId;
  //   chgCreate.capture = true;
  //   chgCreate.description = chargeRequest.description;

  //   // send charge through
  //   this.chargeRepository.create(chgCreate).then((data) => {
  //     // call to linode to create site



  //     // return data from stripe
  //     return data;
  //   });
  // }

  // /**
  //  * capture a charge - thereby securing the payment
  //  */
  // public capture(charge: StripeNode.charges.ICharge): void {
  //   this.chargeRepository.capture(charge);
  // }
}
