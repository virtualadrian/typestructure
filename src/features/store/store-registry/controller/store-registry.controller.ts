import * as restify from 'restify';
import { inject } from 'inversify';
import { ProvideController } from '../../../../_ioc';
import { Controller, Get, Post, Put, Delete, TYPE } from 'inversify-restify-utils';

import { StoreRegistryService } from '../service';
import { StoreRegistryModel } from '../model';

@Controller('/api/store/registry')
@ProvideController(TYPE.Controller, 'StoreRegistryController')
export class StoreRegistryController {

    /**
     * Constructor injects the service
     */
    constructor(
      @inject('StoreRegistryService') private registrySvc: StoreRegistryService
    ) {}

    /**
     * create or update a storeRegistry
     * 
     * @param {restify.Request} req
     * @param {restify.Response} res
     * 
     * @memberOf StoreRegistry
     */
    @Post('/')
    @Put('/')
    public createOrUpdate(req: restify.Request, res: restify.Response): void {
      // call service to get storeRegistry by id
      this.registrySvc.createOrUpdate(req.body).then(storeRegistry => res.send(storeRegistry));
    }

    /**
     * remove the storeRegistry
     * 
     * @param {restify.Request} req
     * @param {restify.Response} res
     * 
     * @memberOf StoreRegistry
     */
    @Delete('/')
    public removeStoreRegistry(req: restify.Request, res: restify.Response): void {
      // call service to get storeRegistry by id
      this.registrySvc.remove(req.body);
    }

    /**
     * Get a storeRegistry by the id
     * @param {restify.Request} req
     * @param {restify.Response} res
     *
     * @memberOf StoreRegistryController
     */
    @Get('/:id?')
    public getStoreRegistry(req: restify.Request, res: restify.Response): void {
      // call service to get storeRegistry by id
      if (req.params.id && !(req.params.id === '')) {
        this.registrySvc.get(Number(req.params.id)).then(storeRegistry => res.send(storeRegistry));
      } else {
        this.registrySvc.getAll().then(storeRegistry => res.send(storeRegistry));
      }
    }


}
