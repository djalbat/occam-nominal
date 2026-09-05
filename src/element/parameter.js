"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import Value from "../value";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateParameter } from "../process/instantiate";

const { unbreakable } = breakPointUtilities;

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

  isEqualTo(parameter) {
    const parameterNode = parameter.getNode(),
          parameterNodeMatches = this.matchParameterNode(parameterNode),
          equalTo = parameterNodeMatches;  ///

    return equalTo;
  }

  matchParameterNode(parameterNode) {
    const node = parameterNode, ///
          nodeMatches = this.matchNode(node),
          parameterNodeMatches = nodeMatches; ///

    return parameterNodeMatches;
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

  findParameter(context) {
    const parameterNode = this.getParameterNode(),
          parameter = context.findParameterByParameterNode(parameterNode);

    return parameter;
  }

  validate = unbreakable(function (state, context, forward, back) {
    let parameter;

    const parameterString = this.getString();  ///

    context.trace(`Validating the '${parameterString}' parameter...`);

    parameter = this.findParameter(context);

    if (parameter !== null) {
      context.debug(`The '${parameterString}' parameter is already present.`);

      return forward(parameter, context, back);
    }

    parameter = this; ///

    context.addParameter(parameter);

    context.debug(`...validated the '${parameterString}' parameter.`);

    return forward(parameter, context, back);
  });

  toJSON() {
    let json;

    const string = this.getString();

    json = {
      string
    };

    return json;
  }

  static name = "Parameter";

  static fromJSON(json, context) {
    let parameter;

    instantiate((context) => {
      const { string } = json,
            parameterNode = instantiateParameter(string, context),
            node = parameterNode,  ///
            breakPoint = null,
            name = nameFromParaneterNode(parameterNode, context),
            identifier = identifierFromParameterNode(parameterNode, context);

      context = null;

      parameter = new Parameter(context, string, node, breakPoint, name, identifier);
    }, context);

    return parameter;
  }
});

function nameFromParaneterNode(parameterNode, context) {
  const name = parameterNode.getName();

  return name;
}

function identifierFromParameterNode(parameterNode, context) {
  const identifier = parameterNode.getIdentifier();

  return identifier;
}

