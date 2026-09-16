"use strict";

import { NonTerminalNode } from "occam-languages";

import { TYPE_TOKEN_TYPE } from "../tokenTypes";

export default class TypeNode extends NonTerminalNode {
  isPrefixed() {
    const multiplicity = this.getMultiplicity(),
          prefixed = (multiplicity > 1);

    return prefixed;
  }

  getTypeName() {
    let typeName;

    const prefixed = this.isPrefixed(),
          tokenType = TYPE_TOKEN_TYPE,
          typeNameIndex = prefixed ? 1 : 0;

    this.someTerminalNode((terminalNode, index) => {
      if (index === typeNameIndex) {
        const content = terminalNode.getContent();

        typeName = content; ///

        return true;
      }
    }, tokenType);

    return typeName;
  }

  getTypePrefixName() {
    let typePrefixName = null;

    const prefixed = this.isPrefixed();

    if (prefixed) {
      const tokenType = TYPE_TOKEN_TYPE;

      this.someTerminalNode((terminalNode) => {
        const content = terminalNode.getContent();

        typePrefixName = content; ///

        return true;
      }, tokenType);
    }

    return typePrefixName;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(TypeNode, ruleName, childNodes, opacity, precedence); }
}
