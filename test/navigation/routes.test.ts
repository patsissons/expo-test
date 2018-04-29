import { routes } from '../../src/navigation';

describe('navigation', () => {
  describe('routes', () => {
    it('defines a valid app routes mapping', () => {
      expect(routes).toBeTruthy();
      expect(routes.app).toBeTruthy();
    });

    it('defines a app route names', () => {
      expect(routes.app.names).toBeTruthy();
      expect(Object.keys(routes.app.names).length).toBeGreaterThan(0);
    });

    it('defines a app route screen mappings', () => {
      expect(routes.app.routeMap).toBeTruthy();
      expect(Object.keys(routes.app.routeMap).length).toBeGreaterThan(0);
    });

    it('has matching route names to screen mappings', () => {
      const names = Object.keys(routes.app.names);
      const screens = names
        .map(x => (routes.app.routeMap as any)[x])
        .filter(x => x != null);

      expect(names.length).toBe(screens.length);
    });
  });
});
