import { NavigationRouteConfig, NavigationRouteConfigMap, NavigationScreenOptions } from 'react-navigation';
import * as screens from '../screens';

interface RouteConfig<T> {
  names: { readonly [ Route in keyof T ]: Route };
  routeMap: { readonly [ Route in keyof T ]: NavigationRouteConfig };
  options?: NavigationScreenOptions;
}

export type RouteNames =
  | keyof typeof routes.app.names
;

function createRouteConfig<T extends NavigationRouteConfigMap>(map: T, options?: NavigationScreenOptions): RouteConfig<T> {
  return {
    names: Object
      .keys(map)
      .reduce(
        (m, x) => { m[x] = x; return m; },
        {} as any,
      ),
    routeMap: map,
    options: {
      ...defaultNavigationOptions,
      ...(options || {}),
    },
  };
}

const defaultNavigationOptions: NavigationScreenOptions = {
};

export const routes = {
  app: createRouteConfig(
    {
      Main: {
        screen: screens.Main,
      },
      Login: {
        screen: screens.Login,
      },
    },
  ),
};
