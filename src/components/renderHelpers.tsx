import * as React from 'react';
import { Text } from 'react-native';
import { isString, isObject } from '../utils';

export function coerceToText(content: any) {
  if (isString(content)) {
    return (
      <Text>{ content }</Text>
    );
  }

  if (isObject(content)) {
    return (
      <Text { ...content } />
    );
  }

  if (React.isValidElement(content)) {
    return content;
  }

  return false;
}
