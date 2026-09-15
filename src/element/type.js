"use strict";

import { arrayUtilities } from "necessary";
import {Element, continuationUtilities, breakPointUtilities} from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateType } from "../process/instantiate";
import { BASE_TYPE_SYMBOL } from "../constants";
import { nameFromTypeNode } from "../utilities/element";
import { baseTypeFromNothing } from "../utilities/type";
import { closedFromJSON,
         closedToClosedJSON,
         propertiesFromJSON,
         prefixNameFromJSON,
         superTypesFromJSON,
         provisionalFromJSON,
         prefixNameToPrevixNameJSON,
         superTypesToSuperTypesJSON,
         propertiesToPropertiesJSON,
         provisionalToProvisionalJSON } from "../utilities/json";

const { unbreakable } = breakPointUtilities,
      { push, intersection } = arrayUtilities;

export default define(class Type extends Element {
  constructor(context, string, node, breakPoint, name, closed, prefixName, superTypes, properties, provisional) {
    super(context, string, node, breakPoint);

    this.name = name;
    this.closed = closed;
    this.prefixName = prefixName;
    this.superTypes = superTypes;
    this.properties = properties;
    this.provisional = provisional;
  }

  getName() {
    return this.name;
  }

  isClosed() {
    return this.closed;
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

  getProperties(properties = []) {
    push(properties, this.properties);

    this.superTypes.forEach((superType) => {
      const superTypeProperties = superType.getProperties();

      push(properties, superTypeProperties);
    });

    return properties;
  }

  isProvisional() {
    return this.provisional;
  }

  setName(name) {
    this.name = name;
  }

  setClosed(closed) {
    this.closed = closed;
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

  setSuperType(superType) {
    this.superTypes = [
      superType
    ];
  }

  isOpen() {
    const open = !this.closed;

    return open;
  }

  isBaseType() {
    let baseType = false;

    if (this.name === BASE_TYPE_SYMBOL) {
      baseType = true;
    }

    return baseType;
  }

  isEstablished() {
    const provisional = this.isProvisional(),
          established = !provisional;

    return established;
  }

  retrieveAncestorTypes(ancestorTypes = []) {
    const baseType = this.isBaseType();

    if (!baseType) {
      const ancestorType = this,  ///
            ancestorTypesIncludeAncestorType = ancestorTypes.includes(ancestorType);

      if (!ancestorTypesIncludeAncestorType) {
        ancestorTypes.push(ancestorType);

        this.superTypes.forEach((superType) => {
          superType.retrieveAncestorTypes(ancestorTypes);
        });
      }
    }

    return ancestorTypes;
  }

  isStrict() {
    const cotype = this.isCotype(),
          strict = !cotype;

    return strict;
  }

  isCotype() {
    const properties = this.getProperties(),
          propertiesLength = properties.length,
          cotype = (propertiesLength > 0);

    return cotype;
  }

  isPrefixed() {
    const prefixed = (this.prefixName !== null);

    return prefixed;
  }

  getPrefixedTypeName() {
    let prefixedTypeName = null;

    const prefixed = this.isPrefixed();

    if (prefixed) {
      prefixedTypeName = `${this.prefixName}${this.name}`;
    }

    return prefixedTypeName;
  }

  isJoinedTo(type) {
    let joinedTo = false;

    const ancestorTypes = this.retrieveAncestorTypes(),
          typeAncestorTypes = type.retrieveAncestorTypes(),
          intersectingAncestorTypes = intersection(ancestorTypes, typeAncestorTypes, (ancestorType, typeAncestorType) => {
            const ancestorTypeEqualToATypencestorType = ancestorType.isEqualTo(typeAncestorType);

            if (ancestorTypeEqualToATypencestorType) {
              return true;
            }
          }),
          intersectingAncestorTypesLength = intersectingAncestorTypes.length;

    if (intersectingAncestorTypesLength > 0) {
      joinedTo = true;
    }

    return joinedTo;
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

  compareProvisional(provisional) {
    const comparesToProvisional = (provisional === this.provisional);

    return comparesToProvisional;
  }

  comparePrefixedTypeName(prefixedTypeName) {
    let comparesToPrefixedTypeName = false;

    const prefixed = this.isPrefixed();

    if (prefixed) {
      const prefixedTypeNameA = prefixedTypeName; ///

      prefixedTypeName = this.getPrefixedTypeName();

      const prefixedTypeNameB = prefixedTypeName; ///

      if (prefixedTypeNameA === prefixedTypeNameB) {
        comparesToPrefixedTypeName = true;
      }
    }

    return comparesToPrefixedTypeName;
  }

  toJSON(abridged = false) {
    const string = this.getString();

    const json = {
      string
    };

    if (!abridged) {
      const closedJSON = closedToClosedJSON(this.closed),
            prefixNameJSON = prefixNameToPrevixNameJSON(this.prefixName),
            superTypesJSON = superTypesToSuperTypesJSON(this.superTypes),
            propertiesJSON = propertiesToPropertiesJSON(this.properties),
            provisinoalJSOM = provisionalToProvisionalJSON(this.provisional),
            prefixName = prefixNameJSON,  ///
            superTypes = superTypesJSON,  ///
            properties = propertiesJSON,  ///
            provisional = provisinoalJSOM;  ///

      Object.assign(json, {
        closedJSON,
        prefixName,
        superTypes,
        properties,
        provisional
      });
    }

    return json;
  }

  verify = unbreakable(function (context, forward, back) {
    const typeString = this.getString();

    context.trace(`Verifying the '${typeString}' type...`);

    return this.validate(context, (type, context, back) => {
      context.debug(`...verified the '${typeString}' type.`);

      return forward(type, context, back);
    }, back);
  });

  validate(context, forward, back) {
    let type = null;

    const typeString = this.getString();

    context.trace(`Validating the '${typeString}' type...`);

    const prefixed = this.isPrefixed();

    if (!prefixed) {
      const baseType = baseTypeFromNothing(),
            typeName = this.name, ///
            baseTypeCompareTypeNameTypeName = baseType.compareTypeName(typeName);

      if (baseTypeCompareTypeNameTypeName) {
        type = baseType;  ///
      } else {
        const includeRelease = true,
              includeDependencies = false;

        type = context.findTypeByTypeName(this.name, includeRelease, includeDependencies); ///

        const typePresent = (type !== null);

        if (!typePresent) {
          context.trace(`The '${typeString}' type is not present locally.`);

          return back();
        }
      }
    } else {
      let typePresent,
          includeDependencies;

      const includeRelease = true,
            prefixedTypeName = this.getPrefixedTypeName();

      includeDependencies = false;

      typePresent = context.isTypePresentByPrefixedTypeName(prefixedTypeName, includeRelease, includeDependencies);

      if (typePresent) {
        context.trace(`The '${typeString}' type is present locally.`);

        return back();
      }

      includeDependencies = true;

      type = context.findTypeByPrefixedTypeName(prefixedTypeName, includeRelease, includeDependencies);

      typePresent = (type !== null);

      if (!typePresent) {
        context.trace(`The '${typeString}' type is not present globally.`);

        return back();
      }
    }

    context.debug(`...validated the '${typeString}' type.`);

    return forward(type, context, back);
  }

  static name = "Type";

  static fromJSON(json, context) {
    let type;

    instantiate((context) => {
      const { string } = json,
            typeNode = instantiateType(string, context),
            node = typeNode, ///
            breakPoint = null,
            name = nameFromTypeNode(typeNode, context),
            closed = closedFromJSON(json, context),
            prefixName = prefixNameFromJSON(json, context),
            superTypes = superTypesFromJSON(json, context),
            properties = propertiesFromJSON(json, context),
            provisional = provisionalFromJSON(json);

      context = null; ///

      type = new Type(context, string, node, breakPoint, name, closed, prefixName, superTypes, properties, provisional);
    }, context);

    return type;
  }

  static fromName(name, context) {
    const string = name,  ///
          node = null,
          closed = null,
          breakPoint = null,
          prefixName = null,
          superTypes = [],
          properties = [],
          provisional = false;

    context = null;

    const type = new Type(context, string, node, breakPoint, name, closed, prefixName, superTypes, properties, provisional);

    return type;
  }
});
