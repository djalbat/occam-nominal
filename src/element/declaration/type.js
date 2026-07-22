"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { baseTypeFromNothing } from "../../utilities/type";

const { every } = continuationUtilities,
      { breakable } = breakPointUtilities;

export default define(class TypeDeclaration extends Declaration {
  constructor(context, string, node, breakPoint, type, superTypes, provisional) {
    super(context, string, node, breakPoint);

    this.type = type;
    this.superTypes = superTypes;
    this.provisional = provisional;
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

  gettypeDeclarationNode() {
    const node = this.getNode(),
          typeDeclarationNode = node; ///

    return typeDeclarationNode;
  }

  getProperties() {
    const properties = [];

    return properties;
  }

  verify = breakable(function (context, continuation) {
    const typeDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${typeDeclarationString}' type declaration...`);

    const verifyType = this.verifyType.bind(this),
          verifySuperTypes = this.verifySuperTypes.bind(this),
          verifyTypePrefix = this.verifyTypePrefix.bind(this);

    return all([
      verifyType,
      verifySuperTypes,
      verifyTypePrefix
    ], context, (verifies) => {
      if (verifies) {
        const properties = this.getProperties(),
              typePrefix = context.getTypePrefix(),
              prefixName = (typePrefix !== null) ?
                             typePrefix.getPrefixName() :
                               null;

        this.type.setProvisional(this.provisional);

        this.type.setProperties(properties);

        this.type.setPrefixName(prefixName);

        context.addType(this.type);
      }

      if (verifies) {
        context.debug(`...verified the '${typeDeclarationString}' type declaration.`);
      }

      return continuation(verifies, context);
    });
  });

  verifyType(context, continuation) {
    let typeVerifies = false;

    const typeString = this.type.getString(),
          typeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${typeDeclarationString}' type declaration's '${typeString}' type...`);

    const typeName = this.type.getName(),
          includeRelease = false,
          typePresent = context.isTypePresentByTypeName(typeName, includeRelease);

    if (!typePresent) {
      const prefixedTypeName = typeName, ///
            typePresent = context.isTypePresentByPrefixedTypeName(prefixedTypeName);

      if (!typePresent) {
        typeVerifies = true;
      } else {
        context.debug(`The '${typeString}' type is already present.`);
      }
    } else {
      context.debug(`The '${typeString}' type is already present.`);
    }

    if (typeVerifies) {
      context.debug(`...verified the '${typeDeclarationString}' type declaration's '${typeString}' type`);
    }

    return continuation(typeVerifies ,context);
  }

  verifyTypePrefix(context, continuation) {
    let typePrefixVerifies = false;

    const typeString = this.type.getString(),
          typeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${typeDeclarationString}' type declaration's '${typeString}' type's prefix...`);

    const typePrefixed = this.type.isPrefixed();

    if (!typePrefixed) {
      typePrefixVerifies = true;
    } else {
      context.debug(`The '${typeDeclarationString}' type declaration's '${typeString}' type is prefixed.`);
    }

    if (typePrefixVerifies) {
      context.debug(`...verified the '${typeDeclarationString}' type declaration's '${typeString}' type's prefix.`);
    }

    return continuation(typePrefixVerifies, context);
  }

  verifySuperTypes(context, continuation) {
    const typeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${typeDeclarationString}' type declaration's super-types...`);

    const superTypes = []; ///

    return every(this.superTypes, (superType, context, continuation) => {
      return this.verifySuperType(superType, superTypes, context, continuation);
    }, context, (superTypesVerify, context) => {
      if (superTypesVerify) {
        const superTypesLength = superTypes.length;

        if (superTypesLength === 0) {
          const baseType = baseTypeFromNothing(),
                superTyupe = baseType;  ///

          superTypes.push(superTyupe);
        }

        this.type.setSuperTypes(superTypes);

        context.debug(`...verified the '${typeDeclarationString}' type declaration's super-types.`);
      }

      return continuation(superTypesVerify, context);
    });
  }

  verifySuperType(superType, superTypes, context, continuation) {
    let superTypeVerifies = false;

    const superTypeString = superType.getString(),
          typeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${typeDeclarationString}' type declaration's '${superTypeString}' super-type...`);

    const nominalTypeName = superType.getNominalTypeName(),
          typeName = nominalTypeName, ///
          typeComparesToTypeName = this.type.compareTypeName(typeName);

    if (!typeComparesToTypeName) {
      superType = context.findTypeByNominalTypeName(nominalTypeName);

      if (superType !== null) {
        superTypes.push(superType);

        superTypeVerifies = true;
      } else {
        context.debug(`The '${superTypeString}' super-type is not present.`);
      }
    } else {
      context.debug(`The '${superTypeString}' super-type's name compares to the ${typeName}' type's name.`);
    }

    if (superTypeVerifies) {
      context.debug(`...verified the '${typeDeclarationString}' type declaration's '${superTypeString}' super-type.`);
    }

    return continuation(superTypeVerifies, context);
  }

  static name = "TypeDeclaration";
});
