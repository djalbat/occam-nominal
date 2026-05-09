"use strict";

import DeclarationNode from "../../node/declaration";

import { TYPE_PREFIX_RULE_NAME } from "../../ruleNames";

export default class TypePrefixDeclarationNode extends DeclarationNode {
  getTypePrefix() {
    const typePrefixNode = this.getTypePrefixNode(),
          typePrefixName = typePrefixNode.getTypePrefixName();

    return typePrefixName;
  }

  getTypePrefixNode() {
    const ruleName = TYPE_PREFIX_RULE_NAME,
          typePrefixNode = this.getNodeByRuleName(ruleName);

    return typePrefixNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return DeclarationNode.fromRuleNameChildNodesOpacityAndPrecedence(TypePrefixDeclarationNode, ruleName, childNodes, opacity, precedence); }
}

