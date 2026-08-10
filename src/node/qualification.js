"use strict";

import { NonTerminalNode } from "occam-languages";

import { REFERENCE_RULE_NAME, SCHEMA_ASSERTION_RULE_NAME, SIGNATURE_ASSERTION_RULE_NAME } from "../ruleNames";

export default class QualificationNode extends NonTerminalNode {
  getReferenceNode() {
    const ruleName = REFERENCE_RULE_NAME,
          referenceNode = this.getNodeByRuleName(ruleName);

    return referenceNode;
  }

  getSchemaAssertionNode() {
    const ruleName = SCHEMA_ASSERTION_RULE_NAME,
          signatureAssertionNode = this.getNodeByRuleName(ruleName);

    return signatureAssertionNode;
  }

  getSignatureAssertionNode() {
    const ruleName = SIGNATURE_ASSERTION_RULE_NAME,
          signatureAssertionNode = this.getNodeByRuleName(ruleName);

    return signatureAssertionNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(QualificationNode, ruleName, childNodes, opacity, precedence); }
}
