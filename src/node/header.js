"use strict";

import NonTerminalNode from "../nonTerminalNode";

import { SIGNATURE_RULE_NAME, PARENTHESISED_LABEL_RULE_NAME, PARENTHESISED_LABELS_RULE_NAME } from "../ruleNames";

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
    const ruleName = SIGNATURE_RULE_NAME,
          signatureNode = this.getNodeByRuleName(ruleName);

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

  static fromRuleNameChildNodesOpacityAndPrecedence(Class, ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(Class, ruleName, childNodes, opacity, precedence); }
}
