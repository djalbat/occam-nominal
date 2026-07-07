"use strict";

import { continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { breakable } = continuationUtilities;

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

    if (this.property !== null) {
      const typeVerified = this.verifyType(context);

      if (typeVerified) {
        const propertyVerifies = this.verifyProperty(context);

        if (propertyVerifies) {
          this.property.setType(this.type);

          verifies = true;
        }
      }
    } else {
      context.debug(`Cannot verify the the '${propertyDeclarationString}' property declaration because it is nonsense.`);
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

  verifyProperty(context) {
    let propertyVerifies = false;

    const includeType = false,
          propertyString = this.property.getString(includeType),
          propertyDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${propertyDeclarationString}' property declaration's '${propertyString}' property...`);

    const property = this.property.verify(context);

    if (property !== null) {
      propertyVerifies = true;
    }

    if (propertyVerifies) {
      context.debug(`...verified the '${propertyDeclarationString}' property declaration's '${propertyString}' property.`);
    }

    return propertyVerifies;
  }

  static name = "PropertyDeclaration";
});
