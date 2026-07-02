"use strict";

import { NonTerminalNode } from "occam-languages";

import { LABELS_RULE_NAME } from "../ruleNames";

export default class ParenthesisedLabelsNode extends NonTerminalNode {
  getLabelNodes() {
    const labelsNode = this.getLabelsNode(),
          labelNodes = labelsNode.getLabelNodes();

    return labelNodes;
  }

  getLabelsNode() {
    const ruleName = LABELS_RULE_NAME,
          labelsNode = this.getNodeByRuleName(ruleName);

    return labelsNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(ParenthesisedLabelsNode, ruleName, childNodes, opacity, precedence); }
}
