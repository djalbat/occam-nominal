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
