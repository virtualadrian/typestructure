import { inject, provide, apiConfig } from '../../../../_ioc/ioc.conf';
import { StripeChargeRepository } from '../repository/stripe-charge.repository';
import * as StripeApi from 'stripe';

import { StripeChargeCreateRequest } from '../model';

@provide('StripeChargeService')
export class StripeChargeService {

  /**
   * get a charge
   */
  constructor(
    @inject('StripeChargeRepository') private chargeRepository: StripeChargeRepository) {
  };

  /**
   * get a charge
   */
  public get(id: string): Promise<StripeNode.charges.ICharge> {
    return this.chargeRepository.get(id);
  }

  /**
   * get all charges
   */
  public getAll(): Promise<StripeNode.IList<StripeNode.charges.ICharge>> {
    return this.chargeRepository.getAll();
  }

  /**
   * update a charge
   */
  public update(id: string, charge: Object): void {
    let chg: StripeNode.charges.ICharge = <StripeNode.charges.ICharge>charge;
    this.chargeRepository.update(id, chg);
  }

  /**
   * create a charge from a charge request
   */
  public create(chargeRequest: StripeChargeCreateRequest): void {

    let chgCreate: StripeNode.charges.IChargeCreationOptions =
    <StripeNode.charges.IChargeCreationOptions>{};

    // create the strip charge
    chgCreate.amount = 1999;
    chgCreate.currency = 'usd';
    chgCreate.source = chargeRequest.tokenId;
    chgCreate.capture = true;
    chgCreate.description = chargeRequest.description;

    // send charge through
    this.chargeRepository.create(chgCreate).then((data) => {
      // return data from stripe
      return data;
    });
  }

  /**
   * capture a charge - thereby securing the payment
   */
  public capture(charge: StripeNode.charges.ICharge): void {
    this.chargeRepository.capture(charge);
  }
}
