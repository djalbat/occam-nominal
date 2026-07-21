"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { exists } from "../utilities/continuation";
import { instantiate } from "../utilities/context";
import { unifyStatement } from "../process/unify";
import { validateStatements } from "../process/validation";
import { dischargeStatements } from "../process/discharge";
import { instantiateStatement } from "../process/instantiate";
import { substitutionFromStatementNode } from "../utilities/element";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Statement extends Element {
  constructor(context, string, node, breakPoint, substitution) {
    super(context, string, node, breakPoint);

    this.substitution = substitution;
  }

  getSubstitution() {
    return this.substitution;
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

  isFrameContained(frame, context) {
    let frameContained;

    const frameString = frame.getString(),
          statementString = this.getString();  ///

    context.trace(`Is the '${frameString}' frame contained in the '${statementString}' statement...`);

    const statementNode = this.getStatementNode(),
          statementNodeFrameNodes = statementNode.getFrameNodes();

    frameContained = statementNodeFrameNodes.some((statementNodeFrameNode) => {  ///
      const statementNodeFrameNodeMatches = frame.matchNode(statementNodeFrameNode);

      if (statementNodeFrameNodeMatches) {
        return true;
      }
    });

    if (frameContained) {
      context.debug(`...the '${frameString}' frame is contained in the '${statementString}' statement.`);
    }

    return frameContained;
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

  findValidStatement(context) {
    const statementNode = this.getStatementNode(),
          statement = context.findStatementByStatementNode(statementNode),
          validStatement = statement;  ///

    return validStatement;
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

  validate(context, continuation) {
    const statementString = this.getString();  ///

    context.trace(`Validating the '${statementString}' statement...`);

    const validStatement = this.findValidStatement(context);

    if (validStatement !== null) {
      const statement = validStatement; ///

      context.debug(`...the '${statementString}' statement is already valid.`);

      return continuation(statement, context);
    }

    const statement = this;

    return exists(validateStatements, statement, context, (statementValidates, context) => {
      let statement = null;

      if (statementValidates) {
        statement = this;

        context.addStatement(statement);

        context.debug(`...validated the '${statementString}' statement.`);
      }

      return continuation(statement, context);
    });
  }

  discharge(context) {
    let discharges;

    const statementString = this.getString();  ///

    context.trace(`Dicharging the '${statementString}' statement...`);

    discharges = dischargeStatements.some((dischargeStatement) => {
      const statement = this, ///
            statementDischarges = dischargeStatement(statement, context);

      if (statementDischarges) {
        return true;
      }
    });

    if (discharges) {
      context.debug(`...discharged the '${statementString}' statement.`);
    }

    return discharges;
  }

  unifyStatement(statement, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          generalStatement = this,  ///
          specificStatement = statement, ///
          generalStatementString = generalStatement.getString(),
          specificStatementString = specificStatement.getString();

    context.trace(`Unifying the '${specificStatementString}' statement with the '${generalStatementString}' statement...`);

    return unifyStatement(generalStatement, specificStatement, generalContext, specificContext, (statementUnifies) => {
      if (statementUnifies) {
        context.debug(`...unified the '${specificStatementString}' statement with the '${generalStatementString}' statement.`);
      }

      return continuation(statementUnifies);
    });
  }

  unifyIndependently(generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          statementString = this.getString();  ///

    context.trace(`Unifying the '${statementString}' statement independently...`);

    const statementNode = this.getStatementNode(),
          typeAssertionNode = statementNode.getTypeAssertionNode(),
          definedAssertionNode = statementNode.getDefinedAssertionNode(),
          containedAssertionNode = statementNode.getContainedAssertionNode();

    if (typeAssertionNode !== null) {
      const context = generalContext, ///
            typeAssertion = context.findAssertionByAssertionNode(typeAssertionNode);

      return typeAssertion.unifyIndependently(generalContext, specificContext, (typeAssertionUnifiesIndependently) => {
        let unifiesIndependently = false;

        if (typeAssertionUnifiesIndependently) {
          unifiesIndependently = true;
        }

        if (unifiesIndependently) {
          context.debug(`...unified the '${statementString}' statement independently.`);
        }

        return continuation(unifiesIndependently);
      });
    }

    if (definedAssertionNode !== null) {
      const context = generalContext, ///
            definedAssertion = context.findAssertionByAssertionNode(definedAssertionNode);

      return definedAssertion.unifyIndependently(generalContext, specificContext, (definedAssertionUnifiesIndependently) => {
        let unifiesIndependently = false;

        if (definedAssertionUnifiesIndependently) {
          unifiesIndependently = true;
        }

        if (unifiesIndependently) {
          context.debug(`...unified the '${statementString}' statement independently.`);
        }

        return continuation(unifiesIndependently);
      });
    }

    if (containedAssertionNode !== null) {
      const context = generalContext, ///
            containedAssertion = context.findAssertionByAssertionNode(containedAssertionNode);

      return containedAssertion.unifyIndependently(generalContext, specificContext, (containedAssertionUnifiesIndependently) => {
        let unifiesIndependently = false;

        if (containedAssertionUnifiesIndependently) {
          unifiesIndependently = true;
        }

        if (unifiesIndependently) {
          context.debug(`...unified the '${statementString}' statement independently.`);
        }

        return continuation(unifiesIndependently);
      });
    }

    const unifiesIndependently = false;

    return continuation(unifiesIndependently);
  }

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

  static name = "Statement";

  static fromJSON(json, context) {
    return instantiate((context) => {
      const { string } = json,
            statementNode = instantiateStatement(string, context),
            node = statementNode, ///
            breakPoint = breakPointFromJSON(json),
            substitution = substitutionFromStatementNode(statementNode, context);

      context = null;

      const statement = new Statement(context, string, node, breakPoint, substitution);

      return statement;
    }, context);
  }
});
