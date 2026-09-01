"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";
import { baseTypeFromNothing } from "../../utilities/type";
import { isolate, anticipate } from "../../utilities/context";

const { breakable } = breakPointUtilities,
      { cut, all, every } = continuationUtilities;

export default define(class CotypeDeclaration extends Declaration {
  constructor(context, string, node, breakPoint, type, superTypes, provisional, propertyDeclarations) {
    super(context, string, node, breakPoint);

    this.type = type;
    this.superTypes = superTypes;
    this.provisional = provisional;
    this.propertyDeclarations = propertyDeclarations;
  }

  getType() {
    return this.type;
  }

  getSuperTypes() {
    return this.superTypes;
  }

  isProvisional() {
    return this.provisional;
  }

  getPropertyDeclarations() {
    return this.propertyDeclarations;
  }

  getCotypeDeclarationNode() {
    const node = this.getNode(),
          cotypeDeclarationNode = node; ///

    return cotypeDeclarationNode;
  }

  getProperties() {
    const properties = this.propertyDeclarations.map((propertyDeclaration) => {
      const property = propertyDeclaration.getProperty();

      return property;
    });

    return properties;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const cotypeDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${cotypeDeclarationString}' cotype declaration...`);

    const verifyType = this.verifyType.bind(this),
          verifySuperTypes = this.verifySuperTypes.bind(this),
          verifyTypePrefix = this.verifyTypePrefix.bind(this),
          verifyPropertyDeclaratisons = this.verifyPropertyDeclaratisons.bind(this);

    return all([
      verifyType,
      verifySuperTypes,
      verifyTypePrefix,
      verifyPropertyDeclaratisons
    ], context, (context, back) => {
      const properties = this.getProperties(),
            typePrefix = context.getTypePrefix(),
            prefixName = (typePrefix !== null) ?
                           typePrefix.getPrefixName() :
                             null;

      this.type.setProvisional(this.provisional);

      this.type.setProperties(properties);

      this.type.setPrefixName(prefixName);

      context.addType(this.type);

      context.debug(`...verified the '${cotypeDeclarationString}' cotype declaration.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${cotypeDeclarationString}' cotype declaration.`);

      return back();
    });
  });

  verifyType(context, forward, back) {
    const typeString = this.type.getString(),
          cotypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${cotypeDeclarationString}' cotype declaration's '${typeString}' type...`);

    let typePresent;

    const typeName = this.type.getName(),
          includeRelease = false;

    typePresent = context.isTypePresentByTypeName(typeName, includeRelease);

    if (typePresent) {
      context.debug(`The '${typeString}' type is already present.`);

      return back();
    }

    const prefixedTypeName = typeName; ///

    typePresent = context.isTypePresentByPrefixedTypeName(prefixedTypeName);

    if (typePresent) {
      context.debug(`The '${typeString}' type is already present.`);

      return back();
    }

    this.type.setProvisional(this.provisional);

    context.debug(`...verified the '${cotypeDeclarationString}' cotype declaration's '${typeString}' type`);

    return forward(context, back);
  }

  verifyTypePrefix(context, forward, back) {
    const typeString = this.type.getString(),
          cotypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${cotypeDeclarationString}' cotype declaration's '${typeString}' type's prefix...`);

    const typePrefixed = this.type.isPrefixed();

    if (typePrefixed) {
      context.debug(`The '${cotypeDeclarationString}' cotype declaration's '${typeString}' type is prefixed.`);

      return back();
    }

    context.debug(`...verified the '${cotypeDeclarationString}' cotype declaration's '${typeString}' type's prefix.`);

    return forward(context, back);
  }

  verifySuperTypes(context, forward, back) {
    const cotypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${cotypeDeclarationString}' cotype declaration's super-types...`);

    const superTypesLength = this.superTypes.length;

    if (superTypesLength === 0) {
      const baseType = baseTypeFromNothing(),
        superTyupe = baseType;  ///

      this.type.setSuperType(superTyupe);

      return forward(context, back);
    }

    const superTypes = []; ///

    return every(this.superTypes, (superType, context, forward, back) => {
      return this.verifySuperType(superType, superTypes, context, forward, back);
    }, context, (context, back) => {
      this.type.setSuperTypes(superTypes);

      context.debug(`...verified the '${cotypeDeclarationString}' cotype declaration's super-types.`);

      return forward(context, back);
    }, back);
  }

  verifySuperType(superType, superTypes, context, forward, back) {
    const superTypeString = superType.getString(),
          cotypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${cotypeDeclarationString}' cotype declaration's '${superTypeString}' super-type...`);

    const nominalTypeName = superType.getNominalTypeName(),
          typeName = nominalTypeName, ///
          typeComparesToTypeName = this.type.compareTypeName(typeName);

    if (typeComparesToTypeName) {
      context.debug(`The '${superTypeString}' super-type's name compares to the ${typeName}' type's name.`);

      return back();
    }

    superType = context.findTypeByNominalTypeName(nominalTypeName);

    if (superType === null) {
      context.debug(`The '${superTypeString}' super-type is not present.`);

      return back();
    }

    superTypes.push(superType);

    context.debug(`...verified the '${cotypeDeclarationString}' cotype declaration's '${superTypeString}' super-type.`);

    return forward(context, back);
  }

  verifyPropertyDeclaratisons(context, forward, back) {
    const typeString = this.type.getString(),
          cotypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${cotypeDeclarationString}' cotype declaration's '${typeString}' type's property declarations...`);

    return isolate((context, forward, back) => {
      return anticipate((context) => {
        return every(this.propertyDeclarations, (propertyDeclaration, context, forward, back) => {
          return propertyDeclaration.verify(context, forward, back);
        }, context, (context, back) => {
          return forward(back);
        }, back);
      }, this.type, context);
    }, context, (context, back) => {
      context.debug(`...verified the '${cotypeDeclarationString}' cotype declaration's '${typeString}' type's property declarations.`);

      return forward(context, back);
    }, back);
  }

  static name = "CotypeDeclaration";
});
