import * as React from 'react';
import { Text } from 'react-native';
import { isString, isObject } from '../utils';

export function coerceToText(content: any) {
  if (isString(content)) {
    return (
      <Text>{ content }</Text>
    );
  }

  if (React.isValidElement(content)) {
    if (content.type === Text) {
      return content;
    }
  }
  else if (isObject(content)) {
    return (
      <Text { ...content } />
    );
  }

  return false;
}
