"use strict";

import TopLevelAssertionNode from "../../node/topLevelAssertion";

import { CONJECTURE_BODY_RULE_NAME, CONJECTURE_HEADER_RULE_NAME } from "../../ruleNames";

export default class ConjectureNode extends TopLevelAssertionNode {
  static bodyRuleName = CONJECTURE_BODY_RULE_NAME;

  static headerRuleName = CONJECTURE_HEADER_RULE_NAME;

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return TopLevelAssertionNode.fromRuleNameChildNodesOpacityAndPrecedence(ConjectureNode, ruleName, childNodes, opacity, precedence); }
}
