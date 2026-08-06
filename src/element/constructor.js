"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { every, exists } from "../utilities/continuation";
import { baseTypeFromNothing } from "../utilities/type";
import { instantiateConstructor } from "../process/instantiate";
import { validateTermAsVariable } from "../process/validation";
import { termFromConstructorNode } from "../utilities/element";
import { unifyTermWithConstructor } from "../process/unify";
import { validateTermAsConstructor } from "../process/validate";
import { attempt, serialise, unserialise, instantiate } from "../utilities/context";
import { typeFromJSON, typeToTypeJSON, hypothesesFromJSON, hypothesesToHypothesesJSON } from "../utilities/json";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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
          constructorString = this.getString(includeType);  ///

    context.trace(`Verifying the '${constructorString}' constructor...`);

    attempt((context) => {
      const validates = this.validate(context, (constructor, context) => true);

      if (validates) {
        this.commit(context);

        verifies = true;
      }
    }, context);

    if (verifies) {
      context.debug(`...verified the '${constructorString}' constructor.`);
    }

    return continuation(verifies, context);
  }

  validate(state, context, continuation) {
    let validates;

    const includeType = false,
          constructorString = this.getString(includeType);  ///

    context.trace(`Validating the '${constructorString}' constructor...`);

    const validateTermAsVariable = this.validateTermAsVariable.bind(this),
          validateTermAsConstructor = this.validateTermAsConstructor.bind(this);

    validates = exists([
      validateTermAsVariable,
      validateTermAsConstructor
    ], state, context, (state, context) => {
      let validates;

      const constructor = this;

      validates = continuation(constructor, context);

      return validates;
    });

    if (validates) {
      context.debug(`...validated the '${constructorString}' constructor.`);
    }

    return validates;
  }

  validateTermAsVariable(state, context, continuation) {
    let termValidatesAsVariable = false;

    const hypothetical = this.isHypothetical();

    if (!hypothetical) {
      const includeType = false,
            constructorString = this.getString(includeType);  ///

      context.trace(`Validating the '${constructorString}' constructor's term as a variable...`);

      termValidatesAsVariable = validateTermAsVariable(this.term, context, (term, context) => {
        let termValidatesAsVariable = false;

        const type = term.getType(),
              baseType = baseTypeFromNothing();

        if (type === baseType) {
          termValidatesAsVariable = continuation(state, context);
        }

        return termValidatesAsVariable;
      });

      if (termValidatesAsVariable) {
        context.debug(`...validated the '${constructorString}' constructor's term as a variable.`);
      }
    }

    return termValidatesAsVariable;
  }

  validateTermAsConstructor(state, context, continuation) {
    let termValidatesAsConstructor = false;

    const hypothetical = this.isHypothetical();

    if (!hypothetical) {
      const includeType = false,
            constructorString = this.getString(includeType);  ///

      context.trace(`Validating the '${constructorString}' constructor's term...`);

      termValidatesAsConstructor = validateTermAsConstructor(this.term, context, (context) => {
        let validates;

        validates = continuation(state, context);

        return validates;
      });

      if (termValidatesAsConstructor) {
        context.debug(`...validated the '${constructorString}' constructor's term.`);
      }
    }

    return termValidatesAsConstructor;
  }

  unifyTerm(term, context, continuation) {
    let termUnifies = false;

    const termString = term.getString(),
          includeType = true,
          constructorString = this.getString(includeType);  ///

    context.trace(`Unifying the '${termString}' term with the '${constructorString}' constructor...`);

    const hypothesesDischargesGivenTerm = this.dischargeHypothesesGivenTerm(term, context, (context) => {
      let hypothesesDischargesGivenTerm = false;

      const constructor = this, ///
            constructorContext = constructor.getContext(),
            generalContext = constructorContext,  ///
            specifiContext = context, ///
            termUnifiesWithConstructor = unifyTermWithConstructor(term, constructor, generalContext, specifiContext, (generalContext, specifiContext) => {
              let termUnifiesWithConstructor;

              const context = specifiContext, ///
                    provisional = this.type.isProvisional();

              term.setProvisional(provisional);

              term.setType(this.type);

              termUnifiesWithConstructor = continuation(term, context);

              return termUnifiesWithConstructor;
            });

      if (termUnifiesWithConstructor) {
        hypothesesDischargesGivenTerm = true;
      }

      return hypothesesDischargesGivenTerm;
    });

    if (hypothesesDischargesGivenTerm) {
      termUnifies = true;
    }

    if (termUnifies) {
      context.debug(`...unified the '${termString}' term with the '${constructorString}' constructor.`);
    }

    return termUnifies;
  }

  dischargeHypothesesGivenTerm(term, context, continuation) {
    let hypothesesDischargesGivenTerm;

    const hypothetical = this.isHypothetical();

    if(!hypothetical) {
      hypothesesDischargesGivenTerm = continuation(context);
    } else {
      const constructxorString = this.getString();

      context.trace(`Discharing the '${constructxorString}' constructor's hhypotheses...`);

      hypothesesDischargesGivenTerm = every(this.hypotheses, context, (hypothesis, context, continuation) => {
        let hypothesisDischargesGivenTerm;

        hypothesisDischargesGivenTerm = this.dischargeHypothesisGivenTerm(hypothesis, term, context, continuation);

        return hypothesisDischargesGivenTerm;
      }, continuation);

      if (hypothesesDischargesGivenTerm) {
        context.debug(`...discharged the '${constructxorString}' constructor's hhypotheses.`);
      }
    }

    return hypothesesDischargesGivenTerm;
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
    return instantiate((context) => {
      return unserialise((json, context) => {
        const { string } = json,
              constructorNode = instantiateConstructor(string, context),
              node = constructorNode, ///
              breakPoint = breakPointFromJSON(json),
              term = termFromConstructorNode(constructorNode, context),
              type = typeFromJSON(json, context),
              hypotheses = hypothesesFromJSON(json, context),
              constructor = new Constructor(context, string, node, breakPoint, term, type, hypotheses);

        return constructor;
      }, json, context);
    }, context);
  }
});
