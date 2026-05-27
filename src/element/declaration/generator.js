"use strict";

import Declaration from "../declaration";

import { define } from "../../elements";

export default define(class GeneratorDeclaration extends Declaration {
  constructor(context, string, node, breakPoint, type, provisional, generator) {
    super(context, string, node, breakPoint);

    this.type = type;
    this.provisional = provisional;
    this.generator = generator;
  }

  getType() {
    return this.type;
  }

  isProvisional() {
    return this.provisional;
  }

  getGenerator() {
    return this.generator;
  }

  getGeneratorDeclarationNode() {
    const node = this.getNode(),
          generatorDeclarationNode = node; ///

    return generatorDeclarationNode;
  }

  async verify(context) {
    let verifies = false;

    await this.break(context);

    const generatorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${generatorDeclarationString}' generator declaration...`);

    const typeVerified = this.verifyType(context);

    if (typeVerified) {
      const generatorValidates = this.validateGenerator(context);

      if (generatorValidates) {
        this.generator.setType(this.type);

        context.addGenerator(this.generator);

        verifies = true;
      }
    }

    if (verifies) {
      context.debug(`...verified the '${generatorDeclarationString}' generator declaration.`);
    }

    return verifies;
  }

  verifyType(context) {
    let typeVerifies = false;

    const generatorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${generatorDeclarationString}' generator declaration's type...`);

    const nominalTypeName = this.type.getNominalTypeName(),
          typeString = this.type.getString(),
          type = context.findTypeByNominalTypeName(nominalTypeName);

    if (type !== null) {
      const typeCotype = type.isCotype();

      if (typeCotype) {
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
        context.debug(`The '${typeString}' type is not a cotype.`);
      }
    } else {
      context.debug(`The '${typeString}' type is not present.`);
    }

    if (typeVerifies) {
      context.debug(`...verified the '${generatorDeclarationString}' generator declaration's type.`);
    }

    return typeVerifies;
  }

  validateGenerator(context) {
    let generatorValidates;

    const includeType = false,
          generatorString = this.generator.getString(includeType),
          generatorDeclarationString = this.getString();  ///

    context.trace(`Validating the '${generatorDeclarationString}' generator declaration's '${generatorString}' generator...`);

    generatorValidates = this.generator.validate(context);

    if (generatorValidates) {
      context.debug(`...validated the '${generatorDeclarationString}' generator declaration's '${generatorString}' generator.`);
    }

    return generatorValidates;
  }

  static name = "GeneratorDeclaration";
});
