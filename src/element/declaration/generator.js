"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Declaration from "../declaration";

import { define } from "../../elements";

const { cut, all } = continuationUtilities,
      { breakable } = breakPointUtilities;

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

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const generatorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${generatorDeclarationString}' generator declaration...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.trace(`Unable to verify the '${generatorDeclarationString}' generator declaration because it is malformed.`);

      return back();
    }

    const verifyCotype = this.verifyCotype.bind(this),
          verifyGenerator = this.verifyGenerator.bind(this);

    return all([
      verifyCotype,
      verifyGenerator
    ], context, (context, back) => {
      this.generator.setType(this.type);

      context.addGenerator(this.generator);

      context.debug(`...verified the '${generatorDeclarationString}' generator declaration.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to verify the '${generatorDeclarationString}' generator declaration.`);

      return back();
    });
  });

  verifyCotype(context, forward, back) {
    const generatorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${generatorDeclarationString}' generator declaration's type...`);

    const nominalTypeName = this.type.getNominalTypeName(),
          typeString = this.type.getString(),
          type = context.findTypeByNominalTypeName(nominalTypeName);

    if (type === null) {
      context.debug(`The '${typeString}' type is not present.`);

      return back();
    }

    const typeCotype = type.isCotype();

    if (!typeCotype) {
      context.debug(`The '${typeString}' type is a type.`);

      return back();
    }

    const provisional = this.isProvisional(),
          typeComparesToProvisional = type.compareProvisional(provisional);

    if (!typeComparesToProvisional) {
      provisional ?
        context.debug(`The '${typeString}' type is present but not provisional.`) :
          context.debug(`The '${typeString}' type is present but provisional.`);

      return back();
    }

    this.type = type;

    context.debug(`...verified the '${generatorDeclarationString}' generator declaration's type.`);

    return forward(context, back);
  }

  verifyGenerator(context, forward, back) {
    const includeType = false,
          generatorString = this.generator.getString(includeType),
          generatorDeclarationString = this.getString();  ///

    context.trace(`Verifying the '${generatorDeclarationString}' generator declaration's '${generatorString}' generator...`);

    return this.generator.verify(context, (context, back) => {
      context.debug(`...verified the '${generatorDeclarationString}' generator declaration's '${generatorString}' generator.`);

      return forward(context, back);
    }, back);
  }

  static name = "GeneratorDeclaration";
});
