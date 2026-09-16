"use strict";

import { arrayUtilities } from "necessary";

import DeclarationNode from "../../node/declaration";

import { TYPE_RULE_NAME } from "../../ruleNames";

const { first, last } = arrayUtilities;

export default class TypeAliasDeclarationNode extends DeclarationNode {
  getTypeNode() {
    const typeNodes = this.getTypeNodes(),
          lastTypeNode = last(typeNodes),
          typeNode = lastTypeNode;  ///

    return typeNode;
  }

  getAliasTypeNode() {
    let aliasTypeNode = null;

    const typeNodes = this.getTypeNodes(),
          typeNodesLength = typeNodes.length;

    if (typeNodesLength === 2) {
      const firstTypeNode = first(typeNodes);

      aliasTypeNode = firstTypeNode;  ///
    }

    return aliasTypeNode;
  }

  getTypeNodes() {
    const ruleName = TYPE_RULE_NAME,
          typeNodes = this.getNodesByRuleName(ruleName);

    return typeNodes;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return DeclarationNode.fromRuleNameChildNodesOpacityAndPrecedence(TypeAliasDeclarationNode, ruleName, childNodes, opacity, precedence); }
}

