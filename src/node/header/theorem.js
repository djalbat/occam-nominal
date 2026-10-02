"use strict";

import HeaderNode from "../../node/header";

export default class TheoremHeaderNode extends HeaderNode {
  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return HeaderNode.fromRuleNameChildNodesPrecedenceAndOpacity(TheoremHeaderNode, ruleName, childNodes, precedence, opacity); }
}
