"use strict";

import DeclarationNode from "../../node/declaration";

import { TYPE_ALIAS_RULE_NAME } from "../../ruleNames";

export default class TypeAliasDeclarationNode extends DeclarationNode {
  getTypeAliasNode() {
    const ruleName = TYPE_ALIAS_RULE_NAME,
          typeAliasNode = this.getNodeByRuleName(ruleName);

    return typeAliasNode;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return DeclarationNode.fromRuleNameChildNodesPrecedenceAndOpacity(TypeAliasDeclarationNode, ruleName, childNodes, precedence, opacity); }
}

