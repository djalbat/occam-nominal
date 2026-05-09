"use strict";

import { NonTerminalNode } from "occam-languages";

export default class EquivalencesNode extends NonTerminalNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(EquivalencesNode, ruleName, childNodes, opacity, precedence); }
}
