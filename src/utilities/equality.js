"use strict";

import { arrayUtilities } from "necessary";

import { baseTypeFromNothing } from "../utilities/type";

const { intersection } = arrayUtilities;

export function getNarrowestCommonAncestorTypes(typeA, typeB) {
  let narrowestCommonAncestorTypes;

  const typeABaseType = typeA.isBaseType(),
        typeBBaseType = typeB.isBaseType();

  if (typeABaseType || typeBBaseType) {
    const baseType = baseTypeFromNothing(),
          narrowestCommonAncestorType = baseType; ///

    narrowestCommonAncestorTypes = [
      narrowestCommonAncestorType
    ];
  } else {
    const commonAncestorTypes = getCommonAncestorTypes(typeA, typeB);

    narrowestCommonAncestorTypes = commonAncestorTypes.filter((commonAncestorType) => {
      const narrowerCommonAncestorType = someOtherType(commonAncestorTypes, commonAncestorType, (otherCommonAncestorType) => {
        const commonAncestorTypeSuperTypeOfOtherCommonAncestorType = commonAncestorType.isSuperTypeOf(otherCommonAncestorType);

        if (commonAncestorTypeSuperTypeOfOtherCommonAncestorType) {
          return true;
        }
      });

      if (!narrowerCommonAncestorType) {
        return true;
      }
    });
  }

  return narrowestCommonAncestorTypes;
}

export function getCommonAncestorTypes(typeA, typeB) {
  const ancestorTypesA = typeA.retrieveAncestorTypes(),
        ancestorTypesB = typeB.retrieveAncestorTypes(),
        commonAncestorTypes = intersection(ancestorTypesA, ancestorTypesB, (ancestorTypeA, ancestorTypeB) => {
          const ancestorTypeAEqualToAncestorTypeB = ancestorTypeA.isEqualTo(ancestorTypeB);

          if (ancestorTypeAEqualToAncestorTypeB) {
            return true;
          }
        });

  return commonAncestorTypes;
}

function someOtherType(types, type, callback) {
  const otherTypes = types; ///

  return otherTypes.some((otherType) => {
    const otherTypeEqualToType = otherType.isEqualTo(type);

    if (!otherTypeEqualToType) {
      const passed = callback(otherType);

      if (passed) {
        return true;
      }
    }
  });
}
