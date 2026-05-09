"use strict";

import Declaration from "../declaration";

import { asynchronousUtilities } from "occam-languages";

import { define } from "../../elements";
import { baseTypeFromNothing } from "../../utilities/type";

const { asyncEvery } = asynchronousUtilities;

export default define(class ComplexTypeDeclaration extends Declaration {
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

  getComplexTypeDeclarationNode() {
    const node = this.getNode(),
          complexTypeDeclarationNode = node; ///

    return complexTypeDeclarationNode;
  }

  getProperties() {
    const properties = this.propertyDeclarations.reduce((properties, propertyDeclaration) => {
      const property = propertyDeclaration.getProperty();

      if (property !== null) {
        properties.push(property);
      }

      return properties;
    }, []);

    return properties;
  }

  async verify(context) {
    let verifies = false;

    await this.break(context);

    const complexTypeDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${complexTypeDeclarationString}' complex type declaration...`);

    const typeVerifies = this.verifyType(context);

    if (typeVerifies) {
      const superTypesVerify = this.verifySuperTypes(context);

      if (superTypesVerify) {
        const typePrefixVerifies = this.verifyTypePrefix(context);

        if (typePrefixVerifies) {
          const propertyDeclarationsVerify = await this.verifyPropertyDeclaratisons(context);

          if (propertyDeclarationsVerify) {
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
    }

    if (verifies) {
      context.debug(`...verified the '${complexTypeDeclarationString}' complex type declaration.`);
    }

    return verifies;
  }

  verifyType(context) {
    let typeVerifies = false;

    const typeString = this.type.getString(),
          complexTypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${complexTypeDeclarationString}' complex type declaration's '${typeString}' type...`);

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
      context.debug(`...verified the '${complexTypeDeclarationString}' complex type declaration's '${typeString}' type`);
    }

    return typeVerifies;
  }

  verifySuperType(superType, superTypes, context) {
    let superTypeVerifies = false;

    const superTypeString = superType.getString(),
          complexTypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${complexTypeDeclarationString}' complex type declaration's '${superTypeString}' super-type...`);

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
      context.debug(`...verified the '${complexTypeDeclarationString}' complex type declaration's '${superTypeString}' super-type.`);
    }

    return superTypeVerifies;
  }

  verifySuperTypes(context) {
    let superTypesVerify;

    const superTypes = [],
          complexTypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${complexTypeDeclarationString}' complex type declaration's super-types...`);

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

      context.debug(`...verified the '${complexTypeDeclarationString}' complex type declaration's super-types.`);
    }

    return superTypesVerify;
  }

  verifyTypePrefix(context) {
    let typePrefixVerifies = false;

    const typeString = this.type.getString(),
          complexTypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${complexTypeDeclarationString}' complex type declaration's '${typeString}' type's prefix...`);

    const typePrefixed = this.type.isPrefixed();

    if (!typePrefixed) {
      typePrefixVerifies = true;
    } else {
      context.debug(`The '${complexTypeDeclarationString}' complex type declaration's '${typeString}' type is prefixed.`);
    }

    if (typePrefixVerifies) {
      context.debug(`...verified the '${complexTypeDeclarationString}' complex type declaration's '${typeString}' type's prefix.`);
    }

    return typePrefixVerifies;
  }

  async verifyPropertyDeclaratisons(context) {
    let propertyDeclarationsVerify;

    const typeString = this.type.getString(),
          complexTypeDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${complexTypeDeclarationString}' complex type declaration's '${typeString}' type's property declarations...`);

    const properties = this.getProperties();

    propertyDeclarationsVerify = await asyncEvery(this.propertyDeclarations, async (propertyDeclaration) => {
      const propertyVerifes = await propertyDeclaration.verify(properties, this.type, context);

      if (propertyVerifes) {
        return true;
      }
    });

    if (propertyDeclarationsVerify) {
      context.debug(`...verified the '${complexTypeDeclarationString}' complex type declaration's '${typeString}' type's property declarations.`);
    }

    return propertyDeclarationsVerify;
  }

  static name = "ComplexTypeDeclaration";
});
