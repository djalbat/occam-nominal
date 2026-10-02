"use strict";

import BodyNode from "../../node/body";

export default class SchemaBodyNode extends BodyNode {
  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return BodyNode.fromRuleNameChildNodesPrecedenceAndOpacity(SchemaBodyNode, ruleName, childNodes, precedence, opacity); }
}
