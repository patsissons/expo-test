function isTestEnvironment() {
  return typeof __TEST__ === 'boolean' && __TEST__;
}

export function isDebugEnvironment() {
  return __DEV__ && !isTestEnvironment();
}

export function debug(message?: any, ...optionalParams: Array<any>) {
  // istanbul ignore next impossible code path when testing
  if (isDebugEnvironment()) {
    console.debug(message, ...optionalParams);
  }
}
