"use strict";

import { NonTerminalNode } from "occam-languages";

import { TYPE_RULE_NAME } from "../ruleNames";

export default class TypesNode extends NonTerminalNode {
  getTypeNodes() {
    const ruleName = TYPE_RULE_NAME,
          typeNodes = this.getNodesByRuleName(ruleName);

    return typeNodes;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(TypesNode, ruleName, childNodes, opacity, precedence); }
}
