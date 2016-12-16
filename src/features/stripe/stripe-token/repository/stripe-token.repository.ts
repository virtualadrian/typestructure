import { provide, apiConfig } from '../../../../_ioc/ioc.conf';

import * as StripeApi from 'stripe';


@provide(StripeTokenRepository)
export class StripeTokenRepository {

  private stripeApi: StripeNode.Stripe;

  constructor() {
    this.stripeApi = new StripeApi(apiConfig.stripeApiKey, '');
  };

  public get(accountId: string): Promise<StripeNode.tokens.IToken> {
    return this.stripeApi.tokens.retrieve(accountId);
  }
}
