"use strict";

import { NonTerminalNode } from "occam-languages";

import { LABEL_RULE_NAME } from "../ruleNames";

export default class LabelsNode extends NonTerminalNode {
  getLabelNodes() {
    const ruleName = LABEL_RULE_NAME,
          labelNodes = this.getNodesByRuleName(ruleName);

    return labelNodes;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(LabelsNode, ruleName, childNodes, precedence, opacity); }
}
