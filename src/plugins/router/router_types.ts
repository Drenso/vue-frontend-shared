export interface RouterRoute {
  tokens: string[];
  defaults: {
    [key: string]: string,
  };
  requirements: object;
  hosttokens: string[];
}

export interface RouterRoutes {
  [key: string]: RouterRoute;
}

export interface RouterInterface {
  setRoutingData: (data: object) => void;
  setRoutes: (routes: RouterRoutes) => void;
  getRoutes: () => RouterRoutes;
  setBaseUrl: (baseUrl: string) => void;
  setPrefix: (prefix: string) => void;
  setSchema: (scheme: string) => void;
  getSchema: () => string;
  setHost: (host: string) => void;
  getHost: () => string;
  setPort: (port: string) => void;
  getPort: () => string;
  setLocale: (locale: string) => void;
  getLocale: () => string;
  buildQueryParams: (prefix: string, params: any, add: (prefix: any, params: any) => void) => void;
  getRoute: (name: string) => RouterRoute;
  generate: (name: string, optParams?: { [key: string]: any }, absolute?: boolean) => string;
}

export interface RouterConfiguration {
  router: RouterInterface;
  routes: RouterRoutes;
}
