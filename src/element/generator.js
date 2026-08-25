"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { desist, declare } from "../utilities/state";
import { baseTypeFromNothing } from "../utilities/type";
import { instantiateGenerator } from "../process/instantiate";
import { termFromGeneratorNode } from "../utilities/element";
import { unifyTermWithGenerator } from "../process/unify";
import { validateTermAsGenerator } from "../process/validate";
import { attempt, serialise, unserialise, instantiate } from "../utilities/context";
import { typeFromJSON, typeToTypeJSON, hypothesesFromJSON, hypothesesToHypothesesJSON } from "../utilities/json";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  isMalformed() {
    const geneartoarNode = this.getGeneratorNode(),
          malformed = geneartoarNode.isMalformed();

    return malformed;
  }

  verify(context, forward, back) {
    forward = cut(forward, back); ///

    let verifies = false;

    const includeType = false,
          generatorString = this.getString(includeType);  ///

    context.trace(`Verifying the '${generatorString}' generator...`);

    const malformed = this.isMalformed();

    if (malformed) {
      const verifies = false;

      context.debug(`Unable to verify the '${generatorString}' generator because it is malformed.`);

      return continuation(verifies, context);
    }

    declare((state) => {
      desist((state) => {
        const validates = this.validate(state, context, (generator, context) => true);  ///

        if (validates) {
          verifies = true;
        }
      }, state);
    });

    if (verifies) {
      context.debug(`...verified the '${generatorString}' generator.`);
    }

    return continuation(verifies, context);
  }

  validate(state, context, forward, back) {
    let validates;

    const includeType = false,
          specificContext = context,  ///
          generatorString = this.getString(includeType);  ///

    context.trace(`Validating the '${generatorString}' generator...`);

    const generator = this;

    return attempt((context) => {
      const validateTermAsVariable = this.validateTermAsVariable.bind(this),
            validateTermAsGenerator = this.validateTermAsGenerator.bind(this);

      validates = exists([
        validateTermAsVariable,
        validateTermAsGenerator
      ], state, context, (state, _ ) => {
        let validates;

        this.commit(context);

        context = specificContext;  ///

        validates = continuation(generator, context);

        return validates;
      });
    }, context);

    context = specificContext;  ///

    if (validates) {
      context.debug(`...validated the '${generatorString}' generator.`);
    }

    return validates;
  }

  validateTermAsVariable(state, context, forward, back) {
    let termValidatesAsVariable = false;

    const hypothetical = this.isHypothetical();

    if (hypothetical) {
      const includeType = false,
            generatorString = this.getString(includeType);  ///

      context.trace(`Validating the '${generatorString}' generator's term as a variable...`);

      termValidatesAsVariable = this.term.validateAsVariable(state, context, (term, context, back) => {
        let validatesAsVariable = false;

        const type = term.getType(),
              baseType = baseTypeFromNothing();

        if (type === baseType) {
          validatesAsVariable = continuation(state, context);
        }

        return validatesAsVariable;
      });

      if (termValidatesAsVariable) {
        context.debug(`...validated the '${generatorString}' generator's term as a variable.`);
      }
    }

    return termValidatesAsVariable;
  }

  validateTermAsGenerator(state, context, forward, back) {
    let termValidatesAsGenerator = false;

    const hypothetical = this.isHypothetical();

    if (!hypothetical) {
      const includeType = false,
           generatorString = this.getString(includeType);  ///

      context.trace(`Validating the '${generatorString}' generator's term...`);

      termValidatesAsGenerator = validateTermAsGenerator(this.term, context, (context) => {
        let validates;

        validates = continuation(state, context);

        return validates;
      });

      if (termValidatesAsGenerator) {
        context.debug(`...validated the '${generatorString}' generator's term.`);
      }
    }

    return termValidatesAsGenerator;
  }

  unifyTerm(term, context, forward, back) {
    let termUnifies;

    const termString = term.getString();

    context.trace(`Unifying the '${termString}' term...`);

    const unifyTermWithGenerator = this.unifyTermWithGenerator.bind(this),
          dischargeHypothesesGivenTerm = this.dischargeHypothesesGivenTerm.bind(this);

    termUnifies = all([
      dischargeHypothesesGivenTerm,
      unifyTermWithGenerator
    ], term, context, (term, context) => {
      let validates;

      const provisional = this.type.isProvisional();

      term.setProvisional(provisional);

      term.setType(this.type);

      validates = continuation(term, context);

      return validates;
    });

    if (termUnifies) {
      context.debug(`...unified the '${termString}' term.`);
    }

    return termUnifies;
  }

  unifyTermWithGenerator(term, context, forward, back) {
    let termUnifiesWithCGenerator;

    const termString = term.getString(),
          includeType = true,
          generatorString = this.getString(includeType);  ///

    context.trace(`Unifying the '${termString}' term with the '${generatorString}' generator...`);

    const generator = this, ///
          generalContext = this.getContext(),  ///
          specificContext = context; ///

    termUnifiesWithCGenerator = unifyTermWithGenerator(term, generator, generalContext, specificContext, (generalContext, specificContext) => {
      let termUnifiesWithGenerator;

      const context = specificContext; ///

      termUnifiesWithGenerator = continuation(term, context);

      return termUnifiesWithGenerator;
    });

    if (termUnifiesWithCGenerator) {
      context.debug(`...unified the '${termString}' term with the '${generatorString}' generator.`);
    }

    return termUnifiesWithCGenerator;
  }

  dischargeHypothesesGivenTerm(term, context, forward, back) {
    let hypothesesDischargesGivenTerm;

    const hypothetical = this.isHypothetical();

    if(hypothetical) {
      const generatorString = this.getString();

      context.trace(`Discharging the '${generatorString}' generator's hypotheses...`);

      const dischargeHypothesisGivenTerm = this.dischargeHypothesisGivenTerm.bind(this);

      hypothesesDischargesGivenTerm = every(this.hypotheses, dischargeHypothesisGivenTerm, term, context, forward, back);

      if (hypothesesDischargesGivenTerm) {
        context.debug(`...discharged the '${generatorString}' generator's hypotheses.`);
      }
    } else {
      hypothesesDischargesGivenTerm = continuation(term, context);
    }

    return hypothesesDischargesGivenTerm;
  }

  dischargeHypothesisGivenTerm(hypothesis, term, context, forward, back) {
    let hypothesisDischargesGivenTerm;

    const termString = term.getString(),
          hypothesisString = hypothesis.getString(),
          generatorString = this.getString(); ///

    context.trace(`Discharging the '${generatorString}' generator's '${hypothesisString}' hypothesis given the '${termString}' term...`);

    hypothesisDischargesGivenTerm = hypothesis.dischargeGivenTerm(term, context, forward, back);

    if (hypothesisDischargesGivenTerm) {
      context.trace(`...discharges the '${generatorString}' generator's '${hypothesisString}' hypothesis given the '${termString}' term.`);
    }

    return hypothesisDischargesGivenTerm;
  }

  toJSON() {
    const context = this.getContext();

    return serialise((context) => {
      const includeType = false,
            typeJSON = typeToTypeJSON(this.type),
            hypothesesJSON = hypothesesToHypothesesJSON(this.hypotheses),
            string = this.getString(includeType);

      let breakPoint;

      breakPoint = this.getBreakPoint();

      const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

      breakPoint = breakPointJSON;  ///

      const type = typeJSON,  ///
            hypotheses = hypothesesJSON,  ///
            json = {
              context,
              string,
              breakPoint,
              type,
              hypotheses
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
              type = typeFromJSON(json, context),
              hypotheses = hypothesesFromJSON(json, context);

        generator = new Generator(context, string, node, breakPoint, term, type, hypotheses);
      }, json, context);
    }, context);

    return generator;
  }
});
