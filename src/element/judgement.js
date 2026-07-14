"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities } from "occam-languages";

import elements from "../elements";

import { define } from "../elements";
import { instantiate,} from "../utilities/context";
import { all, exists } from "../utilities/continuation";
import { equateStatements } from "../process/equate";
import { instantiateJudgement } from "../process/instantiate";
import { judgementFromStatementNode } from "../utilities/element";

const { one, push } = arrayUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  getMetavariable() { return this.frame.getMetavariable(); }

  getAssumptions(context) {
    const assumptions = [],
          metavariable = this.getMetavariable(),
          frameAssumptions = this.frame.getAssumptions();

    push(assumptions, frameAssumptions);

    if (metavariable !== null) {
      const proofAssertions = context.getProofAssertions(),
            implicitAssumptions = implicitAssumptionsFromProofAssertions(proofAssertions, context);

      push(assumptions, implicitAssumptions);
    }

    return assumptions;
  }

  matchJudgementNode(judgementNode) {
    const node = judgementNode, ///
          nodeMatches = this.matchNode(node),
          judgementNodeMatches = nodeMatches; ///

    return judgementNodeMatches;
  }

  matchMetavariableNode(metavariableNode) { return this.frame.matchMetavariableNode(metavariableNode); }

  findSubproofAssertion(context) { return this.goal.findSubproofAssertion(context); }

  findValidJudgement(context) {
    const judgementNode = this.getJudgementNode(),
          judgement = context.findJudgementByJudgementNode(judgementNode),
          validJudgemenet = judgement;  ///

    return validJudgemenet;
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

  validate(context, continuation) {
    const judgementString = this.getString();  ///

    context.trace(`Validating the '${judgementString}' judgement...`);

    const validJudgement = this.findValidJudgement(context);

    if (validJudgement !== null) {
      const judgement = validJudgement; ///

      context.debug(`...the '${judgementString}' judgement is already valid.`);

      continuation(judgement);

      return;
    }

    const validateGoal = this.validateGoal.bind(this),
          validateFrame = this.validateFrame.bind(this);

    return all([
      validateFrame,
      validateGoal
    ], context, (validates) => {
      if (!validates) {
        const judgement = null;

        continuation(judgement);

        return;
      }

      const validateWhenStated = this.validateWhenStated.bind(this),
            validateWhenDerived = this.validateWhenDerived.bind(this);

      return exists([
        validateWhenStated,
        validateWhenDerived
      ], context, (validates) => {
        let judgement = null;

        if (validates) {
          judgement = this; ///

          context.addJudgement(judgement);
        }

        if (validates) {
          context.debug(`...validated the '${judgementString}' judgement.`);
        }

        return continuation(judgement);
      });
    });
  }

  validateGoal(context, continuation) {
    const judgementString = this.getString(); ///

    context.trace(`Validating the '${judgementString}' judgement's goal...`);

    this.goal.validate(context, (goal) => {
      let goalValidates = false;

      if (goal !== null) {
        this.goal = goal;

        goalValidates = true;
      }

      if (goalValidates) {
        context.debug(`...validated the '${judgementString}' judgement's goal.`);
      }

      continuation(goalValidates);
    });
  }

  validateFrame(context, continuation) {
    const judgementString = this.getString(); ///

    context.trace(`Validating the '${judgementString}' judgement's frame...`);

    this.frame.validate(context, (frame) => {
      let frameValidates = false;

      if (frame !== null) {
        this.frame = frame;

        frameValidates = true;
      }

      if (frameValidates) {
        context.trace(`...validated the '${judgementString}' judgement's frame.`);
      }

      continuation(frameValidates);
    });
  }

  validateWhenStated(context, continuation) {
    const stated = context.isStated();

    if (!stated) {
      const validatesWhenStated = false;

      return continuation(validatesWhenStated);
    }

    let validatesWhenStated;

    const judgementString = this.getString();  ///

    context.trace(`Validating the '${judgementString}' stated judgement...`);

    validatesWhenStated = true;

    if (validatesWhenStated) {
      context.debug(`...validated the '${judgementString}' stated judgement.`);
    }

    return continuation(validatesWhenStated);
  }

  validateWhenDerived(context, continuation) {
    const stated = context.isStated();

    if (stated) {
      const validatesWhenDerived = false;

      continuation(validatesWhenDerived);

      return;
    }

    let validatesWhenDerived = false;

    const judgementString = this.getString();  ///

    context.trace(`Validating the '${judgementString}' derived judgement...`);

    const schemas = context.getSchemas(),
          judgement = this, ///
          judgementUnifies = one(schemas, (schema) => {
            const judgementUnifies = schema.unifyJudgement(judgement, context);

            if (judgementUnifies) {
              return true;
            }
          });

    if (judgementUnifies) {
      validatesWhenDerived = true;
    }

    if (validatesWhenDerived) {
      context.debug(`...validated the '${judgementString}' derived judgement.`);
    }

    return validatesWhenDerived;
  }

  static name = "Judgement";

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
            judgementNode = instantiateJudgement(string, context),
            node = judgementNode,  ///
            breakPoint = breakPointFromJSON(json),
            frame = frameFromJudgementNode(judgementNode, context),
            goal = goalFromJudgementNode(judgementNode, context);

      context = null;

      const judgement = new Judgement(context, string, node, breakPoint, frame, goal);

      return judgement;
    }, context);
  }

  static fromStatement(statement, context) {
    const statementNode = statement.getNode(),
      judgement = judgementFromStatementNode(statementNode, context);

    return judgement;
  }

  static fromProofAssertion(proofAssertion, context) {
    let judgement = null;

    const statementNode = proofAssertion.getStatementNode();

    if (statementNode !== null) {
      judgement = judgementFromStatementNode(statementNode, context);
    }

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

function implicitAssumptionsFromProofAssertions(proofAssertions, context) {
  const { ImplicitAssumption } = elements,
        implicitAssumptions = proofAssertions.map((proofAssertion) => {
          const statement = proofAssertion.getStatement(),
                implicitAssumption = ImplicitAssumption.fromStatement(statement, context);

          return implicitAssumption;
        });

  return implicitAssumptions;
}

