"use strict";

import { Element } from "occam-languages";
import { arrayUtilities } from "necessary";

import elements from "../elements";

import { define } from "../elements";
import { instantiate,} from "../utilities/context";
import { instantiateJudgement } from "../process/instantiate";
import { judgementFromStatementNode } from "../utilities/element";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";

const { one, push } = arrayUtilities;

export default define(class Judgement extends Element {
  constructor(context, string, node, breakPoint, frame, assumption) {
    super(context, string, node, breakPoint);

    this.frame = frame;
    this.assumption = assumption;
  }

  getFrame() {
    return this.frame;
  }

  getAssumption() {
    return this.assumption;
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

  getReference() { return this.assumption.getReference(); }

  getStatement() { return this.assumption.getStatement(); }

  getMetavariable() { return this.frame.getMetavariable(); }

  getMetavariableNode() { return this.frame.getMetavariableNode(); }

  getAssumptions(context) {
    const assumptions = [],
          metavariable = this.getMetavariable(),
          frameAssumptions = this.frame.getAssumptions();

    push(assumptions, frameAssumptions);

    if (metavariable !== null) {
      const proofAssertions = context.getProofAssertions(),
            ephemeralAssumptions = ephemeralAssumptionsFromProofAssertions(proofAssertions, context);

      push(assumptions, ephemeralAssumptions);
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

  compareMetavariableName(metavariableName) { return this.frame.compareMetavariableName(metavariableName); }

  findSubproofAssertion(context) { return this.assumption.findSubproofAssertion(context); }

  findValidJudgement(context) {
    const judgementNode = this.getJudgementNode(),
          judgement = context.findJudgementByJudgementNode(judgementNode),
          validJudgemenet = judgement;  ///

    return validJudgemenet;
  }

  validate(context) {
    let judgement = null;

    const judgementString = this.getString();  ///

    context.trace(`Validating the '${judgementString}' judgement...`);

    let validates = false;

    const validJudgement = this.findValidJudgement(context);

    if (validJudgement !== null) {
      validates = true;

      judgement = validJudgement; ///

      context.debug(`...the '${judgementString}' judgement is already valid.`);
    } else {
      const frameValidates = this.validateFrame(context);

      if (frameValidates) {
        const assumptionValidates = this.validateAssumption(context);

        if (assumptionValidates) {
          const stated = context.isStated();

          let validatesWhenStated = false,
              validatesWhenDerived = false;

          if (stated) {
            validatesWhenStated = this.validateWhenStated(context);
          } else {
            validatesWhenDerived = this.validateWhenDerived(context);
          }

          if (validatesWhenStated || validatesWhenDerived) {
            validates = true;
          }
        }
      }

      if (validates) {
        judgement = this; ///

        context.addJudgement(judgement);
      }
    }

    if (validates) {
      context.debug(`...validated the '${judgementString}' judgement.`);
    }

    return judgement;
  }

  validateFrame(context) {
    let frameValidates = false;

    const judgementString = this.getString(); ///

    context.trace(`Validating the '${judgementString}' judgement's frame...`);

    const frame = this.frame.validate(context);

    if (frame !== null) {
      this.frame = frame;

      frameValidates = true;
    }

    if (frameValidates) {
      context.trace(`...validated the '${judgementString}' judgement's frame.`);
    }

    return frameValidates;
  }

  validateAssumption(context) {
    let assumptionValidates = false;

    const judgementString = this.getString(); ///

    context.trace(`Validating the '${judgementString}' judgement's assumption...`);

    const assumption = this.assumption.validate(context);

    if (assumption !== null) {
      this.assumption = assumption;

      assumptionValidates = true;
    }

    if (assumptionValidates) {
      context.debug(`...validated the '${judgementString}' judgement's assumption.`);
    }

    return assumptionValidates;
  }

  validateWhenStated(context) {
    let validatesWhenStated;

    const judgementString = this.getString();  ///

    context.trace(`Validating the '${judgementString}' stated judgement...`);

    validatesWhenStated = true;

    if (validatesWhenStated) {
      context.debug(`...validated the '${judgementString}' stated judgement.`);
    }

    return validatesWhenStated;
  }

  validateWhenDerived(context) {
    let validatesWhenDerived = false;

    const judgementString = this.getString();  ///

    context.trace(`Validating the '${judgementString}' derived judgement...`);

    const judgement = this, ///
          topLevelMetaAssertions = context.getTopLevelMetaAssertions(),
          judgementUnifies = one(topLevelMetaAssertions, (topLevelMetaAssertion) => {
            const judgementUnifies = topLevelMetaAssertion.unifyJudgement(judgement, context);

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
            assumption = assumptionFromJudgementNode(judgementNode, context);

      context = null;

      const judgement = new Judgement(context, string, node, breakPoint, frame, assumption);

      return judgement;
    }, context);
  }

  static fromStatement(statement, context) {
    const statementNode = statement.getNode(),
          judgement = judgementFromStatementNode(statementNode, context);

    return judgement;
  }
});

function frameFromJudgementNode(judgementNode, context) {
  const frameNode = judgementNode.getFrameNode(),
        frame = context.findFrameByFrameNode(frameNode);

  return frame;
}

function assumptionFromJudgementNode(judgementNode, context) {
  const assumptionNode = judgementNode.getAssumptionNode(),
        assumption = context.findAssumptionByAssumptionNode(assumptionNode);

  return assumption;
}

function ephemeralAssumptionsFromProofAssertions(proofAssertions, context) {
  const ephemeralAssumptions = proofAssertions.map((proofAssertion) => {
    const { Assumption } = elements,
          statement = proofAssertion.getStatement(),
          assumption = Assumption.fromStatement(statement, context),
          ephemeralAssumption = assumption; ///

    return ephemeralAssumption;
  });

  return ephemeralAssumptions;
}

