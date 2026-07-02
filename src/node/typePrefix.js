"use strict";

import { NonTerminalNode } from "occam-languages";

export default class TypePrefixNode extends NonTerminalNode {
  getTypePrefixName() {
    let typePrefixName;

    this.someChildNode((childNode) => {
      const childNodeTerminalNode = childNode.isTerminalNode();

      if (childNodeTerminalNode) {
        const terminalNode = childNode, ///
              content = terminalNode.getContent();

        typePrefixName = content; ///

        return true;
      }
    });

    return typePrefixName;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(TypePrefixNode, ruleName, childNodes, opacity, precedence); }
}
