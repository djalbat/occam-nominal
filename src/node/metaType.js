"use strict";

import { NonTerminalNode } from "occam-languages";

export default class MetaTypeNode extends NonTerminalNode {
  getMetaTypeName() {
    let metaTypeName;

    this.someTerminalNode((terminalNode) => {
      const content = terminalNode.getContent();

      metaTypeName = content; ///

      return true;
    });

    return metaTypeName;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(MetaTypeNode, ruleName, childNodes, precedence, opacity); }
}
