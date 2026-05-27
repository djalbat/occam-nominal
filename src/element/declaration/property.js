"use strict";

import Declaration from "../declaration";

import { define } from "../../elements";

export default define(class PropertyDeclaration extends Declaration {
  constructor(context, string, node, breakPoint, type, property) {
    super(context, string, node, breakPoint);

    this.type = type;
    this.property = property;
  }

  getType() {
    return this.type;
  }

  getProperty() {
    return this.property;
  }

  getPropertyDeclarationNode() {
    const node = this.getNode(),
          propertyDeclarationNode = node; ///

    return propertyDeclarationNode;
  }

  async verify(context) {
    let verifies = false;

    await this.break(context);

    const propertyDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${propertyDeclarationString}' property declaration...`);

    const typeVerified = this.verifyType(context);

    if (typeVerified) {
      const propertyValidates = this.validateProperty(context);

      if (propertyValidates) {
        this.property.setType(this.type);

        verifies = true;
      }
    }

    if (verifies) {
      context.debug(`...verified the '${propertyDeclarationString}' property declaration.`);
    }

    return verifies;
  }

  verifyType(context) {
    let typeVerifies = false;

    const propertyDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${propertyDeclarationString}' property declaration's type...`);

    const nominalTypeName = this.type.getNominalTypeName(),
          typeString = this.type.getString(),
          type = context.findTypeByNominalTypeName(nominalTypeName);

    if (type !== null) {
      this.type = type;

      typeVerifies = true;
    } else {
      context.debug(`The '${typeString}' type is not present.`);
    }

    if (typeVerifies) {
      context.debug(`...verified the '${propertyDeclarationString}' property declaration's type.`);
    }

    return typeVerifies;
  }

  validateProperty(context) {
    let propertyValidates;

    const includeType = false,
          propertyString = this.property.getString(includeType),
          propertyDeclarationString = this.getString();  ///

    context.trace(`Validating the '${propertyDeclarationString}' property declaration's '${propertyString}' property...`);

    propertyValidates = this.property.validate(context);

    if (propertyValidates) {
      context.debug(`...validated the '${propertyDeclarationString}' property declaration's '${propertyString}' property.`);
    }

    return propertyValidates;
  }

  static name = "PropertyDeclaration";
});
