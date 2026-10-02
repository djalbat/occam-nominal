"use strict";

import ClaimNode from "../../node/claim";

import { THEOREM_BODY_RULE_NAME, THEOREM_HEADER_RULE_NAME } from "../../ruleNames";

export default class TheoremNode extends ClaimNode {
  static bodyRuleName = THEOREM_BODY_RULE_NAME;

  static headerRuleName = THEOREM_HEADER_RULE_NAME;

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return ClaimNode.fromRuleNameChildNodesPrecedenceAndOpacity(TheoremNode, ruleName, childNodes, precedence, opacity); }
}
