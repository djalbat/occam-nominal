"use strict";

import { NonTerminalNode } from "occam-languages";

export default class TypePrefixNode extends NonTerminalNode {
  getTypePrefixName() {
    let typePrefixName;

    this.someTerminalNode((terminalNode) => {
      const content = terminalNode.getContent();

      typePrefixName = content; ///

      return true;
    });

    return typePrefixName;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(TypePrefixNode, ruleName, childNodes, opacity, precedence); }
}
