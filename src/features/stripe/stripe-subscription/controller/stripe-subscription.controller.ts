import * as restify from 'restify';
import { ProvideController } from '../../../../_ioc/ioc.conf';
import { Controller, Get, Post, TYPE } from 'inversify-restify-utils';



@Controller('/foo')
@ProvideController(TYPE.Controller, StripeSubscriptionController)
export class StripeSubscriptionController {

    constructor() {}

    @Get('/')
    private index(req: restify.Request): string {
        return 'GET WAS CALLED with provide controller with ProvideController !!!';
    }

    @Post('/')
    private add(req: restify.Request): string {
        return 'POST -- WAS CALLED ';
    }
}
