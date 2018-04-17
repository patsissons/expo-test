import { NavigationRouteConfig, NavigationRouteConfigMap } from 'react-navigation';
import * as screens from '../screens';

interface RouteConfig<T> {
  names: { readonly [ Route in keyof T ]: Route };
  routeMap: { readonly [ Route in keyof T ]: NavigationRouteConfig };
}

export type RouteNames = 
  keyof typeof routes.app.names
;

function createRouteConfig<T extends NavigationRouteConfigMap>(map: T): RouteConfig<T> {
  return {
    names: Object
      .keys(map)
      .reduce((m, x) => { m[x] = x; return m; }, {} as any),
    routeMap: map,
  }
}

export const routes = {
  app: createRouteConfig({
    Main: {
      screen: screens.Main,
    },
    Login: {
      screen: screens.Login,
    },
  }),
}
