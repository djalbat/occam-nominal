"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateType } from "../process/instantiate";
import { BASE_TYPE_SYMBOL } from "../constants";
import { nameFromTypeNode } from "../utilities/element";
import { baseTypeFromNothing } from "../utilities/type";
import { closedFromJSON,
         nameToNameJSON,
         closedToClosedJSON,
         propertiesFromJSON,
         prefixNameFromJSON,
         superTypesFromJSON,
         provisionalFromJSON,
         prefixNameToPrevixNameJSON,
         superTypesToSuperTypesJSON,
         propertiesToPropertiesJSON,
         provisionalToProvisionalJSON } from "../utilities/json";

const { all } = continuationUtilities,
      { unbreakable } = breakPointUtilities,
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
    const prefixed = this.isPrefixed(),
          strict = !prefixed;

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

  verify = unbreakable(function (context, forward, back) {
    const typeString = this.getString();

    context.trace(`Verifying the '${typeString}' type...`);

    return this.validate(context, (type, context, back) => {
      context.debug(`...verified the '${typeString}' type.`);

      return forward(type, context, back);
    }, back);
  });

  validate(context, forward, back) {
    const typeString = this.getString();  ///

    context.trace(`Valiading the '${typeString}' type...`);

    const type = null,
          validateWhenStrict = this.validateWhenStrict.bind(this),
          validateWhenPrefixed = this.validateWhenPrefixed.bind(this);

    return all([
      validateWhenStrict,
      validateWhenPrefixed
    ], type, context, (type, context, back) => {
      context.debug(`...validated the '${typeString}' type.`);

      return forward(type, context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to validate the '${typeString}' type.`);

      return back();
    });
  }

  validateWhenStrict(type, context, forward, back) {
    const strict = this.isStrict();

    if (!strict) {
      return forward(type, context, back);
    }

    const typeString = this.getString();

    context.trace(`Validating the '${typeString}' strict type...`);

    const typeName = this.name, ///
          baseType = baseTypeFromNothing(),
          baseTypeCompareTypeNameTypeName = baseType.compareTypeName(typeName);

    if (baseTypeCompareTypeNameTypeName) {
      type = baseType;  ///
    } else {
      const alisedType = context.findaliasedTypeByTypeName(typeName);

      if (alisedType !== null) {
        type = alisedType;  ///
      } else {
        const includeRelease = true,
              includeDependencies = false;

        type = context.findTypeByTypeName(typeName, includeRelease, includeDependencies); ///

        if (type === null) {
          context.trace(`The '${typeString}' strict type is not present locally.`);

          return back();
        }
      }
    }

    context.debug(`...validated the '${typeString}' strict type.`);

    return forward(type, context, back);
  }

  validateWhenPrefixed(type, context, forward, back) {
    const prefixed = this.isPrefixed();

    if (!prefixed) {
      return forward(type, context, back);
    }

    const typeString = this.getString();

    context.trace(`Validating the '${typeString}' prefixed type...`);

    const prefixedTypeName = this.getPrefixedTypeName(),
          includeRelease = true;

    let includeDependencies;

    includeDependencies = false;

    const typePresent = context.isTypePresentByPrefixedTypeName(prefixedTypeName, includeRelease, includeDependencies);

    if (typePresent) {
      context.trace(`The '${typeString}' prefixed type is present locally.`);

      return back();
    }

    includeDependencies = true;

    type = context.findTypeByPrefixedTypeName(prefixedTypeName, includeRelease, includeDependencies);

    if (type === null) {
      context.trace(`The '${typeString}' prefixed type is not present globally.`);

      return back();
    }

    context.debug(`...validated the '${typeString}' prefixed type.`);

    return forward(type, context, back);
  }

  toJSON(abridged = false) {
    const string = this.getString(),
          nameJSON = nameToNameJSON(this.name),
          prefixNameJSON = prefixNameToPrevixNameJSON(this.prefixName),
          name = nameJSON,  ///
          prefixName = prefixNameJSON;  ///

    const json = {
      string,
      name,
      prefixName
    };

    if (!abridged) {
      const closedJSON = closedToClosedJSON(this.closed),
            superTypesJSON = superTypesToSuperTypesJSON(this.superTypes),
            propertiesJSON = propertiesToPropertiesJSON(this.properties),
            provisinoalJSOM = provisionalToProvisionalJSON(this.provisional),
            superTypes = superTypesJSON,  ///
            properties = propertiesJSON,  ///
            provisional = provisinoalJSOM;  ///

      Object.assign(json, {
        closedJSON,
        superTypes,
        properties,
        provisional
      });
    }

    return json;
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

      properties.forEach((property) => {
        const propertyType = property.getType();

        if (propertyType === null) {
          property.setType(type);
        }
      });
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
