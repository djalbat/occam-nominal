"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { instantiateGenerator } from "../process/instantiate";
import { termFromGeneratorNode } from "../utilities/element";
import { unifyTermWithGenerator } from "../process/unify";
import { validateTermAsGenerator } from "../process/validate";
import { typeFromJSON, typeToTypeJSON } from "../utilities/json";
import { attempt, serialise, unserialise, instantiate } from "../utilities/context";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";

export default define(class Generator extends Element {
  constructor(context, string, node, breakPoint, term, type) {
    super(context, string, node, breakPoint);

    this.term = term;
    this.type = type;
  }

  getTerm() {
    return this.term;
  }

  getType() {
    return this.type;
  }

  getGeneratorNode() {
    const node = this.getNode(),
          generatorNode = node;  ///

    return generatorNode;
  }

  getString(includeType = true) {
    let string;

    if (includeType) {
      const termString = this.term.getString(),
            typeString = this.type.getString();

      string = `${termString}.${typeString}`;
    } else {
      string = super.getString();
    }

    return string;
  }

  setType(type) {
    this.type = type;
  }

  verify(context) {
    let verifies = false;

    const includeType = false,
          generatorString = this.getString(includeType);

    context.trace(`Verifying the '${generatorString}' generator...`);

    attempt((context) => {
      const termValidates = this.validateTerm(context);

      if (termValidates) {
        verifies = true;
      }

      if (verifies) {
        this.commit(context);
      }
    }, context);

    if (verifies) {
      context.debug(`...verified the '${generatorString}' generator.`);
    }

    return verifies;
  }

  validateTerm(context) {
    let termValidates = false;

    const includeType = false,
          generatorString = this.getString(includeType);

    context.trace(`Validating the '${generatorString}' generator's term...`);

    const termValidatesAsGenerator = validateTermAsGenerator(this.term, context);

    if (termValidatesAsGenerator) {
      termValidates = true;
    }

    if (termValidates) {
      context.debug(`...validated the '${generatorString}' generator's term.`);
    }

    return termValidates;
  }

  unifyTerm(term, context, validateForwards) {
    let termUnifies = false;

    const termString = term.getString(),
          includeType = false,
          generatorString = this.getString(includeType);  ///

    context.trace(`Unifying the '${termString}' term with the '${generatorString}' generator...`);

    const generator = this, ///
          generatorContext = generator.getContext(),
          generalContext = generatorContext,  ///
          specifiContext = context, ///
          termUnifiesWithGenerator = unifyTermWithGenerator(term, generator, generalContext, specifiContext);

    if (termUnifiesWithGenerator) {
      const provisional = this.type.isProvisional();

      term.setType(this.type);

      term.setProvisional(provisional);

      const validatesForwards = validateForwards(term, context);

      if (validatesForwards) {
        termUnifies = true;
      }
    }

    if (termUnifies) {
      context.debug(`...unified the '${termString}' term with the '${generatorString}' generator.`);
    }

    return termUnifies;
  }

  toJSON() {
    const context = this.getContext();

    return serialise((context) => {
      const includeType = false,
            typeJSON = typeToTypeJSON(this.type),
            string = this.getString(includeType);

      let breakPoint;

      breakPoint = this.getBreakPoint();

      const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

      breakPoint = breakPointJSON;  ///

      const type = typeJSON,  ///
            json = {
              context,
              string,
              breakPoint,
              type
            };

      return json;
    }, context);
  }

  static name = "Generator";

  static fromJSON(json, context) {
    let generator;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              generatorNode = instantiateGenerator(string, context),
              node = generatorNode, ///
              breakPoint = breakPointFromJSON(json),
              term = termFromGeneratorNode(generatorNode, context),
              type = typeFromJSON(json, context);

        generator = new Generator(context, string, node, breakPoint, term, type);
      }, json, context);
    }, context);

    return generator;
  }
});
