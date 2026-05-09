"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { instantiateConstructor } from "../process/instantiate";
import { termFromConstructorNode } from "../utilities/element";
import { unifyTermWithConstructor } from "../process/unify";
import { validateTermAsConstructor } from "../process/validate";
import { typeFromJSON, typeToTypeJSON } from "../utilities/json";
import { attempt, serialise, unserialise, instantiate } from "../utilities/context";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";

export default define(class Constructor extends Element {
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

  getConclusionNode() {
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

  validate(context) {
    let validates = false;

    const includeType = false,
          constructorString = this.getString(includeType);

    context.trace(`Validating the '${constructorString}' constructor...`);

    attempt((context) => {
      const termValidates = this.validateTerm(context);

      if (termValidates) {
        validates = true;
      }

      if (validates) {
        this.commit(context);
      }
    }, context);

    if (validates) {
      context.debug(`...validated the '${constructorString}' constructor.`);
    }

    return validates;
  }

  validateTerm(context) {
    let termValidates = false;

    const includeType = false,
          constructorString = this.getString(includeType);

    context.trace(`Validating the '${constructorString}' constructor's term...`);

    const termValidatesAsConstructor = validateTermAsConstructor(this.term, context);

    if (termValidatesAsConstructor) {
      termValidates = true;
    }

    if (termValidates) {
      context.debug(`...validated the '${constructorString}' constructor's term.`);
    }

    return termValidates;
  }

  unifyTerm(term, context, validateForwards) {
    let termUnifies = false;

    const termString = term.getString(),
          includeType = false,
          constructorString = this.getString(includeType);  ///

    context.trace(`Unifying the '${termString}' term with the '${constructorString}' constructor...`);

    const constructor = this, ///
          constructorContext = constructor.getContext(),
          generalContext = constructorContext,  ///
          specifiContext = context, ///
          termUnifiesWithConstructor = unifyTermWithConstructor(term, constructor, generalContext, specifiContext);

    if (termUnifiesWithConstructor) {
      const provisional = this.type.isProvisional();

      term.setType(this.type);

      term.setProvisional(provisional);

      const validatesForwards = validateForwards(term, context);

      if (validatesForwards) {
        termUnifies = true;
      }
    }

    if (termUnifies) {
      context.debug(`...unified the '${termString}' term with the '${constructorString}' constructor.`);
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
              type = typeFromJSON(json, context);

        constructor = new Constructor(context, string, node, breakPoint, term, type);
      }, json, context);
    }, context);

    return constructor;
  }
});
