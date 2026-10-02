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

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return DeclarationNode.fromRuleNameChildNodesPrecedenceAndOpacity(TypePrefixDeclarationNode, ruleName, childNodes, precedence, opacity); }
}

