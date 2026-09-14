"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";
import { baseTypeFromNothing } from "../../utilities/type";

const { breakable } = breakPointUtilities,
      { cut, all, every } = continuationUtilities;

export default define(class TypeDeclaration extends Declaration {
  constructor(context, string, node, breakPoint, type, closed, superTypes, provisional) {
    super(context, string, node, breakPoint);

    this.type = type;
    this.closed = closed;
    this.superTypes = superTypes;
    this.provisional = provisional;
  }

  getType() {
    return this.type;
  }

  isClosed() {
    return this.closed;
  }

  getSuperTypes() {
    return this.superTypes;
  }

  isProvisional() {
    return this.provisional;
  }

  gettypeDeclarationNode() {
    const node = this.getNode(),
          typeDeclarationNode = node; ///

    return typeDeclarationNode;
  }

  getProperties() {
    const properties = [];

    return properties;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const typeDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${typeDeclarationString}' type declaration...`);

    const superTypes = [],
          verifyType = this.verifyType.bind(this),
          verifyCModality = this.verifyCModality.bind(this),
          verifySuperTypes = this.verifySuperTypes.bind(this),
          verifyTypePrefix = this.verifyTypePrefix.bind(this);

    return all([
      verifyType,
      verifySuperTypes,
      verifyTypePrefix,
      verifyCModality
    ], superTypes, context, (superTypes, context, back) => {
      const properties = this.getProperties(),
            typePrefix = context.getTypePrefix(),
            prefixName = (typePrefix !== null) ?
                           typePrefix.getPrefixName() :
                             null;

      this.type.setClosed(this.closed);

      this.type.setProperties(properties);

      this.type.setPrefixName(prefixName);

      this.type.setSuperTypes(superTypes);

      this.type.setProvisional(this.provisional);

      context.addType(this.type);

      context.debug(`...verified the '${typeDeclarationString}' type declaration.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${typeDeclarationString}' type declaration.`);

      return back();
    });
  });

  verifyType(superTypes, context, forward, back) {
    const typeString = this.type.getString(),
      typeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${typeDeclarationString}' type declaration's '${typeString}' type...`);

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

    context.debug(`...verified the '${typeDeclarationString}' type declaration's '${typeString}' type`);

    return forward(superTypes, context, back);
  }

  verifyCModality(superTypes, context, forward, back) {
    const typeString = this.type.getString(),
          typeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${typeDeclarationString}' type declaration's modality...`);

    let implicitCotype = false,
        implicitlyClosed = false;

    superTypes.forEach((superType) => {
      const cotype = superType.isCotype(),
            closed = superType.isClosed();

      if (cotype) {
        implicitCotype = true;
      }

      if (closed) {
        implicitlyClosed = true;
      }
    });

    if (this.closed && !implicitCotype) {
      context.trace(`The '${typeDeclarationString}' type declaration is closed but the '${typeString}' type is not implicitly a cotype.`);

      return back();
    }

    if (implicitlyClosed && !this.closed) {
      context.trace(`The '${typeDeclarationString}' type declaration is not closed but the '${typeString}' type is implicitly closed.`);

      return back();
    }

    context.debug(`...verified the '${typeDeclarationString}' type declaration's modality.`);

    return forward(superTypes, context, back);
  }

  verifyTypePrefix(superTypes, context, forward, back) {
    const typeString = this.type.getString(),
          typeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${typeDeclarationString}' type declaration's '${typeString}' type's prefix...`);

    const typePrefixed = this.type.isPrefixed();

    if (typePrefixed) {
      context.debug(`The '${typeDeclarationString}' type declaration's '${typeString}' type is prefixed.`);

      return back();
    }

    context.debug(`...verified the '${typeDeclarationString}' type declaration's '${typeString}' type's prefix.`);

    return forward(superTypes, context, back);
  }

  verifySuperTypes(superTypes, context, forward, back) {
    const typeDeclarationString = this.getString(); ///

    const superTypesLength = this.superTypes.length;

    if (superTypesLength === 0) {
      const baseType = baseTypeFromNothing(),
            superType = baseType;  ///

      superTypes.push(superType);

      return forward(superTypes, context, back);
    }

    context.trace(`Verifying the '${typeDeclarationString}' type declaration's super-types...`);

    return every(this.superTypes, (superType, context, forward, back) => {
      return this.verifySuperType(superTypes, superType, context, forward, back);
    }, context, (context, back) => {
      context.debug(`...verified the '${typeDeclarationString}' type declaration's super-types.`);

      return forward(superTypes, context, back);
    }, back);
  }

  verifySuperType(superTypes, superType, context, forward, back) {
    const superTypeString = superType.getString(),
          typeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${typeDeclarationString}' type declaration's '${superTypeString}' super-type...`);

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

    context.debug(`...verified the '${typeDeclarationString}' type declaration's '${superTypeString}' super-type.`);

    return forward(context, back);
  }

  static name = "TypeDeclaration";
});
