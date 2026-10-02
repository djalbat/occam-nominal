"use strict";

import { NonTerminalNode } from "occam-languages";

import { METAVARIABLE_RULE_NAME } from "../ruleNames";

export default class ReferenceNode extends NonTerminalNode {
  getMetavariableNode() {
    const ruleName = METAVARIABLE_RULE_NAME,
          metavariableNode = this.getNodeByRuleName(ruleName);

    return metavariableNode;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(ReferenceNode, ruleName, childNodes, precedence, opacity); }
}
