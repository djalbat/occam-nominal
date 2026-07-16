"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { exists } from "../utilities/continuation";
import { baseTypeFromNothing } from "../utilities/type";
import { instantiateConstructor } from "../process/instantiate";
import { validateTermAsVariable } from "../process/validation";
import { termFromConstructorNode } from "../utilities/element";
import { unifyTermWithConstructor } from "../process/unify";
import { validateTermAsConstructor } from "../process/validate";
import { attempt, serialise, unserialise, instantiate } from "../utilities/context";
import { typeFromJSON, typeToTypeJSON, hypothesesFromJSON, hypothesesToHypothesesJSON } from "../utilities/json";

const { every } = continuationUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Constructor extends Element {
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

  isHypothetical() {
    const hypothesesLength = this.hypotheses.length,
          hypothetical = (hypothesesLength > 0);

    return hypothetical;
  }

  getConstructorNode() {
    const node = this.getNode(),
          constructorNode = node;  ///

    return constructorNode;
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

  verify(context, continuation) {
    let verifies = false;

    const includeType = false,
          constructorString = this.getString(includeType);

    context.trace(`Verifying the '${constructorString}' constructor...`);

    attempt((context) => {
      this.validateTerm(context, (termValidates) => {
        if (termValidates) {
          verifies = true;
        }

        if (verifies) {
          this.commit(context);
        }

        if (verifies) {
          context.debug(`...verified the '${constructorString}' constructor.`);
        }

        return continuation(verifies);
      });
    }, context);
  }

  validateTerm(context, continuation) {
    const includeType = false,
          constructorString = this.getString(includeType);

    context.trace(`Validating the '${constructorString}' constructor's term...`);

    const validateTermAsVariable = this.validateTermAsVariable.bind(this),
          validateTermAsConstructor = this.validateTermAsConstructor.bind(this);

    return exists([
      validateTermAsVariable,
      validateTermAsConstructor
    ], context, (termValidates) => {
      if (termValidates) {
        context.debug(`...validated the '${constructorString}' constructor's term.`);
      }

      return continuation(termValidates);
    });
  }

  validateTermAsVariable(context, continuation) {
    const hypothtical = this.isHypothetical();

    if (!hypothtical) {
      const termValidatesAsVariable = false;

      return continuation(termValidatesAsVariable);
    }

    const includeType = false,
          constructorString = this.getString(includeType);

    context.trace(`Validating the '${constructorString}' constructor's term...`);

    validateTermAsVariable(this.term, context, (term, context) => {
      let termValidatesAsVariable = false;

      const type = term.getType(),
            baseType = baseTypeFromNothing();

      if (type === baseType) {
        termValidatesAsVariable = true;
      }

      if (termValidatesAsVariable) {
        context.debug(`...validated the '${constructorString}' constructor's term.`);
      }

      return continuation(termValidatesAsVariable);
    });
  }

  validateTermAsConstructor(context, continuation) {
    const hypothtical = this.isHypothetical();

    if (hypothtical) {
      const termValidatesAsConstructor = false;

      return continuation(termValidatesAsConstructor);
    }

    const includeType = false,
          constructorString = this.getString(includeType);

    context.trace(`Validating the '${constructorString}' constructor's term...`);

    validateTermAsConstructor(this.term, context, (termValidatesAsConstructor) => {
      if (termValidatesAsConstructor) {
        context.debug(`...validated the '${constructorString}' constructor's term.`);
      }

      return continuation(termValidatesAsConstructor);
    });
  }

  unifyTerm(term, context, continuation) {
    const termString = term.getString(),
          includeType = true,
          constructorString = this.getString(includeType);  ///

    context.trace(`Unifying the '${termString}' term with the '${constructorString}' constructor...`);

    this.dischargeHypothesesGivenTerm(term, context, (hypothesesDiscardedGivenTerm) => {
      if (!hypothesesDiscardedGivenTerm) {
        const termUnifies = false;

        return continuation(termUnifies);
      }

      const constructor = this, ///
            constructorContext = constructor.getContext(),
            generalContext = constructorContext,  ///
            specifiContext = context; ///

      unifyTermWithConstructor(term, constructor, generalContext, specifiContext, (termUnifiesWithConstructor) => {
        if (!termUnifiesWithConstructor) {
          const termUnifies = false;

          return continuation(termUnifies);
        }

        let termUnifies;

        const provisional = this.type.isProvisional();

        term.setType(this.type);

        term.setProvisional(provisional);

        termUnifies = true;

        if (termUnifies) {
          context.debug(`...unified the '${termString}' term with the '${constructorString}' constructor.`);
        }

        return continuation(termUnifies);
      });
    });
  }

  dischargeHypothesisGivenTerm(hypothesis, term, context, continuation) {
    let hypothesisDischargesGivenTerm;

    debugger

    const termString = term.getString(),
          hypothesisString = hypothesis.getString(),
          constructorString = this.getString(); ///

    context.trace(`Discharding the '${constructorString}' constructor's '${hypothesisString}' hypothesis given the '${termString}' term...`);

    hypothesisDischargesGivenTerm = hypothesis.dischargeGivenTerm(term, context);

    if (hypothesisDischargesGivenTerm) {
      context.trace(`...discharges the '${constructorString}' constructor's '${hypothesisString}' hypothesis given the '${termString}' term.`);
    }

    return hypothesisDischargesGivenTerm;
  }

  dischargeHypothesesGivenTerm(term, context, continuation) {
    const hypothetical = this.isHypothetical();

    if (!hypothetical) {
      const hypothesesDischargesGivenTerm = true;  ///

      return continuation(hypothesesDischargesGivenTerm);
    }

    return every(this.hypotheses, (hypothesis, continuation) => {
      this.dischargeHypothesisGivenTerm(hypothesis, term, context, continuation);
    }, continuation);
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

  static name = "Constructor";

  static fromJSON(json, context) {
    let constructor;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              constructorNode = instantiateConstructor(string, context),
              node = constructorNode, ///
              breakPoint = breakPointFromJSON(json),
              term = termFromConstructorNode(constructorNode, context),
              type = typeFromJSON(json, context),
              hypotheses = hypothesesFromJSON(json, context);

        constructor = new Constructor(context, string, node, breakPoint, term, type, hypotheses);
      }, json, context);
    }, context);

    return constructor;
  }
});
