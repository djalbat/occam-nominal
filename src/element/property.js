"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiateProperty } from "../process/instantiate";
import { termFromPropertyNode } from "../utilities/element";
import { unifyTermWithProperty } from "../process/unify";
import { validateTermAsProperty } from "../process/validate";
import { typeFromJSON, typeToTypeJSON } from "../utilities/json";
import { attempt, serialise, unserialise, instantiate } from "../utilities/context";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Property extends Element {
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

  getPropertyNode() {
    const node = this.getNode(),
          propertyNode = node;  ///

    return propertyNode;
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
          propertyString = this.getString(includeType);

    context.trace(`Verifying the '${propertyString}' property...`);

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
      context.debug(`...verified the '${propertyString}' property.`);
    }

    return verifies;
  }

  validateTerm(context) {
    let termValidates = false;

    const includeType = false,
          propertyString = this.getString(includeType);

    context.trace(`Validating the '${propertyString}' property's term...`);

    const termValidatesAsProperty = validateTermAsProperty(this.term, context);

    if (termValidatesAsProperty) {
      termValidates = true;
    }

    if (termValidates) {
      context.debug(`...validated the '${propertyString}' property's term.`);
    }

    return termValidates;
  }

  unifyTerm(term, context, validateForwards) {
    let termUnifies = false;

    const termString = term.getString(),
          includeType = false,
          propertyString = this.getString(includeType);  ///

    context.trace(`Unifying the '${termString}' term with the '${propertyString}' property...`);

    const property = this, ///
          propertyContext = this.getContext(),  ///
          generalContext = propertyContext,  ///
          specifiContext = context, ///
          termUnifiesWithProperty = unifyTermWithProperty(term, property, generalContext, specifiContext);

    if (termUnifiesWithProperty) {
      const provisional = this.type.isProvisional();

      term.setType(this.type);

      term.setProvisional(provisional);

      const validatesForwards = validateForwards(term, context);

      if (validatesForwards) {
        termUnifies = true;
      }
    }

    if (termUnifies) {
      context.debug(`...unified the '${termString}' term with the '${propertyString}' property.`);
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

  static name = "Property";

  static fromJSON(json, context) {
    let property;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              propertyNode = instantiateProperty(string, context),
              node = propertyNode, ///
              breakPoint = breakPointFromJSON(json),
              term = termFromPropertyNode(propertyNode, context),
              type = typeFromJSON(json, context);

        property = new Property(context, string, node, breakPoint, term, type);
      }, json, context);
    }, context);

    return property;
  }
});
