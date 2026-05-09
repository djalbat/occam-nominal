"use strict";

import { NonTerminalNode } from "occam-languages";

import { STEP_RULE_NAME, SUBPROOF_RULE_NAME } from "../ruleNames";

export default class SubDerivationNode extends NonTerminalNode {
  getStepOrSubproofNodes() {
    const ruleNames = [
            STEP_RULE_NAME,
            SUBPROOF_RULE_NAME,
          ],
          stepOrSubproofNodes = this.getNodesByRuleName(...ruleNames);

    return stepOrSubproofNodes;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(SubDerivationNode, ruleName, childNodes, opacity, precedence); }
}
