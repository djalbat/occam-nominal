"use strict";

import Declaration from "../declaration";

import { define } from "../../elements";

export default define(class PropertyDeclaration extends Declaration {
  constructor(context, string, node, breakPoint, property, type) {
    super(context, string, node, breakPoint);

    this.property = property;
    this.type = type;
  }

  getProperty() {
    return this.property;
  }

  getType() {
    return this.type;
  }

  async verify(properties, type, context) {
    let verifies = false;

    await this.break(context);

    const propertyDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${propertyDeclarationString}' property declaration...`);

    if (this.property !== null) {
      const typeVerifies = this.verifyType(type, context);

      if (typeVerifies) {
        const propertyVerifies = this.verifyProperty(properties, context);

        if (propertyVerifies) {
          this.property.setType(this.type);

          verifies = true;
        }
      }
    } else {
      context.debug(`Unable to verify the '${propertyDeclarationString}' property declaration because it is nonsense.`);
    }

    if (verifies) {
      context.debug(`...verified the '${propertyDeclarationString}' property declaration.`);
    }

    return verifies;
  }

  verifyType(type, context) {
    let typeVerifies = false;

    const propertyDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${propertyDeclarationString}' property declaration's type...`);

    const nominalTypeName = this.type.getNominalTypeName(),
          comparesToNominalTypeName = type.compareNominalTypeName(nominalTypeName);

    if (comparesToNominalTypeName) {
      this.type = type;

      typeVerifies = true;
    } else {
      const type = context.findTypeByTypeName(nominalTypeName);

      if (type !== null) {
        this.type = type;

        typeVerifies = true;
      } else {
        const typeString = this.type.getString();

        context.debug(`The '${typeString}' type is not present.`);
      }
    }

    if (typeVerifies) {
      context.debug(`...verified the '${propertyDeclarationString}' property declaration's type`);
    }

    return typeVerifies;
  }

  verifyProperty(properties, context) {
    let propertyVerifies;

    const propertyString = this.property.getString(),
          propertyDeclarationString = this.getString(); ///

    context.trace(`Verifying the '${propertyDeclarationString}' property declaration's '${propertyString}' property...`);

    propertyVerifies = this.property.verify(properties, context);

    if (propertyVerifies) {
      context.debug(`...verified the '${propertyDeclarationString}' property declaration's '${propertyString}' type`);
    }

    return propertyVerifies;
  }

  static name = "PropertyDeclaration";
});
