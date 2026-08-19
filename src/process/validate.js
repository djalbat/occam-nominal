"use strict";

import { queryUtilities } from "occam-query";
import { ContinuationPass } from "occam-languages";

import { declare } from "../utilities/state";
import { termFromTermNode, statementFromStatementNode } from "../utilities/element";

const { nodeQuery } = queryUtilities;

const termNodeQuery = nodeQuery("/term"),
      typeNodeQuery = nodeQuery("/type"),
      statementNodeQuery = nodeQuery("/statement");

class ValidateTermPass extends ContinuationPass {
  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuation) => {
        const term = termFromTermNode(termNode, context);

        return declare((state) => {
          return term.validate(state, context, (term, context) => {
            let success = false;

            if (term !== null) {
              success = true;
            }

            return continuation(success, context);
          });
        });
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context, continuation) => {
        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        let success = false;

        if (typePresent) {
          success = true;
        }

        return continuation(success, context);
      }
    }
  ];
}

class ValidateStatementPass extends ContinuationPass {
  static maps = [
    {
      nodeQuery: statementNodeQuery,
      run: (statementNode, context, continuation) => {
        const statement = statementFromStatementNode(statementNode, context);

        return declare((state) => {
          return statement.validate(state, context, (statement, context) => {
            let success = false;

            if (statement !== null) {
              success = true;
            }

            return continuation(success, context);
          });
        });
      }
    },
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuation) => {
        const term = termFromTermNode(termNode, context);

        return declare((state) => {
          return term.validate(state, context, (term, context) => {
            let success = false;

            if (term !== null) {
              success = true;
            }

            return continuation(success, context);
          });
        });
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context, continuation) => {
        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        let success = false;

        if (typePresent) {
          success = true
        }

        return continuation(success, context);
      }
    }
  ];
}

const validateTermPass = new ValidateTermPass(),
      validateStatementPass = new ValidateStatementPass();

export function validateTermAsProperty(term, context, continuation) {
  const termNode = term.getNode(),
        termChildNodes = termNode.getChildNodes();  ///

  return validateTermPass.descend(termChildNodes, context, continuation, (descended) => {
    let termValidatesAsProperty = false;

    if (descended) {
      termValidatesAsProperty = true;
    }

    return continuation(termValidatesAsProperty, context);
  });
}

export function validateTermAsGenerator(term, context, continuation) {
  const termNode = term.getNode(),
        termChildNodes = termNode.getChildNodes();  ///

  return validateTermPass.descend(termChildNodes, context, continuation, (descended) => {
    let termValidatesAsGenerator = false;

    if (descended) {
      termValidatesAsGenerator = true;
    }

    return continuation(termValidatesAsGenerator, context);
  });
}

export function validateTermAsConstructor(term, context, continuation) {
  const termNode = term.getNode(),
        termChildNodes = termNode.getChildNodes();  ///

  return validateTermPass.descend(termChildNodes, context, continuation, (descended) => {
    let termValidatesAsConstructor = false;

    if (descended) {
      termValidatesAsConstructor = true;
    }

    return continuation(termValidatesAsConstructor, context);
  });
}

export function validateStatementAsCombinator(statement, context, continuation) {
  const statementNode = statement.getNode(),
        statementChildNodes = statementNode.getChildNodes();  ///

  return validateStatementPass.descend(statementChildNodes, context, (descended) => {
    let statementValidatesAsCombinator = false;

    if (descended) {
      statementValidatesAsCombinator = true;
    }

    return continuation(statementValidatesAsCombinator, context);
  });
}
