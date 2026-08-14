"use strict";

import AssertionNode from "../../node/assertion";

import { TERM_RULE_NAME, METAVARIABLE_RULE_NAME } from "../../ruleNames";

export default class SignatureAssertionNode extends AssertionNode {
  getTermNodes() {
    const ruleName = TERM_RULE_NAME,
          termNodes = this.getNodesByRuleName(ruleName);

    return termNodes;
  }

  getMetavariableNode() {
    const ruleName = METAVARIABLE_RULE_NAME,
          metavariableNode = this.getNodeByRuleName(ruleName);

    return metavariableNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return AssertionNode.fromRuleNameChildNodesOpacityAndPrecedence(SignatureAssertionNode, ruleName, childNodes, opacity, precedence); }
}
