"use strict";

import BodyNode from "../../node/body";

export default class AxiomBodyNode extends BodyNode {
  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return BodyNode.fromRuleNameChildNodesPrecedenceAndOpacity(AxiomBodyNode, ruleName, childNodes, precedence, opacity); }
}
