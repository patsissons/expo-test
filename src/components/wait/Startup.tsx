import React from 'react';
import { Store, AppComponent, withStore } from '../../framework';
import { Wait } from './Wait';

export namespace Startup {
  export interface Props {
  }

  export interface ComponentProps extends AppComponent.Props<Store>, Props {
  }
}

class StartupComponent extends AppComponent<Startup.ComponentProps, Store> {
  render() {
    return (
      <Wait init={ this.init.bind(this) } isWaiting={ this.isWaiting.bind(this) }>
        { this.props.children }
      </Wait>
    );
  }

  protected init() {
    this.props.actions.context.loadEnv();
    this.props.actions.context.loadLocale();
  }

  protected isWaiting(store: Store) {
    return [
      store.context == null,
      store.context.env == null,
      store.context.locale == null,
      store.context.localization == null,
    ].some(x => x);
  }
}

export const Startup = withStore(
  StartupComponent,
);
