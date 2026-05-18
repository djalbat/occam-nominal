"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { instantiateJudgement } from "../process/instantiate";
import { reconcile, instantiate,} from "../utilities/context";
import { judgementFromStatementNode } from "../utilities/element";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";

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

  getAssumptions() {
    let assumptions;

    const implicit = this.isImplicit();

    if (implicit) {
      assumptions = [ ///
        this.assumption
      ];
    } else {
      const frameAssumptions = this.getFrameAssumptions();

      assumptions = frameAssumptions; ///
    }

    return assumptions;
  }

  isImplicit() { return this.frame.isImplicit(); }

  getStatement() { return this.assumption.getStatement(); }

  getMetavariable() { return this.frame.getMetavariable(); }

  getMetavariableNode() { return this.frame.getMetavariableNode(); }

  getFrameAssumptions() {
    const frameAssumptions = this.frame.getAssumptions();

    return frameAssumptions;
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

    const validatedImplicitly = this.validateImplicitly(context);

    if (validatedImplicitly) {
      reconcile((context) => {
        const assumptions = this.getAssumptions(),
              topLevelMetaAssertion = this.getTopLevelMetaAssertion(),
              metaLevelAssumptions = topLevelMetaAssertion.getMetaLevelAssumptions(),
              metaLevelAssumptionsUnify = metaLevelAssumptions.every((metaLevelAssumption) => {
                const assumptionUnifies = assumptions.some((assumption) => {
                  const assumptionUnifies = metaLevelAssumption.unifyAssumption(assumption, context);

                  if (assumptionUnifies) {
                    return true;
                  }
                });

                if (assumptionUnifies) {
                  return true;
                }
              });

        if (metaLevelAssumptionsUnify) {
          validatesWhenDerived = true;
        }
      }, context);
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

// unifyTopLevelMetaAssertion(topLevelMetaAssertion, context) {
//   let topLevelMetaAssertionUnifies = false;
//
//   const assumptionString = this.getString(),  ///
//     topLevelMetaAssertionString = topLevelMetaAssertion.getString();
//
//   context.trace(`Unifying the '${topLevelMetaAssertionString}' top level meta-assertion with the '${assumptionString}' assumption...`);
//
//   reconcile((context) => {
//     topLevelMetaAssertionUnifies = this.reference.unifyTopLevelMetaAssertion(topLevelMetaAssertion, context);
//
//     if (topLevelMetaAssertionUnifies) {
//       const subproofAssertion = this.findSubproofAssertion(context);
//
//       if (subproofAssertion !== null) {
//         topLevelMetaAssertionUnifies = subproofAssertion.unifyTopLevelMetaAssertion(topLevelMetaAssertion, context);
//       } else {
//         const unconditional = topLevelMetaAssertion.isUnconditional();
//
//         if (unconditional) {
//           const deduction = topLevelMetaAssertion.getDeduction(),
//             deductionUnifies = this.unifyDeduction(deduction, context);
//
//           if (deductionUnifies) {
//             topLevelMetaAssertionUnifies = true;
//           }
//         }
//       }
//     }
//   }, context);
//
//   if (topLevelMetaAssertionUnifies) {
//     context.trace(`...unified the '${topLevelMetaAssertionString}' top level meta-assertion with the '${assumptionString}' assumption...`);
//   }
//
//   return topLevelMetaAssertionUnifies;
// }
//
// unifyTopLevelMetaAssertions(reference, context) {
//   let topLevelMetaAssertionsUnify;
//
//   const topLevelMetaAssertions = context.findTopLevelMetaAssertionsByReference(reference);
//
//   topLevelMetaAssertionsUnify = topLevelMetaAssertions.some((topLevelMetaAssertion) => {
//     const topLevelMetaAssertionUnifies = this.unifyTopLevelMetaAssertion(topLevelMetaAssertion, context);
//
//     if (topLevelMetaAssertionUnifies) {
//       return true;
//     }
//   });
//
//   return topLevelMetaAssertionsUnify;
// }
// unifyDeduction(deduction, context) {
//   let deductionUnifies = false;
//
//   const deductionString = deduction.getString(),
//         assumptionString = this.getString();  ///
//
//   context.trace(`Unifying the '${deductionString}' deduction with the '${assumptionString}' assumption's statement...`);
//
//   const deductionContext = deduction.getContext(),
//     generalContext = context, ///
//     specificContext = deductionContext; ///
//
//   join((specificContext) => {
//     const statement = deduction.getStatement(),
//       statementUnifies = this.unifyStatement(statement, generalContext, specificContext);
//
//     if (statementUnifies) {
//       deductionUnifies = true;
//     }
//   }, specificContext, context);
//
//   if (deductionUnifies) {
//     context.debug(`...unified the '${deductionString}' deduction with the '${assumptionString}' assumption's statement.`);
//   }
//
//   return deductionUnifies;
// }
