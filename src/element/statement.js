"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { unifyStatement } from "../process/unify";
import { validateStatements } from "../process/validation";
import { dischargeStatements } from "../process/discharge";
import { instantiateStatement } from "../process/instantiate";
import { substitutionFromStatementNode } from "../utilities/element";

const { unbreakable } = breakPointUtilities,
      { all, some, exists } = continuationUtilities;

export default define(class Statement extends Element {
  constructor(context, string, node, breakPoint, substitution) {
    super(context, string, node, breakPoint);

    this.substitution = substitution;
  }

  getSubstitution() {
    return this.substitution;
  }

  setSubstitution(substitution) {
    this.substitution = substitution;
  }

  getStatementNode() {
    const node = this.getNode(),
          statementNode = node; ///

    return statementNode;
  }

  getMetavariableNode() {
    let metavariableNode = null;

    const singular = this.isSingular();

    if (singular) {
      const statementNode = this.getStatementNode();

      metavariableNode = statementNode.getMetavariableNode();
    }

    return metavariableNode;
  }

  getMetavariableName() {
    let metavariableName = null;

    const singular = this.isSingular();

    if (singular) {
      const statementNode = this.getStatementNode(),
            metavariableNode = statementNode.getMetavariableNode();

      metavariableName = metavariableNode.getMetavariableName();
    }

    return metavariableName;
  }

  getTypeAssertionNode() {
    const statementNode = this.getStatementNode(),
          typeAssertionNode = statementNode.getTypeAssertionNode();

    return typeAssertionNode;
  }

  getDefinedAssertionNode() {
    const statementNode = this.getStatementNode(),
          definedAssertionNode = statementNode.getDefinedAssertionNode();

    return definedAssertionNode;
  }

  getContainedAssertionNode () {
    const statementNode = this.getStatementNode(),
          containedAssertionNode = statementNode.getContainedAssertionNode();

    return containedAssertionNode;
  }

  isEqualTo(statement) {
    const statementNode = statement.getNode(),
          statementNodeMatches = this.matchStatementNode(statementNode),
          equalTo = statementNodeMatches;  ///

    return equalTo;
  }

  isSimple() {
    const simple = (this.substitution === null);

    return simple;
  }

  isComplex() {
    const simple = this.isSimple(),
          complex = !simple;

    return complex;
  }

  isSingular() {
    const statementNode = this.getStatementNode(),
          singular = statementNode.isSingular();

    return singular;
  }

  isTermContained(term, context) {
    let termContained;

    const termString = term.getString(),
          statementString = this.getString();  ///

    context.trace(`Is the '${termString}' term contained in the '${statementString}' statement...`);

    const statementNode = this.getStatementNode(),
          statementNodeTermNodes = statementNode.getTermNodes();

    termContained = statementNodeTermNodes.some((statementNodeTermNode) => {  ///
      const statementNodeTermNodeMatches = term.matchTermNode(statementNodeTermNode);

      if (statementNodeTermNodeMatches) {
        return true;
      }
    });

    if (termContained) {
      context.debug(`...the '${termString}' term is contained in the '${statementString}' statement.`);
    }

    return termContained;
  }

  matchStatementNode(statementNode) {
    const node = statementNode, ///
          nodeMatches = this.matchNode(node),
          statementNodeMatches = nodeMatches; ///

    return statementNodeMatches;
  }

  matchMetavariableNode(metavariableNode) {
    let metavariableNodeMatches = false;

    const singular = this.isSingular();

    if (singular) {
      const metavariableNodeA = metavariableNode, ///
            statementNode = this.getStatementNode();

      metavariableNode = statementNode.getMetavariableNode();

      const metavariableNodeB = metavariableNode, ///
            metavariableNodeAMatchesMetavariableNodeB = metavariableNodeA.match(metavariableNodeB);

      if (metavariableNodeAMatchesMetavariableNodeB) {
        metavariableNodeMatches = true;
      }
    }

    return metavariableNodeMatches;
  }

  isConditional() {
    let conditional = false;

    const statementNode = this.getStatementNode(),
          subproofAssertionNode = statementNode.getSubproofAssertionNode();

    if (subproofAssertionNode !== null) {
      conditional = true;
    }

    return conditional;
  }

  findStatement(context) {
    const statementNode = this.getStatementNode(),
          statement = context.findStatementByStatementNode(statementNode);

    return statement;
  }

  findDeducedStatement(context) {
    const subproofAssertion = this.findSubproofAssertion(context),
          deducedStatement = (subproofAssertion !== null) ?
                                subproofAssertion.getDeducedStatement() :
                                  this; ///

    return deducedStatement;
  }

  findSubproofAssertion(context) {
    let subproofAssertion = null;

    const statementNode = this.getStatementNode(),
          subproofAssertionNode = statementNode.getSubproofAssertionNode();

    if (subproofAssertionNode !== null) {
      subproofAssertion = context.findAssertionByAssertionNode(subproofAssertionNode);
    }

    return subproofAssertion;
  }

  findSupposedStatements(context) {
    const subproofAssertion = this.findSubproofAssertion(context),
          supposedStatements = (subproofAssertion !== null) ?
                                 subproofAssertion.getSupposedStatements() :
                                   [];

    return supposedStatements;
  }

  compareParameter(parameter) {
    let comparesToParamter = false;

    const singular = this.isSingular();

    if (singular) {
      const parameterName = parameter.getName();

      if (parameterName !== null) {
        const metavariableName = this.getMetavariableName();

        if (parameterName === metavariableName) {
          comparesToParamter = true;
        }
      }
    }

    return comparesToParamter;
  }

  validate = unbreakable( function(state, context, forward, back) {
    let statement;

    const statementString = this.getString();  ///

    context.trace(`Validating the '${statementString}' statement...`);

    statement = this.findStatement(context);

    if (statement !== null) {
      context.debug(`The '${statementString}' statement is already present.`);

      return forward(statement, context, back);
    }

    statement = this; ///

    return exists(validateStatements, statement, state, context, (statement, state, context, back) => {
      context.addStatement(statement);

      context.debug(`...validated the '${statementString}' statement.`);

      return forward(statement, context, back);
    }, back);
  });

  discharge(generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          statementString = this.getString();  ///

    context.trace(`Dicharging the '${statementString}' statement...`);

    const statement = this; ///

    return some(dischargeStatements, (dischargeStatement, generalContext, specificContext, forward, back) => {
      return dischargeStatement(statement, generalContext, specificContext, forward, back);
    }, generalContext, specificContext, (generalContext, specificContext, back) => {
      context.debug(`...discharged the '${statementString}' statement.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  unifyStatement(statement, generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          generalStatement = this,  ///
          specificStatement = statement, ///
          generalStatementString = generalStatement.getString(),
          specificStatementString = specificStatement.getString();

    context.trace(`Unifying the '${specificStatementString}' statement with the '${generalStatementString}' statement...`);

    return unifyStatement(generalStatement, specificStatement, generalContext, specificContext, (generalContext, specificContext, back) => {
      context.debug(`...unified the '${specificStatementString}' statement with the '${generalStatementString}' statement.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  applyIndependently(generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          statementString = this.getString();  ///

    context.trace(`Applying the '${statementString}' statement independently...`);

    const applyTypeAssertionIndependently = this.applyTypeAssertionIndependently.bind(this),
          applyDefinedAssertionIndependently = this.applyDefinedAssertionIndependently.bind(this),
          applyContainedAssertionIndependently = this.applyContainedAssertionIndependently.bind(this);

    return all([
      applyTypeAssertionIndependently,
      applyDefinedAssertionIndependently,
      applyContainedAssertionIndependently
    ], generalContext, specificContext, (generalContext, specificContext, back) => {
      context.debug(`...applied the '${statementString}' statement independently.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  applyTypeAssertionIndependently(generalContext, specificContext, forward, back) {
    let context;

    context = specificContext;  ///

    const typeAssertionNode = this.getTypeAssertionNode();

    if (typeAssertionNode === null) {
      return forward(generalContext, specificContext, back);
    }

    const statementString = this.getString();  ///

    context.trace(`Applying the '${statementString}' statement's type assertion independently...`);

    context = generalContext; ///

    const typeAssertion = context.findAssertionByAssertionNode(typeAssertionNode);

    return typeAssertion.applyIndependently(generalContext, specificContext, (generalContext, specificContext, back) => {
      context.trace(`...applied the '${statementString}' statement's type assertion independently.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  applyDefinedAssertionIndependently(generalContext, specificContext, forward, back) {
    let context;

    context = specificContext;  ///

    const definedAssertionNode = this.getDefinedAssertionNode();

    if (definedAssertionNode === null) {
      return forward(generalContext, specificContext, back);
    }

    const statementString = this.getString();  ///

    context.trace(`Applying the '${statementString}' statement's defined assertion independently...`);

    context = generalContext; ///

    const definedAssertion = context.findAssertionByAssertionNode(definedAssertionNode);

    return definedAssertion.applyIndependently(generalContext, specificContext, (generalContext, specificContext, back) => {
      context.debug(`...applying the '${statementString}' statement's defined assertion independently.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  applyContainedAssertionIndependently(generalContext, specificContext, forward, back) {
    let context;

    context = specificContext;  ///

    const containedAssertionNode = this.getContainedAssertionNode();

    if (containedAssertionNode === null) {
      return forward(generalContext, specificContext, back);
    }

    const statementString = this.getString();  ///

    context.trace(`Applying the '${statementString}' statement's contained assertion independently...`);

    context = generalContext; ///

    const containedAssertion = context.findAssertionByAssertionNode(containedAssertionNode);

    return containedAssertion.applyIndependently(generalContext, specificContext, (generalContext, specificContext, back) => {
      context.debug(`...applying the '${statementString}' statement's contained assertion independently.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  toJSON() {
    let json;

    const string = this.getString();

    json = {
      string
    };

    return json;
  }

  static name = "Statement";

  static fromJSON(json, context) {
    let statement;

    instantiate((context) => {
      const { string } = json,
            statementNode = instantiateStatement(string, context),
            node = statementNode, ///
            breakPoint = null,
            substitution = substitutionFromStatementNode(statementNode, context);

      context = null;

      statement = new Statement(context, string, node, breakPoint, substitution);
    }, context);

    return statement;
  }
});
