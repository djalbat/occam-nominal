"use strict";

import TopLevelAssertionNode from "../../node/topLevelAssertion";

import { LEMMA_BODY_RULE_NAME, LEMMA_HEADER_RULE_NAME } from "../../ruleNames";

export default class LemmaNode extends TopLevelAssertionNode {
  static bodyRuleName = LEMMA_BODY_RULE_NAME;

  static headerRuleName = LEMMA_HEADER_RULE_NAME;

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return TopLevelAssertionNode.fromRuleNameChildNodesOpacityAndPrecedence(LemmaNode, ruleName, childNodes, opacity, precedence); }
}
