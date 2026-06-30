"use strict";

import NonTerminalNode from "../nonTerminalNode";

import { METAVARIABLE_RULE_NAME } from "../ruleNames";

export default class ReferenceNode extends NonTerminalNode {
  getMetavariableNode() {
    const ruleName = METAVARIABLE_RULE_NAME,
          metavariableNode = this.getNodeByRuleName(ruleName);

    return metavariableNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(ReferenceNode, ruleName, childNodes, opacity, precedence); }
}
