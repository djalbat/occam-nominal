"use strict";

import HeaderNode from "../../node/header";

export default class SchemaHeaderNode extends HeaderNode {
  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return HeaderNode.fromRuleNameChildNodesPrecedenceAndOpacity(SchemaHeaderNode, ruleName, childNodes, precedence, opacity); }
}
