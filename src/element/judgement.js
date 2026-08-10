"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import elements from "../elements";

import { one } from "../utilities/continuation";
import { define } from "../elements";
import { instantiate,} from "../utilities/context";
import { all, exists } from "../utilities/continuation";
import { equateStatements } from "../process/equate";
import { instantiateJudgement } from "../process/instantiate";
import { judgementFromStatementNode } from "../utilities/element";
import { declare, isDerived, isDeclared } from "../utilities/state";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Judgement extends Element {
  constructor(context, string, node, breakPoint, frame, goal) {
    super(context, string, node, breakPoint);

    this.frame = frame;
    this.goal = goal;
  }

  getFrame() {
    return this.frame;
  }

  getAssumption() {
    return this.goal;
  }

  getJudgementNode() {
    const node = this.getNode(),
      judgementNode = node; ///

    return judgementNode;
  }

  isSingular() {
    const judgementNode = this.getJudgementNode(),
      singular = judgementNode.isSingular();

    return singular;
  }

  isEqualTo(judgement) {
    const judgementNode = judgement.getNode(),
      judgementNodeMatches = this.matchJudgementNode(judgementNode),
      equalTo = judgementNodeMatches;  ///

    return equalTo;
  }

  isMetavariableDefined(metavariable) { return this.frame.isMetavariableDefined(metavariable); }

  isImplicit() { return this.frame.isImplicit(); }

  getStatement() { return this.goal.getStatement(); }

  getReference() { return this.goal.getReference(); }

  isConditional() { return this.goal.isConditional(); }

  getAssumptions() { return this.frame.getAssumptions(); }

  getMetavariable() { return this.frame.getMetavariable(); }

  findDeducedStatement(context) { return this.goal.findDeducedStatement(context); }

  findSupposedStatements(context) { return this.goal.findSupposedStatements(context); }

  matchJudgementNode(judgementNode) {
    const node = judgementNode, ///
      nodeMatches = this.matchNode(node),
      judgementNodeMatches = nodeMatches; ///

    return judgementNodeMatches;
  }

  matchMetavariableNode(metavariableNode) { return this.frame.matchMetavariableNode(metavariableNode); }

  findSubproofAssertion(context) { return this.goal.findSubproofAssertion(context); }

  findJudgement(context) {
    const judgementNode = this.getJudgementNode(),
      judgement = context.findJudgementByJudgementNode(judgementNode);

    return judgement;
  }

  compareStep(step, context) {
    let comparesToStep = false;

    const stepString = step.getString(),
      judgementString = this.getString();  ///

    context.trace(`Comparing the '${stepString}' step to the '${judgementString}' judgement...`);

    const statement = step.getStatement(),
      comparesToStatement = this.compareStatement(statement, context);

    if (comparesToStatement) {
      comparesToStep = true;
    }

    if (comparesToStep) {
      context.debug(`...compared the '${stepString}' step to the '${judgementString}' judgement.`);
    }

    return comparesToStep;
  }

  compareStatement(statement, context) {
    let comparesToStatement = false;

    const judgementString = this.getString(), ///
      statementString = statement.getString();

    context.trace(`Comparing the '${statementString}' statement to the '${judgementString}' judgement...`);

    const leftStatement = statement;  ///

    statement = this.getStatement();

    const rightStatement = statement,  ///
      statementsEquate = equateStatements(leftStatement, rightStatement, context);

    if (statementsEquate) {
      comparesToStatement = true;
    }

    if (comparesToStatement) {
      context.debug(`...compared the '${statementString}' statement to the '${judgementString}' judgement.`);
    }

    return comparesToStatement;
  }

  compareMetavariableName(metavariableName) { return this.frame.compareMetavariableName(metavariableName); }

  validate(state, context, continuation) {
    let validates;

    const judgementString = this.getString();  ///

    context.trace(`Validating the '${judgementString}' judgement...`);

    let judgement;

    judgement = this.findJudgement(context);

    if (judgement !== null) {
      context.debug(`The '${judgementString}' judgement is already present.`);

      validates = continuation(judgement, context);
    } else {
      judgement = this; ///

      const validateGoal = this.validateGoal.bind(this),
        validateFrame = this.validateFrame.bind(this);

      validates = all([
        validateGoal,
        validateFrame
      ], state, context, (state, context) => {
        let validates;

        const validateWhenDeclared = this.validateWhenDeclared.bind(this),
          validateWhenDerived = this.validateWhenDerived.bind(this);

        validates = exists([
          validateWhenDeclared,
          validateWhenDerived
        ], state, context, (state, context) => {
          let validates;

          context.addJudgement(judgement);

          validates = continuation(judgement, context);

          return validates;
        });

        return validates;
      });
    }

    if (validates) {
      context.debug(`...validated the '${judgementString}' judgement.`);
    }

    return validates;
  }

  validateGoal(state, context, continuation) {
    let goalValidates;

    const judgementString = this.getString();  ///

    context.trace(`Validating the '${judgementString}' judgement's goal...`);

    goalValidates = this.goal.validate(state, context, (goal, context) => {
      let validates;

      this.goal = goal;

      validates = continuation(state, context);

      return validates;
    });

    if (goalValidates) {
      context.debug(`...validates the '${judgementString}' judgement's goal.`);
    }

    return goalValidates;
  }

  validateFrame(state, context, continuation) {
    let frameValidates;

    const judgementString = this.getString();  ///

    context.trace(`Validating the '${judgementString}' judgement's frame...`);

    frameValidates = this.frame.validate(state, context, (frame, context) => {
      let validates;

      this.frame = frame;

      validates = continuation(state, context);

      return validates;
    });

    if (frameValidates) {
      context.debug(`...validates the'${judgementString}' judgement's frame.`);
    }

    return frameValidates;
  }

  validateWhenDeclared(state, context, continuation) {
    let validatesWhenDeclared = false;

    const declared = isDeclared(state);

    if (declared) {
      const judgementString = this.getString(); ///

      context.trace(`Validating the '${judgementString}' declared judgement...`);

      validatesWhenDeclared = continuation(state, context);

      if (validatesWhenDeclared) {
        context.debug(`...validated the '${judgementString}' declared judgement.`);
      }
    }

    return validatesWhenDeclared;
  }

  validateWhenDerived(state, context, continuation) {
    let validatesWhenDerived = false;

    const derived = isDerived(state);

    if (derived) {
      const judgementString = this.getString(); ///

      context.trace(`Validating the '${judgementString}' derived judgement...`);

      const schemas = context.getSchemas(),
        judgement = this; ///

      validatesWhenDerived = one(schemas, (schema, context) => {
        let success = false;

        schema.unifyJudgement(judgement, context, (judgementUnifies) => {
          if (judgementUnifies) {
            success = true;
          }
        });

        return success;
      }, context, (context) => true);

      if (validatesWhenDerived) {
        validatesWhenDerived = continuation(state, context);
      }

      if (validatesWhenDerived) {
        context.debug(`...validated the '${judgementString}' derived judgement.`);
      }
    }

    return validatesWhenDerived;
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

  static name = "Judgement";

  static fromJSON(json, context) {
    let judgement;

    instantiate((context) => {
      const { string } = json,
        judgementNode = instantiateJudgement(string, context),
        node = judgementNode,  ///
        breakPoint = breakPointFromJSON(json),
        frame = frameFromJudgementNode(judgementNode, context),
        goal = goalFromJudgementNode(judgementNode, context);

      context = null;

      judgement = new Judgement(context, string, node, breakPoint, frame, goal);
    }, context);

    return judgement;
  }

  static fromStatement(statement, context) {
    const statementNode = statement.getNode(),
      judgement = judgementFromStatementNode(statementNode, context);

    return judgement;
  }
});

function goalFromJudgementNode(judgementNode, context) {
  const goalNode = judgementNode.getGoalNode(),
    goal = context.findGoalByGolaNode(goalNode);

  return goal;
}

function frameFromJudgementNode(judgementNode, context) {
  const frameNode = judgementNode.getFrameNode(),
    frame = context.findFrameByFrameNode(frameNode);

  return frame;
}
