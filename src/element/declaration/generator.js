"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { breakable } = breakPointUtilities,
      { asynchronousAll } = continuationUtilities;

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

  isMalformed() {
    const generatorDeclarationNode = this.getGeneratorDeclarationNode(),
          malformed = generatorDeclarationNode.isMalformed()

    return malformed;
  }

  setHypotheses(hypotheses) { this.generator.setHypotheses(hypotheses); }

  verify = breakable(function (context, continuation) {
    const generatorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${generatorDeclarationString}' generator declaration...`);

    const malformed = this.isMalformed();

    if (malformed) {
      const verifies = false;

      context.debug(`Unable to verify the '${generatorDeclarationString}' generator declaration because it is malformed.`);

      return continuation(verifies, context);
    }

    const verifyCotype = this.verifyCotype.bind(this),
          verifyGenerator = this.verifyGenerator.bind(this);

    return asynchronousAll([
      verifyCotype,
      verifyGenerator
    ], context, (verifies, context) => {
      if (verifies) {
        this.generator.setType(this.type);

        context.addGenerator(this.generator);
      }

      if (verifies) {
        context.debug(`...verified the '${generatorDeclarationString}' generator declaration.`);
      }

      return continuation(verifies, context);
    });
  });

  verifyCotype(context, continuation) {
    let cotypeVerifies = false;

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

          cotypeVerifies = true;
        }
      } else {
        context.debug(`The '${typeString}' type is not a cotype.`);
      }
    } else {
      context.debug(`The '${typeString}' type is not present.`);
    }

    if (cotypeVerifies) {
      context.debug(`...verified the '${generatorDeclarationString}' generator declaration's type.`);
    }

    return continuation(cotypeVerifies, context);
  }

  verifyGenerator(context, continuation) {
    const includeType = false,
          generatorString = this.generator.getString(includeType),
          generatorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${generatorDeclarationString}' generator declaration's '${generatorString}' generator...`);

    return this.generator.verify(context, (generatorVerifies, context) => {
      if (generatorVerifies) {
        context.debug(`...verified the '${generatorDeclarationString}' generator declaration's '${generatorString}' generator.`);
      }

      return continuation(generatorVerifies, context);
    });
  }

  static name = "GeneratorDeclaration";
});
