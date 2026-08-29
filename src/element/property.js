"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { desist, declare } from "../utilities/state";
import { instantiateProperty } from "../process/instantiate";
import { termFromPropertyNode } from "../utilities/element";
import { unifyTermWithProperty } from "../process/unify";
import { validateTermAsProperty } from "../process/validate";
import { typeFromJSON, typeToTypeJSON } from "../utilities/json";
import { attempt, serialise, unserialise, instantiate } from "../utilities/context";

const { unbreakable } = breakPointUtilities,
      { cut, isolate } = continuationUtilities;

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

  isMalformed() {
    const propertyNode = this.getPropertyNode(),
          malformed = propertyNode.isMalformed();

    return malformed;
  }

  verify = unbreakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    let verifies = false;

    const includeType = false,
          propertyString = this.getString(includeType);  ///

    context.trace(`Verifying the '${propertyString}' property...`);

    const malformed = this.isMalformed();

    if (malformed) {
      const verifies = false;

      context.trace(`Unable to verify the '${propertyString}' property because it is malformed.`);

      return continuation(verifies, context);
    }

    declare((state) => {
      desist((state) => {
        const validates = this.validate(state, context, (ocmbinator, context) => true); ///

        if (validates) {
          verifies = true;
        }
      }, state);
    });

    if (verifies) {
      context.debug(`...verified the '${propertyString}' property.`);
    }

    return continuation(verifies, context);
  });

  validate(state, context, forward, back) {
    let validates;

    const includeType = false,
          propertyString = this.getString(includeType);  ///

    context.trace(`Validating the '${propertyString}' property...`);

    const property = this;

    return isolate(); ///

    return attempt((context) => {
      const validateTermAsProperty = this.validateTermAsProperty.bind(this);

      validates = exists([
        validateTermAsProperty
      ], state, context, (state, context) => {
        let validates;

        this.commit(context);

        validates = continuation(property, context);

        return validates;
      });
    }, context);

    if (validates) {
      context.debug(`...validated the '${propertyString}' property.`);
    }

    return validates;
  }

  validateTermAsProperty(state, context, forward, back) {
    let termValidatesAsProperty = false;

    const includeType = false,
          propertyString = this.getString(includeType);  ///

    context.trace(`Validating the '${propertyString}' property's term...`);

    termValidatesAsProperty = validateTermAsProperty(this.term, context, (context) => {
      let validates;

      validates = continuation(state, context);

      return validates;
    });

    if (termValidatesAsProperty) {
      context.debug(`...validated the '${propertyString}' property's term.`);
    }

    return termValidatesAsProperty;
  }

  unifyTerm(term, context, forward, back) {
    let termUnifies = false;

    const termString = term.getString(),
          includeType = true,
          propertyString = this.getString(includeType);  ///

    context.trace(`Unifying the '${termString}' term with the '${propertyString}' property...`);

    const property = this, ///
          propertyContext = property.getContext(),
          generalContext = propertyContext,  ///
          specificContext = context, ///
          termUnifiesWithProperty = unifyTermWithProperty(term, property, generalContext, specificContext, (generalContext, specificContext) => {
            let termUnifiesWithProperty;

            const context = specificContext; ///

            term.setType(this.type);

            termUnifiesWithProperty = continuation(term, context);

            return termUnifiesWithProperty;
          });

    if (termUnifiesWithProperty) {
      termUnifies = true;
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
            string = this.getString(includeType),
            type = typeJSON,  ///
            json = {
              context,
              string,
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
              breakPoint = null,
              term = termFromPropertyNode(propertyNode, context),
              type = typeFromJSON(json, context);

        property = new Property(context, string, node, breakPoint, term, type);
      }, json, context);
    }, context);

    return property;
  }
});
