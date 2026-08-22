"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import elements from "../elements";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { declare, desist  } from "../utilities/state";
import { instantiateVariable } from "../process/instantiate";
import { provisionallyStringFromProvisional } from "../utilities/string";
import { variableFromTermNode, identifierFromVariableNode } from "../utilities/element";
import { typeFromJSON, typeToTypeJSON, provisionalFromJSON, provisionalToProvisionalJSON } from "../utilities/json";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Variable extends Element {
  constructor(context, string, node, breakPoint, type, identifier, provisional) {
    super(context, string, node, breakPoint);

    this.type = type;
    this.identifier = identifier;
    this.provisional = provisional;
  }

  getType() {
    return this.type;
  }

  getIdentifier() {
    return this.identifier;
  }

  isProvisional() {
    return this.provisional;
  }

  setType(type) {
    this.type = type;
  }

  setProvisional(provisional) {
    this.provisional = provisional;
  }

  getVariableNode() {
    const node = this.getNode(),
          variableNode = node;  //

    return variableNode;
  }

  getTypeString() { return this.type.getString(); }

  isEstablished() {
    const provisional = this.isProvisional(),
          established = !provisional;

    return established;
  }

  isIdentifierEqualTo(identifier) {
    const identifierEqualTo = (this.identifier === identifier);

    return identifierEqualTo;
  }

  matchVariableNode(variableNode) {
    const node = variableNode, ///
          nodeMatches = this.matchNode(node),
          variableNodeMatches = nodeMatches; ///

    return variableNodeMatches;
  }

  isEqualTo(variable) {
    const variableNode = variable.getNode(),
          variableNodeMatches = this.matchVariableNode(variableNode),
          equalTo = variableNodeMatches;  ///

    return equalTo;
  }

  compareVariableIdentifier(variableIdentifier) {
    const identifier = variableIdentifier, ///
          identifierEqualTo = this.isIdentifierEqualTo(identifier),
          comparesToVariableIdentifier = identifierEqualTo; ///

    return comparesToVariableIdentifier;
  }

  validate(type, provisional, state, context, forward, back) {
    const variableString = this.getString(); ///

    context.trace(`Validating the '${variableString}' variable...`);

    this.type = type;

    this.provisional = provisional;

    const variable = this;  ///

    context.debug(`...validated the '${variableString}' variable.`);

    return forward(variable, context, back);
  }

  unifyTerm(term, generalContext, specificContext, forward, back) {
    let termUnifies = false;

    const context = specificContext,  ///
          termString = term.getString(),
          variableString = this.getString();

    context.trace(`Unifying the '${termString}' term with the '${variableString}' variable...`);

    const termVariableCompares = this.compareTermVariable(term, generalContext, specificContext);

    if (termVariableCompares) {
      termUnifies = true;

      return continuation(termUnifies);
    }

    const variable = this,  ///
          variableNode = variable.getNode(),
          inferredSubstitution = context.findInferredSubstitutionByVariableNode(variableNode);

    if (inferredSubstitution !== null) {
      const inferredSubstitutionComparesToTerm = inferredSubstitution.compareTerm(term, context);

      if (inferredSubstitutionComparesToTerm) {
        const inferredSubstitutionString = inferredSubstitution.getString();

        context.trace(`The '${inferredSubstitutionString}' inferred substitution is already present.`);

        termUnifies = true;
      }

      return continuation(termUnifies);
    }

    const { TermSubstitution } = elements,
          termSubstitution = TermSubstitution.fromTermAndVariable(term, variable, generalContext, specificContext);

    declare((state) => {
      desist((state) => {
        termSubstitution.validate(state, context, (termSubstitution, context) => {
          let validates;

          const inferredSubstitution = termSubstitution;  ///

          context.addInferredSubstitution(inferredSubstitution);

          validates = true;

          return validates;
        });
      }, state);
    });

    termUnifies = true;

    if (termUnifies) {
      context.debug(`...unified the '${termString}' term with the '${variableString}' variable.`);
    }

    return continuation(termUnifies);
  }

  compareTermVariable(term, generalContext, specificContext) {
    let termVariableCompares = false;

    const context = specificContext,  ///
          termString = term.getString(),
          variableString = this.getString();  ///

    context.trace(`Comparing the '${termString}' term's variable with the '${variableString}' variable...`);

    const generalContextFilePath = generalContext.getFilePath(),
          specificContextFilePath = specificContext.getFilePath();

    if (generalContextFilePath === specificContextFilePath) {
      const variableNode = this.getVariableNode(),  ///
            variableNodeMatches = term.matchVariableNode(variableNode);

      if (variableNodeMatches) {
        termVariableCompares = true;
      }
    }

    if (termVariableCompares) {
      context.debug(`...compared the '${termString}' term's variable with the '${variableString}' variable.`);
    }

    return termVariableCompares;
  }

  toJSON() {
    const typeJSON = typeToTypeJSON(this.type),
          provisionalJSON = provisionalToProvisionalJSON(this.provisional),
          string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const type = typeJSON,  ///
          provisional = provisionalJSON,  ///
          json = {
            string,
            breakPoint,
            type,
            provisional
          };

    return json;
  }

  static name = "Variable";

  static fromJSON(json, context) {
    let variable;

    instantiate((context) => {
      const { string } = json,
            variableNode = instantiateVariable(string, context),
            node = variableNode,  ///
            breakPoint = breakPointFromJSON(json),
            type = typeFromJSON(json, context),
            identifier = identifierFromVariableNode(variableNode, context),
            provisional = provisionalFromJSON(json, context);

      context = null;

      variable = new Variable(context, string, node, breakPoint, type, identifier, provisional);
    }, context);

    return variable;
  }

  static fromTerm(term, context) {
    const termNode = term.getNode(),
          variable = variableFromTermNode(termNode, context);

    return variable;
  }
});
