"use strict";

import HeaderNode from "../../node/header";

import { SIGNATURE_RULE_NAME } from "../../ruleNames";

export default class AxiomHeaderNode extends HeaderNode {
  getSignatureNode() {
    const ruleName = SIGNATURE_RULE_NAME,
          signatureNode = this.getNodeByRuleName(ruleName);

    return signatureNode;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return HeaderNode.fromRuleNameChildNodesPrecedenceAndOpacity(AxiomHeaderNode, ruleName, childNodes, precedence, opacity); }
}
