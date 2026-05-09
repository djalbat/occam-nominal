"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { unifyStatement } from "../process/unify";
import { validateStatements } from "../process/validation";
import { dischargeStatements } from "../process/discharge";
import { instantiateStatement } from "../process/instantiate";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";

export default define(class Statement extends Element {
  getStatementNode() {
    const node = this.getNode(),
          statementNode = node; ///

    return statementNode;
  }

  getTermSubstitutionNode() {
    const statementNode = this.getNode(),
          termSubstitutionNode = statementNode.getTermSubstitutionNode();

    return termSubstitutionNode;
  }

  getFrameSubstitutionNode() {
    const statementNode = this.getNode(),
          frameSubstitutionNode = statementNode.getFrameSubstitutionNode();

    return frameSubstitutionNode;
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

  isSingular() {
    const statementNode = this.getStatementNode(),
          singular = statementNode.isSingular();

    return singular;
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

  findValidStatement(context) {
    const statementNode = this.getStatementNode(),
          statement = context.findStatementByStatementNode(statementNode),
          validStatement = statement;  ///

    return validStatement;
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

  validate(context) {
    let statement = null;

    const statementString = this.getString();  ///

    context.trace(`Validating the '${statementString}' statement...`);

    let validates;

    const validStatement = this.findValidStatement(context);

    if (validStatement !== null) {
      validates = true;

      statement = validStatement; ///

      context.debug(`...the '${statementString}' statement is already valid.`);
    } else {
      validates = validateStatements.some((validateStatement) => {
        const statement = this, ///
              statementValidates = validateStatement(statement, context);

        if (statementValidates) {
          return true;
        }
      });

      if (validates) {
        statement = this; ///

        context.addStatement(statement);
      }
    }

    if (validates) {
      context.debug(`...validated the '${statementString}' statement.`);
    }

    return statement;
  }

  discharge(context) {
    let discharges;

    const statementString = this.getString();  ///

    context.trace(`Dicharging the '${statementString}' statement...`);

    discharges = dischargeStatements.some((dischargeStatement) => {
      const statement = this, ///
            statementDischarged = dischargeStatement(statement, context);

      if (statementDischarged) {
        return true;
      }
    });

    if (discharges) {
      context.debug(`...discharged the '${statementString}' statement.`);
    }

    return discharges;
  }

  unifyStatement(statement, generalContext, specificContext) {
    let statementUnifies;

    const context = specificContext,  ///
          generalStatement = this,  ///
          specificStatement = statement, ///
          generalStatementString = generalStatement.getString(),
          specificStatementString = specificStatement.getString();

    context.trace(`Unifying the '${specificStatementString}' statement with the '${generalStatementString}' statement...`);

    statementUnifies = unifyStatement(generalStatement, specificStatement, generalContext, specificContext);

    if (statementUnifies) {
      context.debug(`...unified the '${specificStatementString}' statement with the '${generalStatementString}' statement.`);
    }

    return statementUnifies;
  }

  unifyIndependently(generalContext, specificContext) {
    let unifiesIndependently = false;

    const context = specificContext,  ///
          statementString = this.getString();  ///

    context.trace(`Unifying the '${statementString}' statement independently...`);

    const statementNode = this.getStatementNode(),
          typeAssertionNode = statementNode.getTypeAssertionNode(),
          definedAssertionNode = statementNode.getDefinedAssertionNode(),
          containedAssertionNode = statementNode.getContainedAssertionNode();

    if (typeAssertionNode !== null) {
      const context = generalContext, ///
            typeAssertion = context.findAssertionByAssertionNode(typeAssertionNode),
            typeAssertionUnifiesIndependently = typeAssertion.unifyIndependently(generalContext, specificContext);

      if (typeAssertionUnifiesIndependently) {
        unifiesIndependently = true;
      }
    }

    if (definedAssertionNode !== null) {
      const context = generalContext, ///
            definedAssertion = context.findAssertionByAssertionNode(definedAssertionNode),
            definedAssertionUnifiesIndependently = definedAssertion.unifyIndependently(generalContext, specificContext);

      if (definedAssertionUnifiesIndependently) {
        unifiesIndependently = true;
      }
    }

    if (containedAssertionNode !== null) {
      const context = generalContext, ///
            containedAssertion = context.findAssertionByAssertionNode(containedAssertionNode),
            containedAssertionUnifiesIndependently = containedAssertion.unifyIndependently(generalContext, specificContext);

      if (containedAssertionUnifiesIndependently) {
        unifiesIndependently = true;
      }
    }

    if (unifiesIndependently) {
      context.debug(`...unified the '${statementString}' statement independently.`);
    }

    return unifiesIndependently;
  }

  static name = "Statement";

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
            statementNode = instantiateStatement(string, context),
            node = statementNode, ///
            breakPoint = breakPointFromJSON(json);

      context = null;

      const statement = new Statement(context, string, node, breakPoint);

      return statement;
    }, context);
  }
});
