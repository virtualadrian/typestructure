import * as restify from 'restify';
import { inject } from 'inversify';
import { ProvideController } from '../../../../_ioc/ioc.conf';
import { Controller, Get, Post, Put, Delete, TYPE } from 'inversify-restify-utils';

import { StripeTokenService } from '../service/stripe-token.service';
import { StripeTokenRepository } from '../repository/stripe-token.repository';

@Controller('/api/stripe/token')
@ProvideController(TYPE.Controller, StripeTokenController)
export class StripeTokenController {

    /**
     * Constructor injects the service
     */
    constructor(
      @inject('StripeTokenService') private tokenSvc: StripeTokenService
    ) {}

    /**
     * Plain get token request
     */
    @Get('/:id?')
    private get(req: restify.Request, res: restify.Response): void {
      // call service to get an account with the specific id
      this.tokenSvc.get(req.params.userId).then((data) => {
        res.send(data);
      });
    }
}
