"use strict";

import { NonTerminalNode } from "occam-languages";

import { PARENTHESISED_LABEL_RULE_NAME, PARENTHESISED_LABELS_RULE_NAME } from "../ruleNames";

export default class HeaderNode extends NonTerminalNode {
  getLabelNodes() {
    let labelNodes = [];

    const parenthesisedLabelsNode = this.getParenthesisedLabelsNode();

    if (parenthesisedLabelsNode !== null) {
      labelNodes = parenthesisedLabelsNode.getLabelNodes();
    }

    return labelNodes;
  }

  getLabelNode() {
    let labelNode = [];

    const parenthesisedLabelNode = this.getParenthesisedLabelNode();

    if (parenthesisedLabelNode !== null) {
      labelNode = parenthesisedLabelNode.getLabelNode();
    }

    return labelNode;
  }

  getSignatureNode() {
    const signatureNode = null;

    return signatureNode;
  }

  getParenthesisedLabelNode() {
    const ruleName = PARENTHESISED_LABEL_RULE_NAME,
          parenthesisedLabelsNode = this.getNodeByRuleName(ruleName);

    return parenthesisedLabelsNode;
  }

  getParenthesisedLabelsNode() {
    const ruleName = PARENTHESISED_LABELS_RULE_NAME,
          parenthesisedLabelsNode = this.getNodeByRuleName(ruleName);

    return parenthesisedLabelsNode;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(Class, ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(Class, ruleName, childNodes, precedence, opacity); }
}
