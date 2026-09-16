"use strict";

import { arrayUtilities } from "necessary";
import { NonTerminalNode } from "occam-languages";

import { TYPE_RULE_NAME } from "../ruleNames";

const { first, second } = arrayUtilities;

export default class TypeAliasNode extends NonTerminalNode {
  getAliasTypeNode() {
    let typeName;

    const typeNodes = this.getTypeNodes(),
          firstTypeNode = first(typeNodes),
          aliasTypeNode = firstTypeNode;  ///

    return aliasTypeNode;
  }

  getTypeNode() {
    const ruleName = TYPE_RULE_NAME,
          typeNode = this.getNodeByRuleName(ruleName);

    return typeNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(TypeAliasNode, ruleName, childNodes, opacity, precedence); }
}
