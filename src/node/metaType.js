"use strict";

import { NonTerminalNode } from "occam-languages";

export default class MetaTypeNode extends NonTerminalNode {
  getMetaTypeName() {
    let metaTypeName;

    this.someChildNode((childNode) => {
      const childNodeTerminalNode = childNode.isTerminalNode();

      if (childNodeTerminalNode) {
        const terminalNode = childNode, ///
              content = terminalNode.getContent();

        metaTypeName = content; ///

        return true;
      }
    });

    return metaTypeName;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(MetaTypeNode, ruleName, childNodes, opacity, precedence); }
}
