"use strict";

import { breakPointUtilities } from "occam-languages";

import Declaration from "../declaration";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";

const { breakable } = breakPointUtilities;

export default define(class VariableDeclaration extends Declaration {
  constructor(context, string, node, breakPoint, type, variable, provisional) {
    super(context, string, node, breakPoint);

    this.type = type;
    this.variable = variable;
    this.provisional = provisional;
  }

  getType() {
    return this.type;
  }

  getVariable() {
    return this.variable;
  }

  isProvisional() {
    return this.provisional;
  }

  getVariableDeclarationNode() {
    const node = this.getNode(),
          variableDeclarationNode = node; ///

    return variableDeclarationNode;
  }

  verify = breakable(function (context, continuation) {
    const variableDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${variableDeclarationString}' variable declaration...`);

    const typeVerifies = this.verifyType.bind(this),
          variableVerifies = this.verifyVariable.bind(this);

    all([
      typeVerifies,
      variableVerifies
    ],  context, (verifies) => {
      if (verifies) {
        const declaredVariable = this.variable;

        context.addDeclaredVariable(declaredVariable);
      }

      if (verifies) {
        context.debug(`...verified the '${variableDeclarationString}' variable declaration.`);
      }

      continuation(verifies);
    });
  });

  verifyType(context, continuation) {
    let typeVerifies = false;

    const variableDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${variableDeclarationString}' variable declaration's type...`);

    const nominalTypeName = this.type.getNominalTypeName(),
          type = context.findTypeByNominalTypeName(nominalTypeName),
          typePresent = (type !== null)

    if (!typePresent) {
      const typeString = this.type.getString();

      context.debug(`The '${typeString}' type is not present.`);
    } else {
      const typeComparesToProvisional = type.compareProvisional(this.provisional);

      if (!typeComparesToProvisional) {
        const typeString = this.type.getString();

        this.provisional ?
          context.debug(`The '${variableDeclarationString}' variable declaration's '${typeString}' type is present but not provisional.`) :
            context.debug(`The '${variableDeclarationString}' variable declaration's '${typeString}' type is present but provisional.`);
      } else {
        this.variable.setType(type);

        this.variable.setProvisional(this.provisional);

        typeVerifies = true;
      }
    }

    if (typeVerifies) {
      context.debug(`...verified the '${variableDeclarationString}' variable declaration's type.`);
    }

    continuation(typeVerifies);
  }

  verifyVariable(context, continuation) {
    let  variableVerifies = false;

    const variableString = this.variable.getString(),
          variableDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${variableDeclarationString}' variable declaration's '${variableString}' variable...`);

    const variableIdentifier = this.variable.getIdentifier(),
          declaredVariablePresent = context.isDeclaredVariablePresentByVariableIdentifier(variableIdentifier);

    if (declaredVariablePresent) {
      context.debug(`The '${variableString}' declared variable is already present.`);
    } else {
      variableVerifies = true;
    }

    if (variableVerifies) {
      context.debug(`...verified the '${variableDeclarationString}' variable declaration's '${variableString}' variable.`);
    }

    continuation(variableVerifies);
  }

  static name = "VariableDeclaration";
});
