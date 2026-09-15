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

  getTypes(includeRelease = true, includeDependencies = true) {
    let types;

    const context = this.getContext();

    types = context.getTypes(includeRelease, includeDependencies);

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

  findTypeByTypeName(typeName, includeRelease = true, includeDependencies = true) {
    const types = this.getTypes(includeRelease, includeDependencies),
          type = findType(types, (type) => {
            const typeComparesToTypeName = type.compareTypeName(typeName);

            if (typeComparesToTypeName) {
              return true;
            }
          });

    return type;
  }

  findTypeByPrefixedTypeName(prefixedTypeName, includeRelease = true, includeDependencies = true) {
    const types = this.getTypes(includeRelease, includeDependencies),
          type = findType(types, (type) => {
            const typeComparesToPrefixedTypeName = type.comparePrefixedTypeName(prefixedTypeName);

            if (typeComparesToPrefixedTypeName) {
              return true;
            }
          });

    return type;
  }

  isTypePresentByTypeName(typeName, includeRelease = true, includeDependencies = true) {
    const type = this.findTypeByTypeName(typeName, includeRelease, includeDependencies),
          typePresent = (type !== null);

    return typePresent;
  }

  isTypePresentByPrefixedTypeName(prefixedTypeName, includeRelease = true, includeDependencies = true) {
    const type = this.findTypeByPrefixedTypeName(prefixedTypeName, includeRelease, includeDependencies),
          typePresent = (type !== null);

    return typePresent;
  }

  static fromType(type, context) {
    const proleptic = new ProlepticContext(context, type);

    return proleptic;
  }
}
