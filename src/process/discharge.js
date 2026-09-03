"use strict";

function dischargeStatementAsTypeAssertion(statement, generalContext, specificContext, forward, back) {
  const statementNode = statement.getNode(),
        typeAssertionNode = statementNode.getTypeAssertionNode();

  if (typeAssertionNode === null) {
    return back();
  }

  const context = generalContext, ///
        typeAssertion = context.findAssertionByAssertionNode(typeAssertionNode),
        statementString = statement.getString();

  context.trace(`Discharging the '${statementString}' statement's type assertion...`);

  return typeAssertion.discharge(generalContext, specificContext, (generalContext, specificContext, back) => {
    context.debug(`...discharged the '${statementString}' statement's type assertion.`);

    return forward(generalContext, specificContext, back);
  }, back);
}

export const dischargeStatements = [
  dischargeStatementAsTypeAssertion
];
