import { provide, apiConfig } from 'ioc/ioc.conf';
import * as StripeApi from 'stripe';

import { StripeChargeCreateRequest } from '../model';

@provide('StripeChargeRepository')
export class StripeChargeRepository {

  private stripeApi: StripeNode.Stripe;

  constructor() {
    this.stripeApi = new StripeApi(apiConfig.stripeApiKey, '');
  };
  /**
   * get a charge
   */
  public get(id: string): Promise<StripeNode.charges.ICharge> {
    return this.stripeApi.charges.retrieve(id);
  }

  /**
   * get all charges
   */
  public getAll(): Promise<StripeNode.IList<StripeNode.charges.ICharge>> {
    return this.stripeApi.charges.list({ limit: 1 });
  }

  /**
   * update a charge
   */
  public update(id: string, charge: Object): void {
    let chg: StripeNode.charges.ICharge = <StripeNode.charges.ICharge>charge;

    this.stripeApi.charges.update(id, chg);
  }

  /**
   * create a charge from a charge request
   */
  public create(createOpts: StripeNode.charges.IChargeCreationOptions): Promise<StripeNode.charges.ICharge> {

    // send charge through
    return this.stripeApi.charges.create(createOpts);
  }

  /**
   * capture a charge - thereby securing the payment
   */
  public capture(charge: StripeNode.charges.ICharge): void {
    this.stripeApi.charges.capture(charge.id, charge);
  }
}
