"use strict";

import HeaderNode from "../../node/header";

import { SIGNATURE_RULE_NAME } from "../../ruleNames";

export default class AxiomHeaderNode extends HeaderNode {
  getSignatureNode() {
    const ruleName = SIGNATURE_RULE_NAME,
          signatureNode = this.getNodeByRuleName(ruleName);

    return signatureNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return HeaderNode.fromRuleNameChildNodesOpacityAndPrecedence(AxiomHeaderNode, ruleName, childNodes, opacity, precedence); }
}
