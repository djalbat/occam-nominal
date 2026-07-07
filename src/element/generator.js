"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { baseTypeFromNothing } from "../utilities/type";
import { instantiateGenerator } from "../process/instantiate";
import { termFromGeneratorNode } from "../utilities/element";
import { validateTermAsVariable } from "../process/validation";
import { unifyTermWithGenerator } from "../process/unify";
import { validateTermAsGenerator } from "../process/validate";
import { typeFromJSON, typeToTypeJSON } from "../utilities/json";
import { attempt, serialise, unserialise, instantiate } from "../utilities/context";

const { every, breakable } = continuationUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Generator extends Element {
  constructor(context, string, node, breakPoint, term, type, hypotheses) {
    super(context, string, node, breakPoint);

    this.term = term;
    this.type = type;
    this.hypotheses = hypotheses;
  }

  getTerm() {
    return this.term;
  }

  getType() {
    return this.type;
  }

  getHypotheses() {
    return this.hypotheses;
  }

  setHypotheses(hypotheses) {
    this.hypotheses = hypotheses;
  }

  getGeneratorNode() {
    const node = this.getNode(),
          generatorNode = node;  ///

    return generatorNode;
  }

  isHypothetical() {
    const hypothesesLength = this.hypotheses.length,
          hypothetical = (hypothesesLength > 0);

    return hypothetical;
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

  async verify(context) {
    let verifies = false;

    const includeType = false,
          generatorString = this.getString(includeType);

    context.trace(`Verifying the '${generatorString}' generator...`);

    await attempt(async (context) => {
      const termValidates = await this.validateTerm(context);

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

  async validateTerm(context) {
    let termValidates = false;

    const includeType = false,
          generatorString = this.getString(includeType);

    context.trace(`Validating the '${generatorString}' generator's term...`);

    const hypothtical = this.isHypothetical();

    if (hypothtical) {
      const termValidatesAsVariable = await validateTermAsVariable(this.term, context, async (term, context) => { ///
        let validatesForwards = false;

        const type = term.getType(),
              baseType = baseTypeFromNothing();

        if (type === baseType) {
          validatesForwards = true;
        }

        return validatesForwards;
      });

      if (termValidatesAsVariable) {
        termValidates = true;
      }
    } else {
      const termValidatesAsGenerator = await validateTermAsGenerator(this.term, context);

      if (termValidatesAsGenerator) {
        termValidates = true;
      }
    }

    if (termValidates) {
      context.debug(`...validated the '${generatorString}' generator's term.`);
    }

    return termValidates;
  }

  async unifyTerm(term, context, validateForwards) {
    let termUnifies = false;

    const termString = term.getString(),
          includeType = false,
          generatorString = this.getString(includeType);  ///

    context.trace(`Unifying the '${termString}' term with the '${generatorString}' generator...`);

    const hypothesesDiscardedGivenTerm = await this.dischargeHypothesesGivenTerm(term, context);

    if (hypothesesDiscardedGivenTerm) {
      const generator = this, ///
            generatorContext = generator.getContext(),
            generalContext = generatorContext,  ///
            specifiContext = context, ///
            termUnifiesWithGenerator = unifyTermWithGenerator(term, generator, generalContext, specifiContext);

      if (termUnifiesWithGenerator) {
        const provisional = this.type.isProvisional();

        term.setType(this.type);

        term.setProvisional(provisional);

        const validatesForwards = await validateForwards(term, context);

        if (validatesForwards) {
          termUnifies = true;
        }
      }
    }

    if (termUnifies) {
      context.debug(`...unified the '${termString}' term with the '${generatorString}' generator.`);
    }

    return termUnifies;
  }

  async dischargeHypothesisGivenTerm(hypothesis, term, context) {
    let hypothesisDischargesGivenTerm;

    await this.break(context);

    const termString = term.getString(),
          hypothesisString = hypothesis.getString(),
          generatorString = this.getString(); ///

    context.trace(`Discharding the '${generatorString}' generator's '${hypothesisString}' hypothesis given the '${termString}' term...`);

    hypothesisDischargesGivenTerm = await hypothesis.dischargeGivenTerm(term, context);

    if (hypothesisDischargesGivenTerm) {
      context.trace(`...discharges the '${generatorString}' generator's '${hypothesisString}' hypothesis given the '${termString}' term.`);
    }

    return hypothesisDischargesGivenTerm;
  }

  async dischargeHypothesesGivenTerm(term, context) {
    let hypothesesDischargesGivenTerm = true;  ///

    const hypothetical = this.isHypothetical();

    if (hypothetical) {
      hypothesesDischargesGivenTerm = await every(this.hypotheses, async (hypothesis) => {
        const hypothesisDischarges = await this.dischargeHypothesisGivenTerm(hypothesis, term, context);

        if (hypothesisDischarges) {
          return true;
        }
      });
    }

    return hypothesesDischargesGivenTerm;
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
