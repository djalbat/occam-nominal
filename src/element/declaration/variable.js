"use strict";

import Declaration from "../declaration";

import { define } from "../../elements";

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

  async verify(context) {
    let verifies = false;

    await this.break(context);

    const variableDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${variableDeclarationString}' variable declaration...`);

    const typeVerifies = this.verifyType(context);

    if (typeVerifies) {
      const variableVerifies = this.verifyVariable(context);

      if (variableVerifies) {
        const declaredVariable = this.variable;

        context.addDeclaredVariable(declaredVariable);

        verifies = true;
      }
    }

    if (verifies) {
      context.debug(`...verified the '${variableDeclarationString}' variable declaration.`);
    }

    return verifies;
  }

  verifyType(context) {
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

    return typeVerifies;
  }

  verifyVariable(context) {
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

    return variableVerifies;
  }

  static name = "VariableDeclaration";
});
