"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import Value from "../value";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateParameter } from "../process/instantiate";
import { nameFromParaneterNode, identifierFromParameterNode } from "../utilities/element";

const { breakable } = continuationUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Parameter extends Element {
  constructor(context, string, node, breakPoint, name, identifier) {
    super(context, string, node, breakPoint);

    this.name = name;
    this.identifier = identifier;
  }
  
  getName() {
    return this.name;
  }

  getIdentifier() {
    return this.identifier;
  }

  getParameterNode() {
    const node = this.getNode(),
          parameterNode = node; ///

    return parameterNode;
  }

  findValue(substitutions) {
    let value = null;

    const parameter = this, ///
          substitution = substitutions.find((substitution) => {
            const substitutionComparesToParameter = substitution.compareParameter(parameter);

            if (substitutionComparesToParameter) {
              return true;
            }
          }) || null;

    if (substitution !== null) {
      value = Value.fromSubstitution(substitution);
    }

    return value;
  }

  static name = "Parameter";

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
            parameterNode = instantiateParameter(string, context),
            node = parameterNode,  ///
            breakPoint = breakPointFromJSON(json),
            name = nameFromParaneterNode(parameterNode, context),
            identifier = identifierFromParameterNode(parameterNode, context);

      context = null;

      const parameter = new Parameter(context, string, node, breakPoint, name, identifier);

      return parameter;
    }, context);
  }
});
