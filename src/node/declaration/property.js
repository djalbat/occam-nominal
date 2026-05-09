"use strict";

import DeclarationNode from "../../node/declaration";

import { TYPE_RULE_NAME, PROPERTY_RULE_NAME } from "../../ruleNames";

export default class PropertyDeclarationNode extends DeclarationNode {
  getPropertyName() {
    const propertyNode = this.getPropertyNode(),
          propertyName = propertyNode.getPropertyName();

    return propertyName;
  }

  getNominalTypeName() {
    let nominalTypeName = null;

    const typeNode = this.getTypeNode();

    if (typeNode !== null) {
      nominalTypeName = typeNode.getNominalTypeName();
    }

    return nominalTypeName;
  }

  getTypeNode() {
    const ruleName = TYPE_RULE_NAME,
          typeNode = this.getNodeByRuleName(ruleName);

    return typeNode;
  }

  getPropertyNode() {
    const ruleName = PROPERTY_RULE_NAME,
          propertyNode = this.getNodeByRuleName(ruleName);

    return propertyNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return DeclarationNode.fromRuleNameChildNodesOpacityAndPrecedence(PropertyDeclarationNode, ruleName, childNodes, opacity, precedence); }
}
