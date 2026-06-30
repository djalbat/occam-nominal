"use strict";

import NonTerminalNode from "../nonTerminalNode";

export default class ProcedureReferenceNode extends NonTerminalNode {
  getName() {
    let name;

    this.someChildNode((childNode) => {
      const childNodeTerminalNode = childNode.isTerminalNode();

      if (childNodeTerminalNode) {
        const terminalNode = childNode, ///
              content = terminalNode.getContent();

        name = content; ///

        return true;
      }
    });

    return name;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(ProcedureReferenceNode, ruleName, childNodes, opacity, precedence); }
}
