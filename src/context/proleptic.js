"use strict";

import Context from "../context";

import { findType } from "../utilities/type";

export default class ProlepticContext extends Context {
  constructor(context, type) {
    super(context);

    this.type = type;
  };

  getType() {
    return this.type;
  }

  getTypes(includeRelease = true) {
    let types;

    const context = this.getContext();

    types = context.getTypes(includeRelease);

    types = [ ///
      this.type,
      ...types
    ];

    return types;
  }

  getProperties() {
    const properties = [],
          types = this.getTypes();

    types.forEach((type) => {
      type.getProperties(properties);
    });

    return properties;
  }

  findTypeByTypeName(typeName, includeRelease = true) {
    const types = this.getTypes(includeRelease),
          type = findType(types, (type) => {
            const typeComparesToTypeName = type.compareTypeName(typeName);

            if (typeComparesToTypeName) {
              return true;
            }
          });

    return type;
  }

  findTypeByNominalTypeName(nominalTypeName, includeRelease = true) {
    const types = this.getTypes(includeRelease),
          type = findType(types, (type) => {
            const typeComparesToNominalTypeName = type.compareNominalTypeName(nominalTypeName);

            if (typeComparesToNominalTypeName) {
              return true;
            }
          });

    return type;
  }

  findTypeByPrefixedTypeName(prefixedTypeName, includeRelease = true) {
    const types = this.getTypes(includeRelease),
          type = findType(types, (type) => {
            const typeComparesToPrefixedTypeName = type.comparePrefixedTypeName(prefixedTypeName);

            if (typeComparesToPrefixedTypeName) {
              return true;
            }
          });

    return type;
  }

  isTypePresentByTypeName(typeName, includeRelease = true) {
    const type = this.findTypeByTypeName(typeName, includeRelease),
          typePresent = (type !== null);

    return typePresent;
  }

  isTypePresentByNominalTypeName(nominalTypeName, includeRelease = true) {
    const type = this.findTypeByNominalTypeName(nominalTypeName, includeRelease),
          typePresent = (type !== null);

    return typePresent;
  }

  isTypePresentByPrefixedTypeName(prefixedTypeName, includeRelease = true) {
    const type = this.findTypeByPrefixedTypeName(prefixedTypeName, includeRelease),
          typePresent = (type !== null);

    return typePresent;
  }

  static fromType(type, context) {
    const proleptic = new ProlepticContext(context, type);

    return proleptic;
  }
}
