"use strict";

import { arrayUtilities } from "necessary";

import typesMap from "../typesMap";

import { nominalLexer } from "../utilities/nominal";
import { nodeQuery, nodesQuery } from "../utilities/query";
import { UNASSIGNED_TYPE, BASE_TYPE_SYMBOL } from "../constants";
import { customGrammarBNFLexer, customGrammarBNFParser, customGrammarVocabularyLexer, customGrammarVocabularyParser } from "../utilities/grammar";

const { first, second } = arrayUtilities;

const expressionNodesQuery = nodesQuery("//expression"),
      ruleNameTerminalNodeQuery = nodeQuery("/document/rule/name/@*!"),
      unassignedTerminalNodeQuery = nodeQuery("/expression/@unassigned"),
      stringLiteralTerminalNodesQuery = nodesQuery("//stringLiteral/@*!"),
      significantTokenTypeTerminalNodesQuery = nodesQuery("//significantTokenType/@*!");

export function validateBNF(bnf, ruleName) {
  const content = bnf,
        tokens = customGrammarBNFLexer.tokenise(content),
        node = customGrammarBNFParser.parse(tokens);

  if (node === null) {
    return;
  }

  const ruleNameTerminalNode = ruleNameTerminalNodeQuery(node);

  if (ruleNameTerminalNode !== null) {
    const name = nameFromRuleNameTerminalNode(ruleNameTerminalNode);

    if (name !== ruleName) {
      throw new Error(`The '${name}' rule should be named '${ruleName}'.`);
    }
  }

  const types = typesMap[ruleName],
        significantTokenTypeTerminalNodes = significantTokenTypeTerminalNodesQuery(node);

  significantTokenTypeTerminalNodes.forEach((significantTokenTypeTerminalNode) => {
    const type = typeFromSignificantTokenTypeTerminalNode(significantTokenTypeTerminalNode),
          typesIncludeType = types.includes(type);

    if (!typesIncludeType) {
      throw new Error(`The '${type}' type is not included in the '${ruleName}' rule's types.`)
    }
  });

  const stringLiteralTerminalNodes = stringLiteralTerminalNodesQuery(node);

  stringLiteralTerminalNodes.forEach((stringLiteralTerminalNode) => {
    const content = contentFromStringLiteralTerminalNode(stringLiteralTerminalNode);

    if (content === BASE_TYPE_SYMBOL) {
      throw new Error(`The "${content}" string literal cannot be the same as the base type symbol.`);
    }

    const tokens = nominalLexer.tokenise(content),
          tokensLength = tokens.length;

    if (tokensLength !== 1) {
      throw new Error(`Tokenising the "${content}" string literal does not result in a single token.`);
    }

    const firstToken = first(tokens),
          token = firstToken, ///
          type = token.getType(),
          typesIncludeType = types.includes(type);

    if (!typesIncludeType) {
      throw new Error(`The "${content}" string literal's token's '${type}' type is not included in the '${ruleName}' rule's types.`)
    }
  });
}

export function validateVocabulary(vocabulary) {
  const content = vocabulary, ///
        tokens = customGrammarVocabularyLexer.tokenise(content),
        node = customGrammarVocabularyParser.parse(tokens);

  if (node === null) {
    return;
  }

  const expressionNodes = expressionNodesQuery(node);

  expressionNodes.forEach((expressionNode) => {
    const content = contentFromExpressionNode(expressionNode),
          tokens = nominalLexer.tokenise(content),
          tokensLength = tokens.length;

    if (tokensLength > 1) {
      throw new Error(`Tokenising the '${content}' content results in more than one token.`);
    }

    const firstToken = first(tokens),
          token = firstToken,
          type = token.getType();

    if (type !== UNASSIGNED_TYPE) {
      throw new Error(`The '${type}' type of the '${content}' token is not 'unassigned'.`);
    }

    if (content === BASE_TYPE_SYMBOL) {
      throw new Error(`The '${content}' token cannot be the same as the base type symbol.`);
    }
  });
}

function contentFromExpressionNode(expressionNode) {
  let content;

  const unassignedTerminalNode = unassignedTerminalNodeQuery(expressionNode);

  content = unassignedTerminalNode.getContent();

  return content;;
}

function nameFromRuleNameTerminalNode(ruleNameTerminalNode) {
  let name;

  const content = ruleNameTerminalNode.getContent();

  name = content; ///

  return name;
}

function contentFromStringLiteralTerminalNode(stringLiteralTerminalNode) {
  let content;

  content = stringLiteralTerminalNode.getContent();

  const matches = content.match(/"([^"]*)"/),
        secondMatch = second(matches);

  content = secondMatch; ///

  return content;
}

function typeFromSignificantTokenTypeTerminalNode(significantTokenTypeTerminalNode) {
  let type;

  const content = significantTokenTypeTerminalNode.getContent(),
        matches = content.match(/\[([^\]]*)\]/),
        secondMatch = second(matches);

  type = secondMatch; ///

  return type;
}
