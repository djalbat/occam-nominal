"use strict";

import { termFromTermNode, statementFromStatementNode } from "../utilities/element";
import { BRACKETED_TERM_DEPTH, BRACKETED_STATEMENT_DEPTH } from "../constants";
import { bracketedConstructorFromNothing, bracketedCombinatorFromNothing } from "../utilities/instance";

export function stripBracketsFromTerm(term, context) {
  let termNode = term.getNode(),
      bracketedTermChildNode = bracketedTermChildNodeFromTermNode(termNode);

  while (bracketedTermChildNode !== null) {
    termNode = bracketedTermChildNode;  ///

    bracketedTermChildNode = bracketedTermChildNodeFromTermNode(termNode);
  }

  term = termFromTermNode(termNode, context);

  return term;
}

export function stripBracketsFromTermNode(termNode) {
  let bracketedTermChildNode = bracketedTermChildNodeFromTermNode(termNode);

  while (bracketedTermChildNode !== null) {
    termNode = bracketedTermChildNode;  ///

    bracketedTermChildNode = bracketedTermChildNodeFromTermNode(termNode);
  }

  return termNode;
}

export function stripBracketsFromStatement(statement, context) {
  let statementNode = statement.getNode(),
    bracketedStatementChildNode = bracketedStatementChildNodeFromStatementNode(statementNode);

  while (bracketedStatementChildNode !== null) {
    statementNode = bracketedStatementChildNode;  ///

    bracketedStatementChildNode = bracketedStatementChildNodeFromStatementNode(statementNode);
  }

  statement = statementFromStatementNode(statementNode, context);

  return statement;
}

export function stripBracketsFromStatementNode(statementNode) {
  let bracketedStatementChildNode = bracketedStatementChildNodeFromStatementNode(statementNode);

  while (bracketedStatementChildNode !== null) {
    statementNode = bracketedStatementChildNode;  ///

    bracketedStatementChildNode = bracketedStatementChildNodeFromStatementNode(statementNode);
  }

  return statementNode;
}

function bracketedTermChildNodeFromTermNode(termNode) {
  let bracketedTermChildNode = null;

  const depth = BRACKETED_TERM_DEPTH,
        bracketedConstructor = bracketedConstructorFromNothing(),
        bracketedConstructorTerm = bracketedConstructor.getTerm(),
        bracketedConstructorTermNode = bracketedConstructorTerm.getNode(),
        termNodeMatchBracketedConstructorNode = termNode.match(bracketedConstructorTermNode, depth);

  if (termNodeMatchBracketedConstructorNode) {
    const singularTermNode = termNode.getSingularTermNode();

    bracketedTermChildNode = singularTermNode;  ///
  }

  return bracketedTermChildNode;
}

function bracketedStatementChildNodeFromStatementNode(statementNode) {
  let bracketedStatementChildNode = null;

  const depth = BRACKETED_STATEMENT_DEPTH,
        bracketedCombinator = bracketedCombinatorFromNothing(),
        bracketedCombinatorStatement = bracketedCombinator.getStatement(),
        bracketedCombinatorStatementnNode = bracketedCombinatorStatement.getNode(),
        statementNodeMatchBracketedCombinatorStatementNode = statementNode.match(bracketedCombinatorStatementnNode, depth);

  if (statementNodeMatchBracketedCombinatorStatementNode) {
    const singularStatementNode = statementNode.getSingularStatementNode();

    bracketedStatementChildNode = singularStatementNode;  ///
  }

  return bracketedStatementChildNode;
}
