import * as restify from 'restify';
import { inject } from 'inversify';
import { ProvideController } from '../../../ioc/ioc.conf';
import { Controller, Get, Post, Put, Delete, TYPE } from 'inversify-restify-utils';

import { StripeChargeService } from '../service/stripe-charge.service';
import { StripeChargeCreateRequest } from './.';

@Controller('/api/stripe/charge')
@ProvideController(TYPE.Controller, 'StripeChargeController')
export class StripeChargeController {

    /**
     * Constructor injects the service
     */
    constructor(
      @inject('StripeChargeService') private chargeSvc: StripeChargeService
    ) {}


    /**
     * Plain get charge request
     */
    @Get('/:id?')
    public get(req: restify.Request, res: restify.Response): void {
      // call service to get charge by id
      this.chargeSvc.get(req.params.id).then((charge) => {

        console.dir(charge.refunds);

        res.send(charge);
      });
    }

    /**
     * Plain get all charges request
     */
    @Get('/')
    public getAll(req: restify.Request, res: restify.Response): void {
      this.chargeSvc.getAll().then((data) => {
        res.send(data);
      });
    }

    /**
     * Update a stripe charge
     */
    @Put('/:id?')
    public update(req: restify.Request, res: restify.Response): void {
      this.chargeSvc.update(req.params.id, req.body);
    }

    /**
     * Create a stripe charge
     */
    @Post('/')
    public create(req: restify.Request, res: restify.Response): void {
      this.chargeSvc.create(<StripeChargeCreateRequest>req.body);
    }

    /**
     * Create a stripe charge
     */
    @Post('/capture')
    public capture(req: restify.Request): void {
        this.chargeSvc.capture(req.body);
    }
}
