"use strict";

import HeaderNode from "../../node/header";

export default class ConjectureHeaderNode extends HeaderNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return HeaderNode.fromRuleNameChildNodesOpacityAndPrecedence(ConjectureHeaderNode, ruleName, childNodes, opacity, precedence); }
}
