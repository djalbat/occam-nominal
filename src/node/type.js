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
      const prefixed = this.isPrefixed(),
            typeName = this.getTypeName();

      if (prefixed) {
        const typePrefixName = this.getTypePrefixName();

        string = `${typePrefixName}${typeName}`;
      } else {
        string = `${typeName}`;
      }
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
