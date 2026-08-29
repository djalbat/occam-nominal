"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { declare, desist } from "../utilities/state";
import { baseTypeFromNothing } from "../utilities/type";
import { instantiateConstructor } from "../process/instantiate";
import { termFromConstructorNode } from "../utilities/element";
import { unifyTermWithConstructor } from "../process/unify";
import { validateTermAsConstructor } from "../process/validate";
import { attempt, serialise, unserialise, instantiate } from "../utilities/context";
import { typeFromJSON, typeToTypeJSON, hypothesesFromJSON, hypothesesToHypothesesJSON } from "../utilities/json";

const { unbreakable } = breakPointUtilities,
      { cut, all, every, exists, isolate } = continuationUtilities;

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

  isMalformed() {
    const constructorNode = this.getConstructorNode(),
      malformed = constructorNode.isMalformed();

    return malformed;
  }

  verify = unbreakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const includeType = false,
          constructorString = this.getString(includeType);  ///

    context.trace(`Verifying the '${constructorString}' constructor...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.trace(`Unable to verify the '${constructorString}' constructor because it is malformed.`);

      return back();
    }

    return declare((state) => {
      return desist((state) => {
        return this.validate(state, context, (constructor, context, back) => {
          context.debug(`...verified the '${constructorString}' constructor.`);

          return forward(context, back);
        }, back);
      }, state);
    });
  });

  validate(state, context, forward, back) {
    const includeType = false,
          constructorString = this.getString(includeType);  ///

    context.trace(`Validating the '${constructorString}' constructor...`);

    return isolate((state, context, forward, back) => {
      return attempt((context) => {
        const validateTermAsVariable = this.validateTermAsVariable.bind(this),
              validateTermAsConstructor = this.validateTermAsConstructor.bind(this);

        return exists([
          validateTermAsVariable,
          validateTermAsConstructor
        ], state, context, (state, context, back) => {
          this.commit(context);

          return forward(back);
        }, back);
      }, context);
    }, state, context, (state, context, back) => {
      const constructor = this; ///

      context.debug(`...validated the '${constructorString}' constructor.`);

      return forward(constructor, context, back);
    }, back);
  }

  validateTermAsVariable(state, context, forward, back) {
    const includeType = false,
          constructorString = this.getString(includeType);  ///

    const hypothetical = this.isHypothetical();

    if (!hypothetical) {
      return back();
    }

    context.trace(`Validating the '${constructorString}' constructor's term as a variable...`);

    return this.term.validateAsVariable(state, context, (term, context, back) => {
      const type = term.getType(),
            baseType = baseTypeFromNothing();

      if (type !== baseType) {
        const typeString = type.getString(),
              baseTypeString = baseType.getString();

        context.debug(`The '${typeString}' type of the '${constructorString}' constructor's term is not the '${baseTypeString}' base type.`);

        return back();
      }

      context.debug(`...validated the '${constructorString}' constructor's term as a variable.`);

      return forward(state, context, back);
    }, back);
  }

  validateTermAsConstructor(state, context, forward, back) {
    const includeType = false,
          constructorString = this.getString(includeType);  ///

    const hypothetical = this.isHypothetical();

    if (hypothetical) {
      return back();
    }

    context.trace(`Validating the '${constructorString}' constructor's term...`);

    return validateTermAsConstructor(this.term, context, (context, back) => {
      context.debug(`...validated the '${constructorString}' constructor's term.`);

      return forward(state, context, back);
    }, back);
  }

  unifyTerm(term, context, forward, back) {
    const termString = term.getString();

    context.trace(`Unifying the '${termString}' term...`);

    const unifyTermWithConstructor = this.unifyTermWithConstructor.bind(this),
          dischargeHypothesesGivenTerm = this.dischargeHypothesesGivenTerm.bind(this);

    return all([
      dischargeHypothesesGivenTerm,
      unifyTermWithConstructor
    ], term, context, (term, context, back) => {
      const provisional = this.type.isProvisional();

      term.setProvisional(provisional);

      term.setType(this.type);

      context.debug(`...unified the '${termString}' term.`);

      return forward(term, context, back);
    }, back);
  }

  unifyTermWithConstructor(term, context, forward, back) {
    const termString = term.getString(),
          includeType = true,
          constructorString = this.getString(includeType);  ///

    const hypothetical = this.isHypothetical();

    if (hypothetical) {
      return forward(term, context, back);
    }

    context.trace(`Unifying the '${termString}' term with the '${constructorString}' constructor...`);

    const constructor = this, ///
          generalContext = this.getContext(),  ///
          specificContext = context; ///

    return unifyTermWithConstructor(term, constructor, generalContext, specificContext, (generalContext, specificContext, back) => {
      const context = specificContext; ///

      context.debug(`...unified the '${termString}' term with the '${constructorString}' constructor.`);

      return forward(term, context, back);
    }, back);
  }

  dischargeHypothesesGivenTerm(term, context, forward, back) {
    const hypothetical = this.isHypothetical();

    if(!hypothetical) {
      return forward(term, context, back);
    }

    const termString = term.getString(),
          constructorString = this.getString();

    context.trace(`Discharging the '${constructorString}' constructor's hypotheses given the '${termString}' term...`);

    return every(this.hypotheses, (hypothesis, term, context, forward, back) => {
      return this.dischargeHypothesisGivenTerm(hypothesis, term, context, forward, back);
    }, term, context, (term, context, back) => {
      context.debug(`...discharged the '${constructorString}' constructor's hypotheses given the '${termString}' term.`);

      return forward(term, context, back);
    }, back);
  }

  dischargeHypothesisGivenTerm(hypothesis, term, context, forward, back) {
    const termString = term.getString(),
          hypothesisString = hypothesis.getString(),
          constructorString = this.getString(); ///

    context.trace(`Discharging the '${constructorString}' constructor's '${hypothesisString}' hypothesis given the '${termString}' term...`);

    hypothesis.dischargeGivenTerm(term, context, (context, back) => {
      context.trace(`...discharges the '${constructorString}' constructor's '${hypothesisString}' hypothesis given the '${termString}' term.`);

      return forward(term, context, back);
    }, back);
  }

  toJSON() {
    const context = this.getContext();

    return serialise((context) => {
      const includeType = false,
            typeJSON = typeToTypeJSON(this.type),
            hypothesesJSON = hypothesesToHypothesesJSON(this.hypotheses),
            string = this.getString(includeType);

      const type = typeJSON,  ///
            hypotheses = hypothesesJSON,  ///
            json = {
              context,
              string,
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
              breakPoint = null,
              term = termFromConstructorNode(constructorNode, context),
              type = typeFromJSON(json, context),
              hypotheses = hypothesesFromJSON(json, context);

        constructor = new Constructor(context, string, node, breakPoint, term, type, hypotheses);
      }, json, context);
    }, context);

    return constructor;
  }
});
