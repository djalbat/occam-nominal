"use strict";

import NonTerminalNode from "../nonTerminalNode";

export default class PlaceholderNode extends NonTerminalNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(PlaceholderNode, ruleName, childNodes, opacity, precedence); }
}
