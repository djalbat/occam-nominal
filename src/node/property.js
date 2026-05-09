"use strict";

import { NonTerminalNode } from "occam-languages";

import { SINGLE_SPACE } from "../constants";

export default class PropertyNode extends NonTerminalNode {
  getNames() {
    const names = this.mapChildNode((childNode) => {
      const terminalNode = childNode, ///
            content = terminalNode.getContent(),
            identifier = content; //

      return identifier;
    });

    return names;
  }

  getPropertyName() {
    const names = this.getNames(),
          propertyName = names.join(SINGLE_SPACE);

    return propertyName;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(PropertyNode, ruleName, childNodes, opacity, precedence); }
}
