import 'reflect-metadata';
import * as inversify from 'inversify';
import * as restify from 'restify';
import { interfaces, TYPE, Controller } from 'inversify-restify-utils';
import { IncomingMessage } from 'http';

const METADATA_KEY = {
  controller: "_controller",
  controllerMethod: "_controller-method"
};

interface ApiGatewayRestifyRequest extends restify.Request {
  headers: any;
  method: string;
  url: string;
  statusCode: number;
  statusMessage: string;
}

interface ApiGatewayRestifyResponse extends restify.Response { }

export class ApiGatewayRestifyServer {

  public ControllerContext: any;

  /**
   * Array of collection found through reflection when 
   * the server is instantiated
   * @private
   * @type {interfaces.Controller[]}
   * @memberOf ApiGatewayRestifyServer
   */
  private controllers: interfaces.Controller[];

  /**
   * Instantiate the Gateway Server given a DI container
   */
  constructor(private container: inversify.interfaces.Container) {
    this.controllers = container.getAll<interfaces.Controller>(TYPE.Controller);
    this.ControllerContext = {};
  }
  /**
   * Build the server handlers dynamically per annotation
   */
  public build() {
    for (let ctrlIdx = 0; ctrlIdx < this.controllers.length; ctrlIdx++) {
      // pull controller metadata
      let controllerMetadata: interfaces.ControllerMetadata = Reflect.getOwnMetadata(
        METADATA_KEY.controller,
        this.controllers[ctrlIdx].constructor
      );

      // break out if no controller metadata found
      if (!controllerMetadata) break;

      // pull method metadata
      let methodMetadata: interfaces.ControllerMethodMetadata[] = Reflect.getOwnMetadata(
        METADATA_KEY.controllerMethod,
        this.controllers[ctrlIdx].constructor
      );

      // break out if no method metadata inside the controller
      if (!methodMetadata) break;

      this.ControllerContext[controllerMetadata.target.name] = {};

      // traditional for is ugly, but far more performant 
      for (let methodIdx = 0; methodIdx < methodMetadata.length; methodIdx++) {
        // get route options from method and concatenate to Controller
        let routeOptions: any = typeof methodMetadata[methodIdx].options === "string" ? { path: methodMetadata[methodIdx].options } : methodMetadata[methodIdx].options;

        if (controllerMetadata.path !== "/") {
          routeOptions.path = controllerMetadata.path + routeOptions.path;
        }
        this.ControllerContext[controllerMetadata.target.name][methodMetadata[methodIdx].method] =
          this.handlerFactory(controllerMetadata.target.name, methodMetadata[methodIdx].key)
      }
    }
  }

/**
 * Factory function which will generate a dynamic handler for each 
 * controller method given the method:{ Name, HTTP Verb, and Uri Path }
 * 
 * @param {*} controllerName Controller name given in the annotation
 * @param {string} key The key is the method name on the controller
 * @returns
 */
  private handlerFactory(controllerName: any, key: string): Function {

    /**
     * Generate a dynamic handler for the controller 
     * and key. 
     * 
     * @param {*} event AWS Api Gateway Event
     * @param {*} context AWS Api Gateway Context
     * @param {*} callback NodeJS style callback callback(Error,result)
     * @returns
     */
    return async (event, context, callback) => {

      // restify request parameters for normal operation
      let req: ApiGatewayRestifyRequest, res: ApiGatewayRestifyResponse, next: any;

      res = <ApiGatewayRestifyResponse>{};

      req = <ApiGatewayRestifyRequest>{ method: event.httpMethod, header: event.headers, absoluteUri: (path) => { return ''; } }

      // generate restify parameters from gateway values
      let result: any = (this.container.getNamed(TYPE.Controller, controllerName) as any)[key](req, res, next);

      // if we have no result return empty
      if (!result) {
        callback();
        return;
      }

      // attempt to return the value to the caller
      // on error we return and only give callback an error message
      try {
        // for a Promisified return await the result and then return
        return (result instanceof Promise) ? callback(null, await result) : callback(result);
      } catch (err) {
        return callback(err);
      }
    };
  }
}













