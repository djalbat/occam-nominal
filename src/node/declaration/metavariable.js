"use strict";

import DeclarationNode from "../../node/declaration";

import { META_TYPE_RULE_NAME, METAVARIABLE_RULE_NAME } from "../../ruleNames";

export default class MetavariableDeclarationNode extends DeclarationNode {
  getMetaTypeName() {
    const metaTypeNode = this.getMetaTypeNode(),
          metaTypeName = metaTypeNode.getMetaTypeName();

    return metaTypeName;
  }

  getMetaTypeNode() {
    const ruleName = META_TYPE_RULE_NAME,
          metaTypeNode = this.getNodeByRuleName(ruleName);

    return metaTypeNode
  }

  getMetavariableNode() {
    const ruleName = METAVARIABLE_RULE_NAME,
          metavariableNode = this.getNodeByRuleName(ruleName);

    return metavariableNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return DeclarationNode.fromRuleNameChildNodesOpacityAndPrecedence(MetavariableDeclarationNode, ruleName, childNodes, opacity, precedence); }
}
