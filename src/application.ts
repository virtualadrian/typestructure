export namespace Application {
  export declare let Path: string;
  export declare let Catch: Function;
}

/**
 * This is obviously lame will be fixed
 */
Application.Catch = function(err: any) {
  console.dir(err);
};

Application.Path = __dirname;
