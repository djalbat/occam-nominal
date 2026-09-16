"use strict";

import { arrayUtilities } from "necessary";
import { NonTerminalNode } from "occam-languages";

import { TYPE_RULE_NAME } from "../ruleNames";

const { first, second } = arrayUtilities;

export default class TypeAliasNode extends NonTerminalNode {
  getAliasTypeNode() {
    const typeNodes = this.getTypeNodes(),
          firstTypeNode = first(typeNodes),
          aliasTypeNode = firstTypeNode;  ///

    return aliasTypeNode;
  }

  getTypeNode() {
    const typeNodes = this.getTypeNodes(),
          secondTypeNode = second(typeNodes),
          typeNode = secondTypeNode;  ///

    return typeNode;
  }

  getTypeNodes() {
    const ruleName = TYPE_RULE_NAME,
          typeNodes = this.getNodesByRuleName(ruleName);

    return typeNodes;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(TypeAliasNode, ruleName, childNodes, opacity, precedence); }
}
