"use strict";

import ClaimNode from "../../node/claim";

import { CONJECTURE_BODY_RULE_NAME, CONJECTURE_HEADER_RULE_NAME } from "../../ruleNames";

export default class ConjectureNode extends ClaimNode {
  static bodyRuleName = CONJECTURE_BODY_RULE_NAME;

  static headerRuleName = CONJECTURE_HEADER_RULE_NAME;

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return ClaimNode.fromRuleNameChildNodesOpacityAndPrecedence(ConjectureNode, ruleName, childNodes, opacity, precedence); }
}
