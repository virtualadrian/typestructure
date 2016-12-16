import * as restify from 'restify';
import { inject } from 'inversify';
import { ProvideController } from '../../../../_ioc/ioc.conf';
import { Controller, Get, Post, Put, Delete, TYPE } from 'inversify-restify-utils';

import { UserService } from '../service/user.service';
import { UserCreateRequest } from '../model';

@Controller('/api/user')
@ProvideController(TYPE.Controller, 'UserController')
export class UserController {

    /**
     * Constructor injects the service
     */
    constructor(
      @inject('UserService') private userSvc: UserService
    ) {}

    /**
     * create or update a user
     * 
     * @param {restify.Request} req
     * @param {restify.Response} res
     * 
     * @memberOf UserController
     */
    @Post('/')
    @Put('/')
    public createOrUpdate(req: restify.Request, res: restify.Response): void {
      // call service to get user by id
      this.userSvc.createOrUpdate(req.body).then(user => res.send(user));
    }

    /**
     * remove the user
     * - this is a soft delete
     * @param {restify.Request} req
     * @param {restify.Response} res
     * 
     * @memberOf UserController
     */
    @Delete('/')
    public removeUser(req: restify.Request, res: restify.Response): void {
      // call service to get user by id
      this.userSvc.remove(req.body);
    }

    /**
     * Get a user by the id
     * @param {restify.Request} req
     * @param {restify.Response} res
     *
     * @memberOf UserController
     */
    @Get('/:id?')
    public getUser(req: restify.Request, res: restify.Response): void {

      // call service to get user by id
      if (req.params.id && !(req.params.id === '')) {
        this.userSvc.get(Number(req.params.id)).then(user => res.send(user));
      } else {
        this.userSvc.getAll().then(user => res.send(user));
      }
    }


}
