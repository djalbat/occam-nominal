"use strict";

import { breakPointUtilities } from "occam-languages";

import Declaration from "../declaration";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";

const { breakable } = breakPointUtilities;

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

  setHypotheses(hypotheses) { this.constructor.setHypotheses(hypotheses); }

  verify = breakable(function (context, continuation) {
    const constructorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${constructorDeclarationString}' constructor declaration...`);

    const verifyType = this.verifyType.bind(this),
          verifyConstructor = this.verifyConstructor.bind(this);

    return all([
      verifyType,
      verifyConstructor
    ], context, (verifies) => {
      if (verifies) {
        this.constructor.setType(this.type);

        context.addConstructor(this.constructor);
      }

      if (verifies) {
        context.debug(`...verified the '${constructorDeclarationString}' constructor declaration.`);
      }

      return continuation(verifies);
    });
  });

  verifyType(context, continuation) {
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

    return continuation(typeVerifies);
  }

  verifyConstructor(context, continuation) {
    const includeType = false,
          constructorString = this.constructor.getString(includeType),
          constructorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${constructorDeclarationString}' constructor declaration's '${constructorString}' constructor...`);

    this.constructor.verify(context, (constructorVerifies) => {
      if (constructorVerifies) {
        context.debug(`...verified the '${constructorDeclarationString}' constructor declaration's '${constructorString}' constructor.`);
      }

      return continuation(constructorVerifies);
    });
  }

  static name = "ConstructorDeclaration";
});
