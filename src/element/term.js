"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateTerm } from "../process/instantiate";
import { variablesFromTerm } from "../utilities/equivalence";
import { unifyTermIntrinsically } from "../process/unify";
import { validateTerms, validateTermAsVariable } from "../process/validation";
import { typeFromJSON, typeToTypeJSON, provisionalFromJSON, provisionalToProvisionalJSON } from "../utilities/json";

const { filter } = arrayUtilities,
      { exists } = continuationUtilities,
      { unbreakable } = breakPointUtilities;

export default define(class Term extends Element {
  constructor(context, string, node, breakPoint, type, provisional) {
    super(context, string, node, breakPoint, provisional);

    this.type = type;
    this.provisional = provisional;
  }

  getType() {
    return this.type;
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

  getTermNode() {
    const node = this.getNode(),
          termNode = node;  ///

    return termNode;
  }

  getVariableNode() {
    const termNode = this.getTermNode(),
          variableNode = termNode.getVariableNode();

    return variableNode;
  }

  getVariableIdentifier() {
    const termNode = this.getTermNode(),
          variableIdentifier = termNode.getVariableIdentifier();

    return variableIdentifier;
  }

  isEstablished() {
    const provisional = this.isProvisional(),
          established = !provisional;

    return established;
  }

  isEqualTo(term) {
    const termNode = term.getNode(),
          termNodeMatches = this.matchTermNode(termNode),
          equalTo = termNodeMatches;  ///

    return equalTo;
  }

  isGrounded(definedVariables, context) {
    const term  = this, ///
          variables = variablesFromTerm(term, context);

    filter(variables, (variable) => {
      const definedVariablesIncludesVariable = definedVariables.includes(variable);

      if (!definedVariablesIncludesVariable) {
        return true;
      }
    });

    const undefinedVariables = variables, ///
          undefinedVariablesLength = undefinedVariables.length,
          grounded = (undefinedVariablesLength <= 1);

    return grounded;
  }

  isSingular() {
    const termNode = this.getTermNode(),
          singular = termNode.isSingular();

    return singular;
  }

  isInitiallyGrounded(context) {
    const term  = this, ///
          variables = variablesFromTerm(term, context),
          variablesLength = variables.length,
          initiallyGrounded = (variablesLength === 0);

    return initiallyGrounded;
  }

  isImplicitlyGrounded(definedVariables, context) {
    const grounded = this.isGrounded(definedVariables, context),
          implicitlyGrounded = grounded;  ///

    return implicitlyGrounded;
  }

  matchTermNode(termNode) {
    const node = termNode, ///
          nodeMatches = this.matchNode(node),
          termNodeMatches = nodeMatches; ///

    return termNodeMatches;
  }

  matchVariableNode(variableNode) {
    let variableNodeMatches = false;

    const singular = this.isSingular();

    if (singular) {
      const variableNodeA = variableNode; ///

      variableNode = this.getVariableNode();

      const variableNodeB = variableNode, ///
            variableNodeAMatchesVariableNodeB = variableNodeA.match(variableNodeB);

      if (variableNodeAMatchesVariableNodeB) {
        variableNodeMatches = true; ///
      }
    }

    return variableNodeMatches;
  }

  compareTerm(term) {
    const termNode = term.getNode(),
          termNodeMatches = this.matchNode(termNode),
          comparesTo = termNodeMatches; ///

    return comparesTo;
  }

  compareParameter(parameter) {
    let comparesToParamter = false;

    const singular = this.isSingular();

    if (singular) {
      const parameterIdentifier = parameter.getIdentifier();

      if (parameterIdentifier !== null) {
        const variableIdentifier = this.getVariableIdentifier();

        if (parameterIdentifier === variableIdentifier) {
          comparesToParamter = true;
        }
      }
    }

    return comparesToParamter;
  }

  findTerm(context) {
    const termNode = this.getTermNode(),
          term = context.findTermByTermNode(termNode);

    return term;
  }

  validate = unbreakable(function (state, context, forward, back) {
    let term;

    const termString = this.getString();  ///

    context.trace(`Validating the '${termString}' term...`);

    term = this.findTerm(context);

    if (term !== null) {
      context.debug(`...the '${termString}' term is already present.`);

      return forward(term, context, back);
    }

    term = this;  ///

    return exists(validateTerms, term, state, context, (term, state, context, back) => {
      context.addTerm(term);

      context.debug(`...validated the '${termString}' term.`);

      return forward(term, context, back);
    }, back);
  });

  validateGivenType(strict, type, state, context, forward, back) {
    if (back === undefined) {
      back = forward; ///

      forward = context; ///

      context = state; ///

      state = type; ///

      type = strict;  ///

      strict = true;
    }

    const typeString = type.getString(),
          termString = this.getString();  ///

    context.trace(`Validating the '${termString}' term given the '${typeString}' type...`);

    return this.validate(state, context, (term, context, back) => {
      let validatesGivenType = false;

      const termType = term.getType(),
            termTypeEqualToOrSubTypeOfType = termType.isEqualToOrSubTypeOf(type);

      if (termTypeEqualToOrSubTypeOfType) {
        validatesGivenType = true;

        if (strict) {
          const typeEstablished = type.isEstablished(),
                termProvisional = term.isProvisional();

          if (typeEstablished && termProvisional) {
            validatesGivenType = false;
          }
        }
      }

      if (!validatesGivenType) {
        return back();
      }

      context.debug(`...validated the '${termString}' term given the '${typeString}' type.`);

      return forward(term, context, back);
    }, back);
  }

  validateAsVariable(state, context, forward, back) {
    const termString = this.getString();  ///

    context.trace(`Validating the '${termString}' term as a variable...`);

    const term = this;  ///

    return validateTermAsVariable(term, state, context, (term, state, context) => {
      context.debug(`...validated the '${termString}' term as a variable.`);

      return forward(term, context, back);
    }, back);
  }

  unifyTerm(term, generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          generalTerm = this, ///
          specificTerm = term,
          generalTermString = generalTerm.getString(),
          specifixTermString = specificTerm.getString();

    context.trace(`Unifying the '${specifixTermString}' term with the '${generalTermString}' term...`);

    return unifyTermIntrinsically(generalTerm, specificTerm, generalContext, specificContext, (generalContext, specificContext, back) => {
      context.debug(`...unified the '${specifixTermString}' term with the '${generalTermString}' term.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  toJSON() {
    let json;

    const string = this.getString(),
          typeJSON = typeToTypeJSON(this.type),
          provisionalJSON = provisionalToProvisionalJSON(this.provisional),
          type = typeJSON,  ///
          provisional = provisionalJSON;  ///

    json = {
      string,
      type,
      provisional
    };

    return json;
  }

  static name = "Term";

  static fromJSON(json, context) {
    let term;

    instantiate((context) => {
      const { string } = json,
            termNode = instantiateTerm(string, context),
            node = termNode,  ///
            breakPoint = null,
            type = typeFromJSON(json, context),
            provisional = provisionalFromJSON(json, context);

      context = null;

      term = new Term(context, string, node, breakPoint, type, provisional);
    }, context);

    return term;
  }
});
