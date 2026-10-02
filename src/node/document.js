"use strict";

import { NonTerminalNode } from "occam-languages";

export default class DocumentNode extends NonTerminalNode {
  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(DocumentNode, ruleName, childNodes, precedence, opacity); }
}
