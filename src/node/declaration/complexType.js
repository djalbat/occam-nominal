"use strict";

import DeclarationNode from "../../node/declaration";

import { PROVISIONAL } from "../../constants";
import { TYPE_RULE_NAME, TYPES_RULE_NAME, PROPERTY_DECLARATION_RULE_NAME } from "../../ruleNames";

export default class ComplexTypeDeclarationNode extends DeclarationNode {
  isProvisional() {
    let provisional = false;

    this.someChildNode((childNode) => {
      const childNodeTerminalNode = childNode.isTerminalNode();

      if (childNodeTerminalNode) {
        const terminalNode = childNode,
              content = terminalNode.getContent(),
              contentProvisional = (content === PROVISIONAL);

        if (contentProvisional) {
          provisional = true;

          return true;
        }
      }
    });

    return provisional;
  }

  getTypeName() {
    const typeNode = this.getTypeNode(),
          typeName = typeNode.getTypeName();

    return typeName;
  }

  getTypeNode() {
    const ruleName = TYPE_RULE_NAME,
          typeNode = this.getNodeByRuleName(ruleName);

    return typeNode;
  }

  getTypesNode() {
    const ruleName = TYPES_RULE_NAME,
          typesNode = this.getNodeByRuleName(ruleName);

    return typesNode;
  }

  getSuperTypeNodes() {
    let superTypeNodes = [];

    const typesNode = this.getTypesNode();

    if (typesNode !== null) {
      const typeNodes = typesNode.getTypeNodes();

      superTypeNodes = typeNodes; ///
    }

    return superTypeNodes;
  }

  getTypePrefixName() {
    const typeNode = this.getTypeNode(),
          typePrefixName = typeNode.getTypePrefixName();

    return typePrefixName;
  }

  getNominalTypeName() {
    const typeNode = this.getTypeNode(),
          nominalTypeName = typeNode.getNominalTypeName();

    return nominalTypeName;
  }

  getPropertyDeclarationNodes() {
    const ruleName = PROPERTY_DECLARATION_RULE_NAME,
          propertyDeclarationNodes = this.getNodesByRuleName(ruleName);

    return propertyDeclarationNodes;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return DeclarationNode.fromRuleNameChildNodesOpacityAndPrecedence(ComplexTypeDeclarationNode, ruleName, childNodes, opacity, precedence); }
}
