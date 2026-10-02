"use strict";

import ClaimNode from "../../node/claim";

import { AXIOM_BODY_RULE_NAME, AXIOM_HEADER_RULE_NAME } from "../../ruleNames";

export default class AxiomNode extends ClaimNode {
  static bodyRuleName = AXIOM_BODY_RULE_NAME;

  static headerRuleName = AXIOM_HEADER_RULE_NAME;

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return ClaimNode.fromRuleNameChildNodesPrecedenceAndOpacity(AxiomNode, ruleName, childNodes, precedence, opacity); }
}
