import * as restify from 'restify';
import { inject } from 'inversify';
import { ProvideController } from '../../../../_ioc/ioc.conf';
import { Controller, Get, Post, Put, Delete, TYPE } from 'inversify-restify-utils';

import { StripeAccountService } from '../service/stripe-account.service';

@Controller('/api/stripe/account')
@ProvideController(TYPE.Controller, 'StripeAccountController')
export class StripeAccountController {

    /**
     * Constructor injects the service
     */
    constructor(
      @inject('StripeAccountService') private accountSvc: StripeAccountService
    ) {}

    @Get('/:accountId?')
    private getAcccount(req: restify.Request, res: restify.Response): void {
      // call service to get an account with the specific id
      this.accountSvc.getAccount(req.params.userId).then((data) => {
        res.send(data);
      });
    }

    @Get('/')
    private getAllAcccounts(req: restify.Request, res: restify.Response): void {
      this.accountSvc.getAllAccounts().then((data) => {
        res.send(data);
      });
    }

    @Put('/')
    private updateAccount(reqs: restify.Request, res: restify.Response): void {
      this.accountSvc.getAllAccounts().then((data) => {
        res.send(data);
      });
    }

    @Post('/')
    private createAccount(req: restify.Request): string {
        return 'POST -- WAS CALLED -- USING PROVIDERS !';
    }

    @Delete('/')
    private DeleteAccount(req: restify.Request): string {
        return 'POST -- WAS CALLED -- USING PROVIDERS !';
    }
}
