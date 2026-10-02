"use strict";

import { NonTerminalNode } from "occam-languages";

import { STEP_RULE_NAME, SUBPROOF_RULE_NAME } from "../ruleNames";

export default class DerivationNode extends NonTerminalNode {
  getStepOrSubproofNodes() {
    const ruleNames = [
            STEP_RULE_NAME,
            SUBPROOF_RULE_NAME,
          ],
          stepOrSubproofNodes = this.getNodesByRuleName(...ruleNames);

    return stepOrSubproofNodes;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(DerivationNode, ruleName, childNodes, precedence, opacity); }
}
