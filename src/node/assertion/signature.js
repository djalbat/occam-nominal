"use strict";

import AssertionNode from "../../node/assertion";

import { SIGNATURE_RULE_NAME, METAVARIABLE_RULE_NAME } from "../../ruleNames";

export default class SignatureAssertionNode extends AssertionNode {
  getSignatureNode() {
    const ruleName = SIGNATURE_RULE_NAME,
          signatureNode = this.getNodeByRuleName(ruleName);

    return signatureNode;
  }

  getMetavariableNode() {
    const ruleName = METAVARIABLE_RULE_NAME,
          metavariableNode = this.getNodeByRuleName(ruleName);

    return metavariableNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return AssertionNode.fromRuleNameChildNodesOpacityAndPrecedence(SignatureAssertionNode, ruleName, childNodes, opacity, precedence); }
}
