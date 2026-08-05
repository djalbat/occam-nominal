"use strict";

import { arrayUtilities } from "necessary";
import { Element, breakPointUtilities } from "occam-languages";

import elements from "../elements";

import { one } from "../utilities/continuation";
import { define } from "../elements";
import { instantiate,} from "../utilities/context";
import { all, exists } from "../utilities/continuation";
import { equateStatements } from "../process/equate";
import { instantiateJudgement } from "../process/instantiate";
import { judgementFromStatementNode } from "../utilities/element";

const { push } = arrayUtilities,
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
      const facts = context.getFacts(),
            implicitAssumptions = implicitAssumptionsFromFacts(facts, context);

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

  validate(context, continuation) {
    let validates;

    const judgementString = this.getString();  ///

    context.trace(`Validating the '${judgementString}' judgement...`);

    let judgement;

    judgement = this.findJudgement(context);

    if (judgement !== null) {
      context.debug(`The '${judgementString}' judgement is already present.`);

      validates = continuation(judgement, context);
    } else {
      judgement = this;

      const validateGoal = this.validateGoal.bind(this),
            validateFrame = this.validateFrame.bind(this);

      validates = all([
        validateGoal,
        validateFrame
      ], context, (context) => {
        let validates;

        const validateWhenStated = this.validateWhenStated.bind(this),
              validateWhenDerived = this.validateWhenDerived.bind(this);

        validates = exists([
          validateWhenStated,
          validateWhenDerived
        ], context, (context) => {
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

  validateGoal(context, continuation) {
    let goalValidates;

    const judgementString = this.getString();  ///

    context.trace(`Validating the '${judgementString}' judgement's goal...`);

    goalValidates = this.goal.validate(context, (goal, context) => {
      let validates;

      this.goal = goal;

      validates = continuation(context);

      return validates;
    });

    if (goalValidates) {
      context.debug(`...validates the'${judgementString}' judgement's goal.`);
    }

    return goalValidates;
  }

  validateFrame(context, continuation) {
    let frameValidates;

    const judgementString = this.getString();  ///

    context.trace(`Validating the '${judgementString}' judgement's frame...`);

    frameValidates = this.frame.validate(context, (frame) => {
      let validates;

      this.frame = frame;

      validates = continuation(context);

      return validates;
    });

    if (frameValidates) {
      context.debug(`...validates the'${judgementString}' judgement's frame.`);
    }

    return frameValidates;
  }

  validateWhenStated(context, continuation) {
    let validatesWhenStated = false;

    const stated = context.isStated();

    if (stated) {
      const judgementString = this.getString(); ///

      context.trace(`Validating the '${judgementString}' stated judgement...`);

      validatesWhenStated = continuation(context);

      if (validatesWhenStated) {
        context.debug(`...validated the '${judgementString}' stated judgement.`);
      }
    }

    return validatesWhenStated;
  }

  validateWhenDerived(context, continuation) {
    let validatesWhenDerived = false;

    const stated = context.isStated();

    if (!stated) {
      const judgementString = this.getString(); ///

      context.trace(`Validating the '${judgementString}' derived judgement...`);

      const schemas = context.getSchemas(),
            judgement = this; ///

      validatesWhenDerived = one(schemas, (schema, context) => {
        let passed = false;

        schema.unifyJudgement(judgement, context, (judgementUnifies) => {
          if (judgementUnifies) {
            passed = true;
          }
        });

        return passed;
      }, context, (context) => true);

      if (validatesWhenDerived) {
        validatesWhenDerived = continuation(context);
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

  static fromFact(fact, context) {
    let judgement = null;

    const statementNode = fact.getStatementNode();

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

function implicitAssumptionsFromFacts(facts, context) {
  const { ImplicitAssumption } = elements,
        implicitAssumptions = facts.map((fact) => {
          const statement = fact.getStatement(),
                implicitAssumption = ImplicitAssumption.fromStatement(statement, context);

          return implicitAssumption;
        });

  return implicitAssumptions;
}

