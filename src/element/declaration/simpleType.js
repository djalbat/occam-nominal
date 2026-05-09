"use strict";

import Declaration from "../declaration";

import { define } from "../../elements";
import { baseTypeFromNothing } from "../../utilities/type";

export default define(class SimpleTypeDeclaration extends Declaration {
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

  getSimpleTypeDeclarationNode() {
    const node = this.getNode(),
          simpleTypeDeclarationNode = node; ///

    return simpleTypeDeclarationNode;
  }

  getProperties() {
    const properties = [];

    return properties;
  }

  async verify(context) {
    let verifies = false;

    await this.break(context);

    const simpleTypeDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${simpleTypeDeclarationString}' simple type declaration...`);

    const typeVerifies = this.verifyType(context);

    if (typeVerifies) {
      const superTypesVerify = this.verifySuperTypes(context);

      if (superTypesVerify) {
        const typePrefixVerifies = this.verifyTypePrefix(context);

        if (typePrefixVerifies) {
          const properties = this.getProperties(),
                typePrefix = context.getTypePrefix(),
                prefixName = (typePrefix !== null) ?
                               typePrefix.getPrefixName() :
                                 null;

          this.type.setProvisional(this.provisional);

          this.type.setProperties(properties);

          this.type.setPrefixName(prefixName);

          context.addType(this.type);

          verifies = true;
        }
      }
    }

    if (verifies) {
      context.debug(`...verified the '${simpleTypeDeclarationString}' simple type declaration.`);
    }

    return verifies;
  }

  verifyType(context) {
    let typeVerifies = false;

    const typeString = this.type.getString(),
          simpleTypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${simpleTypeDeclarationString}' simple type declaration's '${typeString}' type...`);

    const typeName = this.type.getName(),
          typePresent = context.isTypePresentByTypeName(typeName);

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
      context.debug(`...verified the '${simpleTypeDeclarationString}' simple type declaration's '${typeString}' type`);
    }

    return typeVerifies;
  }

  verifySuperType(superType, superTypes, context) {
    let superTypeVerifies = false;

    const superTypeString = superType.getString(),
          simpleTypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${simpleTypeDeclarationString}' simple type declaration's '${superTypeString}' super-type...`);

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
      context.debug(`...verified the '${simpleTypeDeclarationString}' simple type declaration's '${superTypeString}' super-type.`);
    }

    return superTypeVerifies;
  }

  verifySuperTypes(context) {
    let superTypesVerify;

    const superTypes = [],
          simpleTypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${simpleTypeDeclarationString}' simple type declaration's super-types...`);

    superTypesVerify = this.superTypes.every((superType) => {
      const superTypeVerifies = this.verifySuperType(superType, superTypes, context);

      if (superTypeVerifies) {
        return true;
      }
    });

    if (superTypesVerify) {
      const superTypesLength = superTypes.length;

      if (superTypesLength === 0) {
        const baseType = baseTypeFromNothing(),
              superTyupe = baseType;  ///

        superTypes.push(superTyupe);
      }

      this.type.setSuperTypes(superTypes);

      context.debug(`...verified the '${simpleTypeDeclarationString}' simple type declaration's super-types.`);
    }

    return superTypesVerify;
  }

  verifyTypePrefix(context) {
    let typePrefixVerifies = false;

    const typeString = this.type.getString(),
          simpleTypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${simpleTypeDeclarationString}' simple type declaration's '${typeString}' type's prefix...`);

    const typePrefixed = this.type.isPrefixed();

    if (!typePrefixed) {
      typePrefixVerifies = true;
    } else {
      context.debug(`The '${simpleTypeDeclarationString}' simple type declaration's '${typeString}' type is prefixed.`);
    }

    if (typePrefixVerifies) {
      context.debug(`...verified the '${simpleTypeDeclarationString}' simple type declaration's '${typeString}' type's prefix.`);
    }

    return typePrefixVerifies;
  }

  static name = "SimpleTypeDeclaration";
});
