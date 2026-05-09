"use strict";

import { NonTerminalNode } from "occam-languages";

import { FRAME_RULE_NAME, ASSUMPTION_RULE_NAME } from "../ruleNames";

export default class JudgementNode extends NonTerminalNode {
  isSingular() {
    const frameNode = this.getFrameNode(),
          singular = frameNode.isSingular();

    return singular;
  }

  getFrameNode() {
    const ruleName = FRAME_RULE_NAME,
          frameNode = this.getNodeByRuleName(ruleName);

    return frameNode;
  }

  getAssumptionNode() {
    const ruleName = ASSUMPTION_RULE_NAME,
          assumptionNodes = this.getNodeByRuleName(ruleName);

    return assumptionNodes;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(JudgementNode, ruleName, childNodes, opacity, precedence); }
}
