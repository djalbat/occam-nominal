"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { all } = continuationUtilities,
      { breakable } = breakPointUtilities;

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

  isMalformed() {
    const constructorDeclarationNode = this.getConstructorDeclarationNode(),
          malformed = constructorDeclarationNode.isMalformed();

    return malformed;
  }

  setHypotheses(hypotheses) { this.constructor.setHypotheses(hypotheses); }

  verify = breakable(function (context, back, forward) {
    const constructorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${constructorDeclarationString}' constructor declaration...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.debug(`Unable to verify the '${constructorDeclarationString}' constructor declaration because it is malformed.`);

      return back(context);
    }

    const verifyType = this.verifyType.bind(this),
          verifyConstructor = this.verifyConstructor.bind(this);

    return all([
      verifyType,
      verifyConstructor
    ], context, back, (context) => {
      this.constructor.setType(this.type);

      context.addConstructor(this.constructor);

      context.debug(`...verified the '${constructorDeclarationString}' constructor declaration.`);

      return forward(context);
    });
  });

  verifyType(context, back, forward) {
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

    if (!typeVerifies) {
      return back();
    }

    context.debug(`...verified the '${constructorDeclarationString}' constructor declaration's type.`);

    return forward(context);
  }

  verifyConstructor(context, back, forward) {
    const includeType = false,
          constructorString = this.constructor.getString(includeType),
          constructorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${constructorDeclarationString}' constructor declaration's '${constructorString}' constructor...`);

    return this.constructor.verify(context, back, (context) => {
      context.debug(`...verified the '${constructorDeclarationString}' constructor declaration's '${constructorString}' constructor.`);

      return forward(context);
    });
  }

  static name = "ConstructorDeclaration";
});
