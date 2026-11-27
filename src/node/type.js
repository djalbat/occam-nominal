"use strict";

import { NonTerminalNode } from "occam-languages";

import { BASE_TYPE_SYMBOL } from "../constants";
import { TYPE_TOKEN_TYPE, PRIMITIVE_TOKEN_TYPE } from "../tokenTypes";

export default class TypeNode extends NonTerminalNode {
  getString() {
    let string;

    const baseType = this.isBaseType();

    if (baseType) {
      string = `${BASE_TYPE_SYMBOL}`;
    } else {
      const typeName = this.getTypeName();

      string = `${typeName}`;
    }

    return string;
  }

  isBaseType() {
    const tokenType = PRIMITIVE_TOKEN_TYPE,
          baseType = this.someTerminalNode((terminalNode) => {
            return true;
          }, tokenType);

    return baseType;
  }

  getTypeName() {
    let typeName;

    const tokenType = TYPE_TOKEN_TYPE;

    this.someTerminalNode((terminalNode) => {
      const content = terminalNode.getContent();

      typeName = content; ///

      return true;
    }, tokenType);

    return typeName;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(TypeNode, ruleName, childNodes, precedence, opacity); }
}
