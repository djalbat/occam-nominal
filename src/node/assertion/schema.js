"use strict";

import AssertionNode from "../../node/assertion";

import { FRAME_RULE_NAME, METAVARIABLE_RULE_NAME } from "../../ruleNames";

export default class SchemaAssertionNode extends AssertionNode {
  getFrameNode() {
    const ruleName = FRAME_RULE_NAME,
          frameNode = this.getNodeByRuleName(ruleName);

    return frameNode;
  }

  getMetavariableNode() {
    const ruleName = METAVARIABLE_RULE_NAME,
          metavariableNode = this.getNodeByRuleName(ruleName);

    return metavariableNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return AssertionNode.fromRuleNameChildNodesOpacityAndPrecedence(SchemaAssertionNode, ruleName, childNodes, opacity, precedence); }
}
