import 'reflect-metadata';
import { Kernel, inject } from 'inversify';
import { makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators';

// create kernel and default provider
const kernel = new Kernel();
const provide = makeProvideDecorator(kernel);

// create provside controller
let fluentProvider = makeFluentProvideDecorator(kernel);
const ProvideController = function(identifier, name) {
    return fluentProvider(identifier)
              .whenTargetNamed(name)
              .done();
};

const apiConfig = {
  stripeApiKey: ''
};

// export ioc settings
export { kernel, provide, ProvideController, inject, apiConfig };
