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

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(ParenthesisedLabelsNode, ruleName, childNodes, precedence, opacity); }
}
