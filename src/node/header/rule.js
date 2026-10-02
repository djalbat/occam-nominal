"use strict";

import HeaderNode from "../../node/header";

export default class RuleHeaderNode extends HeaderNode {
  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return HeaderNode.fromRuleNameChildNodesPrecedenceAndOpacity(RuleHeaderNode, ruleName, childNodes, precedence, opacity); }
}
