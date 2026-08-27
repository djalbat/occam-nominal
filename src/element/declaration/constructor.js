"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { cut, all } = continuationUtilities,
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

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const constructorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${constructorDeclarationString}' constructor declaration...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.trace(`Unable to verify the '${constructorDeclarationString}' constructor declaration because it is malformed.`);

      return back();
    }

    const verifyType = this.verifyType.bind(this),
          verifyConstructor = this.verifyConstructor.bind(this);

    return all([
      verifyType,
      verifyConstructor
    ], context, (context, back) => {
      this.constructor.setType(this.type);

      context.addConstructor(this.constructor);

      context.debug(`...verified the '${constructorDeclarationString}' constructor declaration.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${constructorDeclarationString}' constructor declaration.`);

      return back();
    });
  });

  verifyType(context, forward, back) {
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

    return forward(context, back);
  }

  verifyConstructor(context, forward, back) {
    const includeType = false,
          constructorString = this.constructor.getString(includeType),
          constructorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${constructorDeclarationString}' constructor declaration's '${constructorString}' constructor...`);

    return this.constructor.verify(context, (context, back) => {
      context.debug(`...verified the '${constructorDeclarationString}' constructor declaration's '${constructorString}' constructor.`);

      return forward(context, back);
    }, back);
  }

  static name = "ConstructorDeclaration";
});
