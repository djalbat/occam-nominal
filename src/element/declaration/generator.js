"use strict";

import { continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { breakable } = continuationUtilities;

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

  setHypotheses(hypotheses) { this.generator.setHypotheses(hypotheses); }

  async verify(context) {
    let verifies = false;

    await this.break(context);

    const generatorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${generatorDeclarationString}' generator declaration...`);

    const typeVerified = this.verifyType(context);

    if (typeVerified) {
      const generatorVerifies = this.verifyGenerator(context);

      if (generatorVerifies) {
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

  verifyGenerator(context) {
    let generatorVerifies;

    const includeType = false,
          generatorString = this.generator.getString(includeType),
          generatorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${generatorDeclarationString}' generator declaration's '${generatorString}' generator...`);

    generatorVerifies = this.generator.verify(context);

    if (generatorVerifies) {
      context.debug(`...verified the '${generatorDeclarationString}' generator declaration's '${generatorString}' generator.`);
    }

    return generatorVerifies;
  }

  static name = "GeneratorDeclaration";
});
