"use strict";

import AssertionNode from "../../node/assertion";

import { TERM_RULE_NAME, TYPE_RULE_NAME } from "../../ruleNames";

export default class TypeAssertionNode extends AssertionNode {
  getTypeName() {
    const typeNode = this.getTypeNode(),
          typeName = typeNode.getTypeName();

    return typeName;
  }

  getTermNode() {
    const ruleName = TERM_RULE_NAME,
          termNode = this.getNodeByRuleName(ruleName);

    return termNode;
  }

  getTypeNode() {
    const ruleName = TYPE_RULE_NAME,
          typeNode = this.getNodeByRuleName(ruleName);

    return typeNode;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return AssertionNode.fromRuleNameChildNodesPrecedenceAndOpacity(TypeAssertionNode, ruleName, childNodes, precedence, opacity); }
}
