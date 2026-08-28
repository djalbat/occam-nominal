"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";
import { anticipate } from "../../utilities/context";
import { baseTypeFromNothing } from "../../utilities/type";

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

    const specificContext = context,  ///
          cotypeDeclarationString = this.getString();  ///

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
    ], context, ( _ , back) => {
      const properties = this.getProperties(),
            typePrefix = context.getTypePrefix(),
            prefixName = (typePrefix !== null) ?
                           typePrefix.getPrefixName() :
                             null;

      context = specificContext;  ///

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

  verifyType(context, continuation) {
    let typeVerifies = false;

    const typeString = this.type.getString(),
          cotypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${cotypeDeclarationString}' cotype declaration's '${typeString}' type...`);

    const typeName = this.type.getName(),
          includeRelease = false,
          typePresent = context.isTypePresentByTypeName(typeName, includeRelease);

    if (!typePresent) {
      const prefixedTypeName = typeName, ///
            typePresent = context.isTypePresentByPrefixedTypeName(prefixedTypeName);

      if (!typePresent) {
        this.type.setProvisional(this.provisional);

        typeVerifies = true;
      } else {
        context.debug(`The '${typeString}' type is already present.`);
      }
    } else {
      context.debug(`The '${typeString}' type is already present.`);
    }

    if (typeVerifies) {
      context.debug(`...verified the '${cotypeDeclarationString}' cotype declaration's '${typeString}' type`);
    }

    return continuation(typeVerifies ,context);
  }

  verifyTypePrefix(context, continuation) {
    let typePrefixVerifies = false;

    const typeString = this.type.getString(),
          cotypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${cotypeDeclarationString}' cotype declaration's '${typeString}' type's prefix...`);

    const typePrefixed = this.type.isPrefixed();

    if (!typePrefixed) {
      typePrefixVerifies = true;
    } else {
      context.debug(`The '${cotypeDeclarationString}' cotype declaration's '${typeString}' type is prefixed.`);
    }

    if (typePrefixVerifies) {
      context.debug(`...verified the '${cotypeDeclarationString}' cotype declaration's '${typeString}' type's prefix.`);
    }

    return continuation(typePrefixVerifies, context);
  }

  verifySuperTypes(context, continuation) {
    const cotypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${cotypeDeclarationString}' cotype declaration's super-types...`);

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

        context.debug(`...verified the '${cotypeDeclarationString}' cotype declaration's super-types.`);
      }

      return continuation(superTypesVerify, context);
    });
  }

  verifySuperType(superType, superTypes, context, continuation) {
    let superTypeVerifies = false;

    const superTypeString = superType.getString(),
      cotypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${cotypeDeclarationString}' cotype declaration's '${superTypeString}' super-type...`);

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
      context.debug(`...verified the '${cotypeDeclarationString}' cotype declaration's '${superTypeString}' super-type.`);
    }

    return continuation(superTypeVerifies, context);
  }

  verifyPropertyDeclaratisons(context, continuation) {
    const typeString = this.type.getString(),
          cotypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${cotypeDeclarationString}' cotype declaration's '${typeString}' type's property declarations...`);

    return anticipate((context) => {
      return every(this.propertyDeclarations, (propertyDeclaration, context, continuation) => {
        return propertyDeclaration.verify(context, continuation);
      }, context, (propertyDeclarationsVerify, context) => {
        if (propertyDeclarationsVerify) {
          context.debug(`...verified the '${cotypeDeclarationString}' cotype declaration's '${typeString}' type's property declarations.`);
        }

        return continuation(propertyDeclarationsVerify, context);
      });
    }, this.type, context);
  }

  static name = "CotypeDeclaration";
});
