"use strict";

import { Element } from "occam-languages";
import { arrayUtilities } from "necessary";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateType } from "../process/instantiate";
import { nameFromTypeNode } from "../utilities/element";
import { baseTypeFromNothing } from "../utilities/type";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";
import { propertiesFromJSON,
         prefixNameFromJSON,
         superTypesFromJSON,
         provisionalFromJSON,
         prefixnameToPrevixNameJSON,
         superTypesToSuperTypesJSON,
         propertiesToPropertiesJSON,
         provisionalToProvisionalJSON } from "../utilities/json";

const { push, first } = arrayUtilities;

export default define(class Type extends Element {
  constructor(context, string, node, breakPoint, name, prefixName, superTypes, properties, provisional) {
    super(context, string, node, breakPoint);

    this.name = name;
    this.prefixName = prefixName;
    this.superTypes = superTypes;
    this.properties = properties;
    this.provisional = provisional;
  }

  getName() {
    return this.name;
  }

  getPrefixName() {
    return this.prefixName;
  }

  getSuperTypes() {
    return this.superTypes;
  }

  getTypeNode() {
    const node = this.getNode(),
          typeNode = node;  ///

    return typeNode;
  }

  getProperties(includeSuperTypes = true) {
    const properties = [];

    push(properties, this.properties);

    if (includeSuperTypes) {
      this.superTypes.forEach((superType) => {
        const superTypeProperties = superType.getProperties();

        push(properties, superTypeProperties);
      });
    }

    return properties;
  }

  isProvisional(includeSuperTypes = true) {
    let provisional = this.provisional;

    if (includeSuperTypes) {
      if (!provisional) {
        provisional = this.superTypes.some((superType) => {
          const superTypeProvisional = superType.isProvisional();

          if (superTypeProvisional) {
            return true;
          }
        });
      }
    }

    return provisional;
  }

  setName(name) {
    this.name = name;
  }

  setPrefixName(prefixName) {
    this.prefixName = prefixName;
  }

  setSuperTypes(superTypes) {
    this.superTypes = superTypes;
  }

  setProperties(properties) {
    this.properties = properties;
  }

  setProvisional(provisional) {
    this.provisional = provisional;
  }

  isEstablished(includeSuperTypes = true) {
    const provisional = this.isProvisional(includeSuperTypes),
          established = !provisional;

    return established;
  }

  isPrefixed() {
    const prefixed = (this.prefixName !== null);

    return prefixed;
  }

  getPrefixedName() {
    let prefixedName = null;

    const prefixed = this.isPrefixed();

    if (prefixed) {
      prefixedName = `${this.prefixName}${this.name}`;
    }

    return prefixedName;
  }

  getNominalTypeName() {
    const prefixed = this.isPrefixed(),
          nominalTypeName = prefixed ?
                             `${this.prefixName}${this.name}` :
                                this.name;

    return nominalTypeName;
  }

  isBasic() {
    let basic = false;

    const superTypesLength = this.superTypes.length;

    if (superTypesLength === 1) {
      const firstSuperType = first(this.superTypes),
            superType = firstSuperType, ///
            baseType = baseTypeFromNothing();

      if (superType === baseType) {
        basic = true;
      }
    }

    return basic;
  }

  isRefined() {
    let refined = false;

    const superTypesLength = this.superTypes.length;

    if (superTypesLength === 1) {
      const firstSuperType = first(this.superTypes),
            superType = firstSuperType, ///
            superTypeName = superType.getName();

      if (superTypeName === this.name) {
        refined = true;
      }
    }

    return refined;
  }

  isEqualTo(type) {
    const equalTo = (this === type);

    return equalTo;
  }

  isSubTypeOf(type) {
    let subTypeOf;

    const baseType = baseTypeFromNothing();

    if (this === baseType) {
      subTypeOf = false;
    } else {
      subTypeOf = this.superTypes.some((superType) => { ///
        if (superType === type) {
          return true;
        }

        const superTypeSubTypeOfType = superType.isSubTypeOf(type);

        if (superTypeSubTypeOfType) {
          return true;
        }
      })
    }

    return subTypeOf;
  }

  isSuperTypeOf(type) {
    const subTypeOf = type.isSubTypeOf(this),
          superTypeOf = subTypeOf;  ///

    return superTypeOf;
  }

  isEqualToOrSubTypeOf(type) {
    const equalTo = this.isEqualTo(type),
          subTypeOf = this.isSubTypeOf(type),
          equalToOrSubTypeOf = (equalTo || subTypeOf);

    return equalToOrSubTypeOf;
  }

  isEqualToOrSuperTypeOf(type) {
    const equalTo = this.isEqualTo(type),
          superTypeOf = this.isSuperTypeOf(type),
          equalToOrSuperTypeOf = (equalTo || superTypeOf);

    return equalToOrSuperTypeOf;
  }

  isEqualToSubTypeOrSuperTypeOf(type) {
    const equalTo = this.isEqualTo(type),
          subTypeOf = this.isSubTypeOf(type),
          superTypeOf = this.isSuperTypeOf(type),
          equalToSubTypeOrSuperTypeOf = (equalTo || subTypeOf || superTypeOf);

    return equalToSubTypeOrSuperTypeOf;
  }

  compareTypeName(typeName) {
    const nameTypeName = (this.name === typeName),
          comparesToTypeName = nameTypeName;  ///

    return comparesToTypeName;
  }

  compareProvisional(provisional, includeSupertypes = true) {
    let comparesToProvisional;

    const provisionalA = provisional; ///

    provisional = this.isProvisional(includeSupertypes);

    const provisionalB = provisional; ///

    comparesToProvisional = (provisionalA === provisionalB);

    return comparesToProvisional;
  }

  compareNominalTypeName(nominalTypeName) {
    let comparesToNominalTypeName = false;

    const nameNominalTypeName = (this.name === nominalTypeName);

    if (nameNominalTypeName) {
      comparesToNominalTypeName = true;
    } else {
      const prefixed = this.isPrefixed();

      if (prefixed) {
        const prefixedName = this.getPrefixedName(),
              prefixedNameNominalTypeName = (prefixedName === nominalTypeName);

        if (prefixedNameNominalTypeName) {
          comparesToNominalTypeName = true;
        }
      }
    }

    return comparesToNominalTypeName;
  }

  comparePrefixedTypeName(prefixedTypeName) {
    let comparesToPrefixedTypeName = false;

    const prefixed = this.isPrefixed();

    if (prefixed) {
      const prefixedName = this.getPrefixedName(),
            prefixedTypeNamePrefixedName = (prefixedTypeName === prefixedName);

      if (prefixedTypeNamePrefixedName) {
        comparesToPrefixedTypeName = true;
      }
    }

    return comparesToPrefixedTypeName;
  }

  toJSON(abridged = false) {
    const string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const json = {
      string,
      breakPoint
    };

    if (!abridged) {
      const prefixNameJSON = prefixnameToPrevixNameJSON(this.prefixName),
            superTypesJSON = superTypesToSuperTypesJSON(this.superTypes),
            propertiesJSON = propertiesToPropertiesJSON(this.properties),
            provisinoalJSOM = provisionalToProvisionalJSON(this.provisional),
            prefixName = prefixNameJSON,  ///
            superTypes = superTypesJSON,  ///
            properties = propertiesJSON,  ///
            provisional = provisinoalJSOM;  ///

      Object.assign(json, {
        prefixName,
        superTypes,
        properties,
        provisional
      });
    }

    return json;
  }

  static name = "Type";

  static fromJSON(json, context) {
    return instantiate((context) => {
      const { string } = json,
            typeNode = instantiateType(string, context),
            node = typeNode, ///
            breakPoint = breakPointFromJSON(json),
            name = nameFromTypeNode(typeNode, context),
            prefixName = prefixNameFromJSON(json, context),
            superTypes = superTypesFromJSON(json, context),
            properties = propertiesFromJSON(json, context),
            provisional = provisionalFromJSON(json);

      context = null; ///

      const type = new Type(context, string, node, breakPoint, name, prefixName, superTypes, properties, provisional);

      return type;
    }, context);
  }

  static fromName(name, context) {
    const string = name,  ///
          node = null,
          breakPoint = null,
          prefixName = null,
          superTypes = [],
          properties = [],
          provisional = false;

    context = null;

    const type = new Type(context, string, node, breakPoint, name, prefixName, superTypes, properties, provisional);

    return type;
  }
});
