"use strict";

import { NonTerminalNode } from "occam-languages";

export default class PlaceholderNode extends NonTerminalNode {
  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(PlaceholderNode, ruleName, childNodes, precedence, opacity); }
}
