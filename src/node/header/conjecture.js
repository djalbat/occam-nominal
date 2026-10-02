"use strict";

import HeaderNode from "../../node/header";

export default class ConjectureHeaderNode extends HeaderNode {
  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return HeaderNode.fromRuleNameChildNodesPrecedenceAndOpacity(ConjectureHeaderNode, ruleName, childNodes, precedence, opacity); }
}
