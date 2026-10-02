"use strict";

import { NonTerminalNode } from "occam-languages";

import { TYPE_RULE_NAME } from "../ruleNames";

export default class TypesNode extends NonTerminalNode {
  getTypeNodes() {
    const ruleName = TYPE_RULE_NAME,
          typeNodes = this.getNodesByRuleName(ruleName);

    return typeNodes;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(TypesNode, ruleName, childNodes, precedence, opacity); }
}
