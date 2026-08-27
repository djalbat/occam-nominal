"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { all } = continuationUtilities,
      { breakable } = breakPointUtilities;

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

  verify = breakable(function (context, forward, back) {
    const variableDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${variableDeclarationString}' variable declaration...`);

    const verifyType = this.verifyType.bind(this),
          verifyVariable = this.verifyVariable.bind(this);

    return all([
      verifyType,
      verifyVariable
    ],  context, (context, back) => {
      const declaredVariable = this.variable;

      context.addDeclaredVariable(declaredVariable);

      context.debug(`...verified the '${variableDeclarationString}' variable declaration.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${variableDeclarationString}' variable declaration.`);

      return back();
    });
  });

  verifyType(context, forward, back) {
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

    if (!typeVerifies) {
      return back();
    }

    context.debug(`...verified the '${variableDeclarationString}' variable declaration's type.`);

    return forward(context, back);
  }

  verifyVariable(context, forward, back) {
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

    if (!variableVerifies) {
      return back();
    }

    context.debug(`...verified the '${variableDeclarationString}' variable declaration's '${variableString}' variable.`);

    return forward(context, back);
  }

  static name = "VariableDeclaration";
});
