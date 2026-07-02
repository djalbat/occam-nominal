"use strict";

import { NonTerminalNode } from "occam-languages";

import { METAVARIABLE_RULE_NAME } from "../ruleNames";

export default class LabelNode extends NonTerminalNode {
  getMetavariableNode() {
    const ruleName = METAVARIABLE_RULE_NAME,
          metavariableNode = this.getNodeByRuleName(ruleName);

    return metavariableNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(LabelNode, ruleName, childNodes, opacity, precedence); }
}
