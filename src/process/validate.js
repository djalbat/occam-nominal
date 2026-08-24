"use strict";

import { queryUtilities } from "occam-query";
import { ContinuationPass } from "occam-languages";

import { declare } from "../utilities/state";
import { termFromTermNode, statementFromStatementNode } from "../utilities/element";

const { nodeQuery } = queryUtilities;

const termNodeQuery = nodeQuery("/term"),
      typeNodeQuery = nodeQuery("/type"),
      variableNodeQuery = nodeQuery("/variable"),
      statementNodeQuery = nodeQuery("/statement"),
      metavariableNodeQuery = nodeQuery("/metavariable");

class ValidateTermPass extends ContinuationPass {
  static maps = [
    {
      nodeQuery: variableNodeQuery,
      run: (variableNode, context, forward, back) => {
        return back();
      }
    },
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, forward, back) => {
        const term = termFromTermNode(termNode, context);

        return declare((state) => {
          return term.validate(state, context, (term, context, back) => {
            return forward(context, back);
          }, back);
        });
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context, forward, back) => {
        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (!typePresent) {
          return back();
        }

        return forward(context, back);
      }
    }
  ];
}

class ValidateStatementPass extends ContinuationPass {
  static maps = [
    {
      nodeQuery: metavariableNodeQuery,
      run: (metavariableNode, context, forward, back) => {
        return back();
      }
    },
    {
      nodeQuery: statementNodeQuery,
      run: (statementNode, context, forward, back) => {
        const statement = statementFromStatementNode(statementNode, context);

        return declare((state) => {
          return statement.validate(state, context, (statement, context, back) => {
            return forward(context, back);
          }, back);
        });
      }
    },
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, forward, back) => {
        const term = termFromTermNode(termNode, context);

        return declare((state) => {
          return term.validate(state, context, (term, context, back) => {
            return forward(context, back);
          }, back);
        });
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context, forward, back) => {
        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (!typePresent) {
          return back();
        }

        return forward(context, back);
      }
    }
  ];
}

const validateTermPass = new ValidateTermPass(),
      validateStatementPass = new ValidateStatementPass();

export function validateTermAsProperty(term, context, forward, back) {
  const termNode = term.getNode(),
        termChildNodes = termNode.getChildNodes();  ///

  return validateTermPass.descend(termChildNodes, context, forward, back);
}

export function validateTermAsGenerator(term, context, forward, back) {
  const termNode = term.getNode(),
        termChildNodes = termNode.getChildNodes();  ///

  return validateTermPass.descend(termChildNodes, context, forward, back);
}

export function validateTermAsConstructor(term, context, forward, back) {
  const termNode = term.getNode(),
        termChildNodes = termNode.getChildNodes();  ///

  return validateTermPass.descend(termChildNodes, context, forward, back);
}

export function validateStatementAsCombinator(statement, context, forward, back) {
  const statementNode = statement.getNode(),
        statementChildNodes = statementNode.getChildNodes();  ///

  return validateStatementPass.descend(statementChildNodes, context, forward, back);
}
