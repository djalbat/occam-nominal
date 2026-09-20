"use strict";

import { arrayUtilities } from "necessary";

import { baseTypeFromNothing } from "../utilities/type";

const { intersection } = arrayUtilities;

export function getNarrowestCommonAncestorTypes(...types) {
  let narrowestCommonAncestorTypes;

  const typeBaseType = types.some((type) => {
    const typeBaseType = type.isBaseType();

    if (typeBaseType) {
      return true;
    }
  });

  if (typeBaseType) {
    const baseType = baseTypeFromNothing(),
          narrowestCommonAncestorType = baseType; ///

    narrowestCommonAncestorTypes = [
      narrowestCommonAncestorType
    ];
  } else {
    const commonAncestorTypes = getCommonAncestorTypes(...types);

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

export function getCommonAncestorTypes(...types) {
  const ancestorTypesArray = types.map((type) => {
          const ancestorTypes = type.retrieveAncestorTypes();

          return ancestorTypes;
        }),
        commonAncestorTypes = ancestorTypesArray.reduce((commonAncestorTypes, ancestorTypes) => {
          commonAncestorTypes = intersection(commonAncestorTypes, ancestorTypes, (commonAncestorType, ancestorType) => {  ///
            const commonAncestorTypeEqualToAancestorType = commonAncestorType.isEqualTo(ancestorType);

            if (commonAncestorTypeEqualToAancestorType) {
              return true;
            }
          });

          return commonAncestorTypes;
        });

  return commonAncestorTypes;
}

export function getNarrowestTypes(...types) {
  const narrowestTypes = types.filter((type) => {
    const narrowerType = someOtherType(types, type, (otherType) => {
      const typeSuperTypeOfOtherType = type.isSuperTypeOf(otherType);

      if (typeSuperTypeOfOtherType) {
        return true;
      }
    });

    if (!narrowerType) {
      return true;
    }
  });

  return narrowestTypes;
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
