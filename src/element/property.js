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
      { cut, exists, isolate } = continuationUtilities;

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

    const includeType = false,
          propertyString = this.getString(includeType);  ///

    context.trace(`Verifying the '${propertyString}' property...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.trace(`Unable to verify the '${propertyString}' property because it is malformed.`);

      return back();
    }

    declare((state) => {
      desist((state) => {
        return this.validate(state, context, (property, context, back) => {
          context.debug(`...verified the '${propertyString}' property.`);

          return forward(context, back);
        });
      }, state);
    });
  });

  validate(state, context, forward, back) {
    const includeType = false,
          propertyString = this.getString(includeType);  ///

    context.trace(`Validating the '${propertyString}' property...`);

    return isolate((state, context, forward, back) => {
      return attempt((context) => {
        const validateTermAsProperty = this.validateTermAsProperty.bind(this);

        return exists([
          validateTermAsProperty
        ], state, context, (state, context, back) => {
          this.commit(context);

          return forward(back);
        }, back);
      }, context);
    }, state, context, (state, context, back) => {
      const property = this; ///

      context.debug(`...validated the '${propertyString}' property.`);

      return forward(property, context, back);
    }, back);
  }

  validateTermAsProperty(state, context, forward, back) {
    const includeType = false,
          propertyString = this.getString(includeType);  ///

    context.trace(`Validating the '${propertyString}' property's term...`);

    return validateTermAsProperty(this.term, context, (context, back) => {
      context.debug(`...validated the '${propertyString}' property's term.`);

      return forward(state, context, back);
    }, back);
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
    let json;

    const context = this.getContext();

    serialise((context) => {
      const includeType = false,
            typeJSON = typeToTypeJSON(this.type),
            string = this.getString(includeType),
            type = typeJSON;  ///

      json = {
        context,
        string,
        type
      };
    }, context);

    return json;
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
