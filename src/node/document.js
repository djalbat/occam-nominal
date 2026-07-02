"use strict";

import { NonTerminalNode } from "occam-languages";

export default class DocumentNode extends NonTerminalNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(DocumentNode, ruleName, childNodes, opacity, precedence); }
}
