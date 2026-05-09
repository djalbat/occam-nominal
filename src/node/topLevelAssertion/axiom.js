"use strict";

import TopLevelAssertionNode from "../../node/topLevelAssertion";

import { AXIOM_BODY_RULE_NAME, AXIOM_HEADER_RULE_NAME } from "../../ruleNames";

export default class AxiomNode extends TopLevelAssertionNode {
  static bodyRuleName = AXIOM_BODY_RULE_NAME;

  static headerRuleName = AXIOM_HEADER_RULE_NAME;

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return TopLevelAssertionNode.fromRuleNameChildNodesOpacityAndPrecedence(AxiomNode, ruleName, childNodes, opacity, precedence); }
}
