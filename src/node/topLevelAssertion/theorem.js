"use strict";

import TopLevelAssertionNode from "../../node/topLevelAssertion";

import { THEOREM_BODY_RULE_NAME, THEOREM_HEADER_RULE_NAME } from "../../ruleNames";

export default class TheoremNode extends TopLevelAssertionNode {
  static bodyRuleName = THEOREM_BODY_RULE_NAME;

  static headerRuleName = THEOREM_HEADER_RULE_NAME;

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return TopLevelAssertionNode.fromRuleNameChildNodesOpacityAndPrecedence(TheoremNode, ruleName, childNodes, opacity, precedence); }
}
