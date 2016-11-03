import { provide, apiConfig } from 'ioc/ioc.conf';
import * as StripeApi from 'stripe';

@provide(StripeTokenService)
export class StripeTokenService {

  private stripeApi: StripeNode.Stripe;

  constructor() {
    this.stripeApi = new StripeApi(apiConfig.stripeApiKey, '');
  };

  public get(id: string): Promise<StripeNode.tokens.IToken> {
    return this.stripeApi.tokens.retrieve(id);
  }
}
