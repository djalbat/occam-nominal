"use strict";

import HeaderNode from "../../node/header";

export default class LemmaHeaderNode extends HeaderNode {
  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return HeaderNode.fromRuleNameChildNodesPrecedenceAndOpacity(LemmaHeaderNode, ruleName, childNodes, precedence, opacity); }
}
