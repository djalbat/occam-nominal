"use strict";

import ClaimNode from "../../node/claim";

import { LEMMA_BODY_RULE_NAME, LEMMA_HEADER_RULE_NAME } from "../../ruleNames";

export default class LemmaNode extends ClaimNode {
  static bodyRuleName = LEMMA_BODY_RULE_NAME;

  static headerRuleName = LEMMA_HEADER_RULE_NAME;

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return ClaimNode.fromRuleNameChildNodesPrecedenceAndOpacity(LemmaNode, ruleName, childNodes, precedence, opacity); }
}
