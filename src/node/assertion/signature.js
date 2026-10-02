"use strict";

import AssertionNode from "../../node/assertion";

import { LINK_RULE_NAME, TERM_RULE_NAME } from "../../ruleNames";

export default class SignatureAssertionNode extends AssertionNode {
  getLinkNode() {
    const ruleName = LINK_RULE_NAME,
          linkNode = this.getNodeByRuleName(ruleName);

    return linkNode;
  }

  getTermNodes() {
    const ruleName = TERM_RULE_NAME,
          termNodes = this.getNodesByRuleName(ruleName);

    return termNodes;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return AssertionNode.fromRuleNameChildNodesPrecedenceAndOpacity(SignatureAssertionNode, ruleName, childNodes, precedence, opacity); }
}
