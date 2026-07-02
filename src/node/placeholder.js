"use strict";

import { NonTerminalNode } from "occam-languages";

export default class PlaceholderNode extends NonTerminalNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(PlaceholderNode, ruleName, childNodes, opacity, precedence); }
}
