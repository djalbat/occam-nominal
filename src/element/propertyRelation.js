"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiatePropertyRelation } from "../process/instantiate";
import { propertyFromPropertyRelationNode } from "../utilities/element";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";

export default define(class PropertyRelation extends Element {
  constructor(context, string, node, breakPoint, term, property) {
    super(context, string, node, breakPoint);

    this.term = term;
    this.property = property;
  }

  getTerm() {
    return this.term;
  }

  getProperty() {
    return this.property;
  }

  getPropertyRelationNode() {
    const node = this.getNode(),
          propertyRelationNode = node;  ///

    return propertyRelationNode;
  }

  getType() { return this.property.getType(); }

  isEqualTo(propertyRelation) {
    const propertyRelationNode = propertyRelation.getNode(),
          propertyRelationNodeMatches = this.matchPropertyRelationNode(propertyRelationNode),
          equalTo = propertyRelationNodeMatches;  ///

    return equalTo;
  }

  matchPropertyRelationNode(propertyRelationNode) {
    const node = propertyRelationNode, ///
          nodeMatches = this.matchNode(node),
          propertyRelationNodeMatches = nodeMatches; ///

    return propertyRelationNodeMatches;
  }

  findValidPropertyRelation(context) {
    const propertyRelationNode = this.getPropertyRelationNode(),
          propertyRelation = context.findPropertyRelationByPropertyRelationNode(propertyRelationNode),
          validPropertyRelation = propertyRelation; ///

    return validPropertyRelation;
  }

  validate(context) {
    let propertyRelation = null;

    const propertyRelationString = this.getString(); ///

    context.trace(`Validating the '${propertyRelationString}' property relation...`);

    let validates = false;

    const validPropertyRelation = this.findValidPropertyRelation(context);

    if (validPropertyRelation) {
      validates = true;

      propertyRelation = validPropertyRelation; ///

      context.debug(`...the '${propertyRelationString}' property relation is already valid.`);
    } else {
      const termValidates = this.validateTerm(context);

      if (termValidates) {
        const propertyValidates = this.validateProperty(context);

        validates = propertyValidates;
      }

      if (validates) {
        propertyRelation = this; ///

        context.addPropertyRelation(propertyRelation);
      }
    }

    if (validates) {
      context.debug(`...validated the '${propertyRelationString}' property relation.`);
    }

    return propertyRelation;
  }

  validateTerm(context) {
    let termValidates = false;

    const propertyRelationString = this.getString(); ///

    context.trace(`Validating the '${propertyRelationString}' property relation's term...`);

    const term = this.term.validate(context, (term, context) => {
      const validatesForwards = true;

      return validatesForwards;
    });

    if (term !== null) {
      this.term = term;

      termValidates = true;
    }

    if (termValidates) {
      context.debug(`...validated the '${propertyRelationString}' property relation's term.`);
    }

    return termValidates;
  }

  validateProperty(context) {
    let propertyValidates = false;

    const propertyRelationString = this.getString(); ///

    context.trace(`Validating the '${propertyRelationString}' property relation's property...`);

    const type = this.term.getType(),
          property = this.property.validateGivenType(type, context);

    if (property !== null) {
      this.property = property;

      propertyValidates = true;
    }

    if (propertyValidates) {
      context.trace(`...validated the '${propertyRelationString}' property relation's property.`);
    }

    return propertyValidates;
  }

  static name = "PropertyRelation";

  toJSON() {
    const string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const json = {
      string,
      breakPoint
    };

    return json;
  }

  static fromJSON(json, context) {
    return instantiate((context) => {
      const { string } = json,
            propertyRelationNode = instantiatePropertyRelation(string, context),
            node = propertyRelationNode,  ///
            breakPoint = breakPointFromJSON(json),
            term = termFromPropertyRelationNode(propertyRelationNode, context),
            property = propertyFromPropertyRelationNode(propertyRelationNode, context);

      context = null;

      const propertyRelation = new PropertyRelation(context, string, node, breakPoint, term, property);

      return propertyRelation;
    }, context);
  }
});

function termFromPropertyRelationNode(propertyRelationNode, context) {
  const termNode = propertyRelationNode.getTermNode(),
        term = context.findTermByTermNode(termNode);

  return term;
}
