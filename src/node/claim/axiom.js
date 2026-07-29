"use strict";

import ClaimNode from "../../node/claim";

import { AXIOM_BODY_RULE_NAME, AXIOM_HEADER_RULE_NAME } from "../../ruleNames";

export default class AxiomNode extends ClaimNode {
  static bodyRuleName = AXIOM_BODY_RULE_NAME;

  static headerRuleName = AXIOM_HEADER_RULE_NAME;

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return ClaimNode.fromRuleNameChildNodesOpacityAndPrecedence(AxiomNode, ruleName, childNodes, opacity, precedence); }
}
