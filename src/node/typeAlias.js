"use strict";

import { NonTerminalNode } from "occam-languages";

import { TYPE_RULE_NAME } from "../ruleNames";

export default class TypeAliasNode extends NonTerminalNode {
  getTypeName() {
    let typeName;

    this.someTerminalNode((terminalNode) => {
      const content = terminalNode.getContent();

      typeName = content; ///

      return true;
    });

    return typeName;
  }

  getTypeNode() {
    const ruleName = TYPE_RULE_NAME,
          typeNode = this.getNodeByRuleName(ruleName);

    return typeNode;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(TypeAliasNode, ruleName, childNodes, precedence, opacity); }
}
