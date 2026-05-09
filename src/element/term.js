"use strict";

import { Element } from "occam-languages";
import { arrayUtilities } from "necessary";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { validateTerms } from "../process/validation";
import { instantiateTerm } from "../process/instantiate";
import { variablesFromTerm } from "../utilities/equivalence";
import { unifyTermIntrinsically } from "../process/unify";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";
import { typeFromJSON, typeToTypeJSON, provisionalFromJSON, provisionalToProvisionalJSON } from "../utilities/json";

const { filter } = arrayUtilities;

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

  validate(context, validateForwards) {
    let term = null;

    const termString = this.getString();  ///

    context.trace(`Validating the '${termString}' term...`);

    let validates = false;

    const validTerm = this.findValidTerm(context);

    if (validTerm !== null) {
      term = validTerm; ///

      const validatesForward = validateForwards(term, context);

      if (validatesForward) {
        validates = true;

        context.debug(`...the '${termString}' term is already valid.`);
      } else {
        term = null;
      }
    } else {
      validates = validateTerms.some((validateTerm) => {  ///
        const term = this,  ///
              termValidates = validateTerm(term, context, validateForwards);

        if (termValidates) {
          return true;
        }
      });

      if (validates) {
        term = this;  ///

        context.addTerm(term);
      }
    }

    if (validates) {
      context.debug(`...validated the '${termString}' term.`);
    }

    return term;
  }

  validateGivenType(type, context) {
    let term;

    const typeString = type.getString(),
          termString = this.getString();  ///

    context.trace(`Validating the '${termString}' term given the '${typeString}' type...`);

    let validatesGivenType = false;

    term = this.validate(context, (term, context) => {
      let validatesForwards = false;

      const termType = term.getType(),
            termTypeEqualToOrSubTypeOfType = termType.isEqualToOrSubTypeOf(type);

      if (termTypeEqualToOrSubTypeOfType) {
        validatesForwards = true;

        const typeEstablished = type.isEstablished(),
              termProvisional = term.isProvisional();

        if (typeEstablished && termProvisional) {
          validatesForwards = false;
        }
      }

      return validatesForwards;
    });

    if (term !== null) {
      validatesGivenType = true;
    }

    if (validatesGivenType) {
      context.debug(`...validated the '${termString}' term given the '${typeString}' type.`);
    }

    return term;
  }

  unifyTerm(term, generalContext, specificContext) {
    let termUnifies = false;

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
