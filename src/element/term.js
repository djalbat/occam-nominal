"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateTerm } from "../process/instantiate";
import { variablesFromTerm } from "../utilities/equivalence";
import { unifyTermIntrinsically } from "../process/unify";
import { validateTerms, unifyTermWithProperties } from "../process/validation";
import { typeFromJSON, typeToTypeJSON, provisionalFromJSON, provisionalToProvisionalJSON } from "../utilities/json";

const { filter } = arrayUtilities,
      { exists } = continuationUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  findValidTerm(context) {
    const termNode = this.getTermNode(),
          term = context.findTermByTermNode(termNode),
          validTerm = term; ///

    return validTerm;
  }

  validate(context, continuation) {
    const termString = this.getString();  ///

    context.trace(`Validating the '${termString}' term...`);

    const validTerm = this.findValidTerm(context);

    if (validTerm !== null) {
      const term = validTerm; ///

      context.debug(`...the '${termString}' term is already valid.`);

      return continuation(term, context);
    }

    let term = this;

    return exists(validateTerms, term, context, (termValidates, context) => {
      if (termValidates) {
        context.addTerm(term);

        context.debug(`...validated the '${termString}' term.`);
      } else {
        term = null;
      }

      return continuation(term, context);
    });
  }

  validateGivenType(strict, type, context, continuation) {
    if (continuation === undefined) {
      continuation = context; ///

      context = type; ///

      type = strict;  ///

      strict = true;
    }

    const typeString = type.getString(),
          termString = this.getString();  ///

    context.trace(`Validating the '${termString}' term given the '${typeString}' type...`);

    return this.validate(context, (term, context) => {
      let validatesGivenType = false;

      if (term !== null) {
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
      }

      if (!validatesGivenType) {
        term = null;
      }

      if (validatesGivenType) {
        context.debug(`...validated the '${termString}' term given the '${typeString}' type.`);
      }

      return continuation(term, context);
    });
  }

  validateAsProperty(context, continuation) {
    let term;

    const termString = this.getString();  ///

    context.trace(`Validating the '${termString}' term as a property...`);

    debugger

    let validatesAsProperty = false;

    const validTerm = this.findValidTerm(context);

    if (validTerm !== null) {
      term = validTerm; ///

      const validatesForward = continuation(term, context);

      if (validatesForward) {
        validatesAsProperty = true;

        context.debug(`...the '${termString}' term is already valid.`);
      } else {
        term = null;
      }
    } else {
      term = this;  ///

      const termUnifiesWithProperties = unifyTermWithProperties(term, context, continuation);

      if (termUnifiesWithProperties) {
        validatesAsProperty = true;
      } else {
        term = null;
      }

      if (validatesAsProperty) {
        context.addTerm(term);
      }
    }

    if (validatesAsProperty) {
      context.debug(`...validated the '${termString}' term as a property.`);
    }

    return term;
  }

  unifyTerm(term, generalContext, specificContext) {
    let termUnifies = false;

    debugger

    const context = specificContext,  ///
          generalTerm = this,
          specificTerm = term,
          generalTermString = generalTerm.getString(),
          specifixTermString = specificTerm.getString();

    context.trace(`Unifying the '${specifixTermString}' term with the '${generalTermString}' term...`);

    const termUnifiesIntrinsically = unifyTermIntrinsically(generalTerm, specificTerm, generalContext, specificContext);

    if (termUnifiesIntrinsically) {
      termUnifies = true;
    }

    if (termUnifies) {
      context.debug(`...unified the '${specifixTermString}' term with the '${generalTermString}' term.`);
    }

    return termUnifies;
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

  static name = "Term";

  static fromJSON(json, context) {
    return instantiate((context) => {
      const { string } = json,
            termNode = instantiateTerm(string, context),
            node = termNode,  ///
            breakPoint = breakPointFromJSON(json),
            type = typeFromJSON(json, context),
            provisional = provisionalFromJSON(json, context);

      context = null;

      const term = new Term(context, string, node, breakPoint, type, provisional);

      return term;
    }, context);
  }
});
