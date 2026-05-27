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

  getTypes() {
    let types;

    const context = this.getContext();

    types = context.getTypes();

    types = [ ///
      this.type,
      ...types
    ];

    return types;
  }

  findTypeByTypeName(typeName) {
    const types = this.getTypes(),
          type = findType(types, (type) => {
            const typeComparesToTypeName = type.compareTypeName(typeName);

            if (typeComparesToTypeName) {
              return true;
            }
          });

    return type;
  }

  findTypeByNominalTypeName(nominalTypeName) {
    const types = this.getTypes(),
          type = findType(types, (type) => {
            const typeComparesToNominalTypeName = type.compareNominalTypeName(nominalTypeName);

            if (typeComparesToNominalTypeName) {
              return true;
            }
          });

    return type;
  }

  findTypeByPrefixedTypeName(prefixedTypeName) {
    const types = this.getTypes(),
          type = findType(types, (type) => {
            const typeComparesToPrefixedTypeName = type.comparePrefixedTypeName(prefixedTypeName);

            if (typeComparesToPrefixedTypeName) {
              return true;
            }
          });

    return type;
  }

  isTypePresentByTypeName(typeName) {
    const type = this.findTypeByTypeName(typeName),
          typePresent = (type !== null);

    return typePresent;
  }

  isTypePresentByNominalTypeName(nominalTypeName) {
    const type = this.findTypeByNominalTypeName(nominalTypeName),
          typePresent = (type !== null);

    return typePresent;
  }

  isTypePresentByPrefixedTypeName(prefixedTypeName) {
    const type = this.findTypeByPrefixedTypeName(prefixedTypeName),
          typePresent = (type !== null);

    return typePresent;
  }

  static fromType(type, context) {
    const proleptic = new ProlepticContext(context, type);

    return proleptic;
  }
}
