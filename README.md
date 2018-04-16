# Expo TypeScript + React Test

This is a test repo to get started using Expo with TypeScript and `react-native`.

[![Build Status](https://img.shields.io/travis/patsissons/expo-test/master.svg)](https://travis-ci.org/patsissons/expo-test)
[![Coverage Status](https://img.shields.io/coveralls/github/patsissons/expo-test/master.svg)](https://coveralls.io/github/patsissons/expo-test)
[![Github License](https://img.shields.io/github/license/patsissons/expo-test.svg)](https://github.com/patsissons/expo-test/blob/master/LICENSE.md)
[![tslint](https://img.shields.io/badge/tslint-strict-117D6B.svg)](https://github.com/unional/tslint-config-unional/blob/master/style-strict.md)

## Quick Start

`yarn && yarn start`

This will install all dependencies and start an Expo development session.

## Testing

This project uses `jest` and `enzyme` to test react components. This project is also configured to lint against the `tslint-config-unional/strict` style guide and will use `tsc` to validate the TypeScript files. Test files live under `test/**/*.test.tsx`.

You can run the tests with `yarn jest` and you can start a live test session with `yarn watch`. If the structure of a component changes, the snapshot can be updated by running `yarn jest --updateSnapshot --testNamePattern <pattern>` (omit the `--testNamePattern <pattern>` to update all snapshots at once). Running `yarn jest --coverage` will generate a code coverage report.

Testing react components should typically occur through the `enzyme` [Shallow Rendering API](http://airbnb.io/enzyme/docs/api/shallow.html). This API provides a simple *selector* based approach to asserting rendering and structural conditions. Typically a component test will involve a snapshot test, confirm [props](http://airbnb.io/enzyme/docs/api/ShallowWrapper/prop.html) are passed down to subcomponents, and confirm [state](http://airbnb.io/enzyme/docs/api/ShallowWrapper/state.html) is mutated after [simulating](http://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html) user interactions (i.e., a button press). See [devhints.io/enzyme](https://devhints.io/enzyme) for more general usages of `enzyme` and [devhints.io/jest](https://devhints.io/jest) for general jest usages.

You can lint and validate the TypeScript files with `yarn lint` and `yarn validate`.

## Debugging

### Setting up Remote Debugging

Remote debugging can be run through the expo tunnel, your local network, or a usb attached device. It is not recommended to use the expo tunnel as it will come with higher latency. The easiest method is to use the local network, and the fastest method is to use a usb attached device. Each session can be started using `yarn start` and appending either `--tunnel`, `--lan`, or `--localhost`.

### Starting a Local Network Debugging Session

Running `yarn start --lan` will begin a local network expo session. On the phone, [enter the developer menu](https://docs.expo.io/versions/latest/workflow/debugging#developer-menu) (shaking the device should bring up the menu option) and choose **Debug JS Remotely**. This should open up a remote debugger tab in your local browser (`http://ip_address:19001/debugger-ui/`) where you can set up breakpoints and step through the code.

### Debugging with VSCode

There is a [guide](https://github.com/Microsoft/vscode-react-native/blob/master/README.md#debugging-react-native-applications) to setting up a **React Native** debugger in VSCode, as well as [some instructions](https://github.com/Microsoft/vscode-react-native/blob/master/doc/expo.md) for configuring an Expo debugger.

Make sure to install the **React Native Tools** extension before starting, this will create an Expo debugger configuration automatically (**Debug in Exponent**). You will also need to install `react-native-cli` globally so that the debugger process can start (`npm install -g react-native-cli`). Once the setup is complete, debug sessions can be started and breakpoints can be set in VSCode.

### Notes

* [HMR](https://docs.expo.io/versions/latest/workflow/debugging#hot-reloading-and-live-reloading) does not work with TypeScript files (yet). Live reloading still works, but performs a full page (and state) reset.

## Deployment

Most Expo deployment tasks can be accomplished with `yarn exp`.

## TypeScript

We must use `commonjs` module generation as the `es*` generators do not properly support class properties (currently at stage 2). Because of this, we must also set the target to `es5`. While this should have no real effect on the application, it can be noted that once class properties are accepted into the `esnext` standard we should be able to start using *es* modules. This configuration is found in the `tsconfig.json` file.
