"use strict";

import { NonTerminalNode } from "occam-languages";

export default class ErrorNode extends NonTerminalNode {
  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(ErrorNode, ruleName, childNodes, precedence, opacity); }
}
