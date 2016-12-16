import { provide, apiConfig } from '../../../../_ioc/ioc.conf';;

import * as StripeApi from 'stripe';


@provide('StripeAccountService')
export class StripeAccountService {

  private stripeApi: StripeNode.Stripe;

  constructor() {
    this.stripeApi = new StripeApi(apiConfig.stripeApiKey, '');
  };

  public getAccount(accountId: string): Promise<StripeNode.accounts.IAccount> {
    return this.stripeApi.accounts.retrieve(accountId);
  }

  public getAllAccounts(): Promise<StripeNode.IList<StripeNode.accounts.IAccount>> {
    return this.stripeApi.accounts.list({ limit: 3 });
  }

  public updateAccount(accountId: string, accountInformation: StripeNode.accounts.IAccount): void {
    this.stripeApi.accounts.update(accountId, accountInformation);
  }
}
