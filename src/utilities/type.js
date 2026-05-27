"use strict";

import elements from "../elements";

import { BASE_TYPE_SYMBOL } from "../constants";

let baseType = null;

export function baseTypeFromNothing() {
  if (baseType === null) {
    const { Type } = elements,
          name = BASE_TYPE_SYMBOL,  ///
          context = null;

    baseType = Type.fromName(name, context);
  }

  return baseType;
}

export function findType(types, callback) {
  const baseType = baseTypeFromNothing();

  types = [
    ...types,
    baseType
  ];

  const type = types.find((type) => {
    const found = callback(type)

    if (found) {
      return true;
    }
  }) || null;

  return type;
}
