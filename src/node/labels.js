"use strict";

import { NonTerminalNode } from "occam-languages";

import { LABEL_RULE_NAME } from "../ruleNames";

export default class LabelsNode extends NonTerminalNode {
  getLabelNodes() {
    const ruleName = LABEL_RULE_NAME,
          labelNodes = this.getNodesByRuleName(ruleName);

    return labelNodes;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(LabelsNode, ruleName, childNodes, opacity, precedence); }
}
