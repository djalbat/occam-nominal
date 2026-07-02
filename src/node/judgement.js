"use strict";

import { NonTerminalNode } from "occam-languages";

import { GOAL_RULE_NAME, FRAME_RULE_NAME } from "../ruleNames";

export default class JudgementNode extends NonTerminalNode {
  isSingular() {
    const frameNode = this.getFrameNode(),
          singular = frameNode.isSingular();

    return singular;
  }

  getGoalNode() {
    const ruleName = GOAL_RULE_NAME,
          goalNode = this.getNodeByRuleName(ruleName);

    return goalNode;
  }

  getFrameNode() {
    const ruleName = FRAME_RULE_NAME,
          frameNode = this.getNodeByRuleName(ruleName);

    return frameNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(JudgementNode, ruleName, childNodes, opacity, precedence); }
}
