"use strict";

import NonTerminalNode from "../nonTerminalNode";

export default class EquivalencesNode extends NonTerminalNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(EquivalencesNode, ruleName, childNodes, opacity, precedence); }
}
