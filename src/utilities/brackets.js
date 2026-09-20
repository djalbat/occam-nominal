"use strict";

import { termFromTermNode, statementFromStatementNode } from "../utilities/element";
import { BRACKETED_TERM_DEPTH, BRACKETED_STATEMENT_DEPTH } from "../constants";
import { bracketedConstructorFromNothing, bracketedCombinatorFromNothing } from "../utilities/instance";

export function stripBracketsFromTerm(term, context) {
  const type = term.getType();

  let termNode = term.getNode(),
      bracketedTermChildNode = bracketedTermChildNodeFromTermNode(termNode, context);

  while (bracketedTermChildNode !== null) {
    termNode = bracketedTermChildNode;  ///

    bracketedTermChildNode = bracketedTermChildNodeFromTermNode(termNode, context);
  }

  term = termFromTermNode(termNode, context);

  term.setType(type);

  return term;
}

export function stripBracketsFromTermNode(termNode, context) {
  let bracketedTermChildNode = bracketedTermChildNodeFromTermNode(termNode, context);

  while (bracketedTermChildNode !== null) {
    termNode = bracketedTermChildNode;  ///

    bracketedTermChildNode = bracketedTermChildNodeFromTermNode(termNode, context);
  }

  return termNode;
}

export function stripBracketsFromStatement(statement, context) {
  let statementNode = statement.getNode(),
      bracketedStatementChildNode = bracketedStatementChildNodeFromStatementNode(statementNode, context);

  while (bracketedStatementChildNode !== null) {
    statementNode = bracketedStatementChildNode;  ///

    bracketedStatementChildNode = bracketedStatementChildNodeFromStatementNode(statementNode, context);
  }

  statement = statementFromStatementNode(statementNode, context);

  return statement;
}

export function stripBracketsFromStatementNode(statementNode, context) {
  let bracketedStatementChildNode = bracketedStatementChildNodeFromStatementNode(statementNode, context);

  while (bracketedStatementChildNode !== null) {
    statementNode = bracketedStatementChildNode;  ///

    bracketedStatementChildNode = bracketedStatementChildNodeFromStatementNode(statementNode, context);
  }

  return statementNode;
}

function bracketedTermChildNodeFromTermNode(termNode, context) {
  let bracketedTermChildNode = null;

  const depth = BRACKETED_TERM_DEPTH,
        bracketedConstructor = bracketedConstructorFromNothing(context),
        bracketedConstructorTerm = bracketedConstructor.getTerm(),
        bracketedConstructorTermNode = bracketedConstructorTerm.getNode(),
        termNodeMatchBracketedConstructorNode = termNode.match(bracketedConstructorTermNode, depth);

  if (termNodeMatchBracketedConstructorNode) {
    const singularTermNode = termNode.getSingularTermNode();

    bracketedTermChildNode = singularTermNode;  ///
  }

  return bracketedTermChildNode;
}

function bracketedStatementChildNodeFromStatementNode(statementNode, context) {
  let bracketedStatementChildNode = null;

  const depth = BRACKETED_STATEMENT_DEPTH,
        bracketedCombinator = bracketedCombinatorFromNothing(context),
        bracketedCombinatorStatement = bracketedCombinator.getStatement(),
        bracketedCombinatorStatementnNode = bracketedCombinatorStatement.getNode(),
        statementNodeMatchBracketedCombinatorStatementNode = statementNode.match(bracketedCombinatorStatementnNode, depth);

  if (statementNodeMatchBracketedCombinatorStatementNode) {
    const singularStatementNode = statementNode.getSingularStatementNode();

    bracketedStatementChildNode = singularStatementNode;  ///
  }

  return bracketedStatementChildNode;
}
