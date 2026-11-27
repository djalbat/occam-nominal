"use strict";

import { NonTerminalNode } from "occam-languages";

import { TYPE_RULE_NAME, TYPE_PREFIX_RULE_NAME } from "../ruleNames";

export default class TypeAliasNode extends NonTerminalNode {
  isImplicit() {
    const typePrefixNode = this.getTypePrefixNode(),
          implicit = (typePrefixNode === null);

    return implicit;
  }

  getTypeName() {
    const typeNode = this.getTypeNode(),
          typeName = typeNode.getTypeName();

    return typeName;
  }

  getTypeNode() {
    const firstTypeNode = this.getFirstTypeNode(),
          typeNode = firstTypeNode; ///

    return typeNode;
  }

  getPrefixedTypeNode() {
    let prefixedTypeNode = null;

    const firstTypeNode = this.getFirstTypeNode(),
          lastTypeNode = this.getLastTypeNode();

    if (firstTypeNode !== lastTypeNode) {
      prefixedTypeNode = lastTypeNode;  ///
    }

    return prefixedTypeNode;
  }

  getTypePrefixNode() {
    const ruleName = TYPE_PREFIX_RULE_NAME,
          typePrefixNode = this.getNodeByRuleName(ruleName);

    return typePrefixNode;
  }

  getFirstTypeNode() {
    const ruleName = TYPE_RULE_NAME,
          firstTypeNode = this.getFirstNodeByRuleName(ruleName);

    return firstTypeNode;
  }

  getLastTypeNode() {
    const ruleName = TYPE_RULE_NAME,
          lastTypeNode = this.getLastNodeByRuleName(ruleName);

    return lastTypeNode;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(TypeAliasNode, ruleName, childNodes, precedence, opacity); }
}
