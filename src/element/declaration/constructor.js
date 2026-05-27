"use strict";

import Declaration from "../declaration";

import { define } from "../../elements";

export default define(class ConstructorDeclaration extends Declaration {
  constructor(context, string, node, breakPoint, type, provisional, constructor) {
    super(context, string, node, breakPoint);

    this.type = type;
    this.provisional = provisional;
    this.constructor = constructor;
  }

  getType() {
    return this.type;
  }

  isProvisional() {
    return this.provisional;
  }

  getConstructor() {
    return this.constructor;
  }

  getConstructorDeclarationNode() {
    const node = this.getNode(),
          constructorDeclarationNode = node; ///

    return constructorDeclarationNode;
  }

  async verify(context) {
    let verifies = false;

    await this.break(context);

    const constructorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${constructorDeclarationString}' constructor declaration...`);

    const typeVerified = this.verifyType(context);

    if (typeVerified) {
      const constructorValidates = this.validateConstructor(context);

      if (constructorValidates) {
        this.constructor.setType(this.type);

        context.addConstructor(this.constructor);

        verifies = true;
      }
    }

    if (verifies) {
      context.debug(`...verified the '${constructorDeclarationString}' constructor declaration.`);
    }

    return verifies;
  }

  verifyType(context) {
    let typeVerifies = false;

    const constructorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${constructorDeclarationString}' constructor declaration's type...`);

    const nominalTypeName = this.type.getNominalTypeName(),
          typeString = this.type.getString(),
          type = context.findTypeByNominalTypeName(nominalTypeName);

    if (type !== null) {
      const typeCotype = type.isCotype();

      if (!typeCotype) {
        const provisional = this.isProvisional(),
              typeComparesToProvisional = type.compareProvisional(provisional);

        if (!typeComparesToProvisional) {
          provisional ?
            context.debug(`The '${typeString}' type is present but not provisional.`) :
              context.debug(`The '${typeString}' type is present but provisional.`);
        } else {
          this.type = type;

          typeVerifies = true;
        }
      } else {
        context.debug(`The '${typeString}' type is a cotype.`);
      }
    } else {
      context.debug(`The '${typeString}' type is not present.`);
    }

    if (typeVerifies) {
      context.debug(`...verified the '${constructorDeclarationString}' constructor declaration's type.`);
    }

    return typeVerifies;
  }

  validateConstructor(context) {
    let constructorValidates;

    const includeType = false,
          constructorString = this.constructor.getString(includeType),
          constructorDeclarationString = this.getString();  ///

    context.trace(`Validating the '${constructorDeclarationString}' constructor declaration's '${constructorString}' constructor...`);

    constructorValidates = this.constructor.validate(context);

    if (constructorValidates) {
      context.debug(`...validated the '${constructorDeclarationString}' constructor declaration's '${constructorString}' constructor.`);
    }

    return constructorValidates;
  }

  static name = "ConstructorDeclaration";
});
