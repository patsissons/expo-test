# Expo TypeScript + React Test

This is a test repo to get started using Expo with TypeScript and `react-native`.

## Quick Start

`yarn && yarn start`

This will install all dependencies and start an Expo development session.

## Testing

This project uses `jest` and `react-test-renderer` to test react components. This project is also configured to lint against the `tslint-config-unional/strict` style guide and will use `tsc` to validate the TypeScript files. Test files live under `test/**/*.test.tsx`.

You can run the tests with `yarn jest` and you can start a live test session with `yarn watch`.

You can lint and validate the TypeScript files with `yarn lint` and `yarn validate`.

## Deployment

Most Expo deployment tasks can be accomplished with `yarn exp`.
