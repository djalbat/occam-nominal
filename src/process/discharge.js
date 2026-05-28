"use strict";

import elements from "../elements";

function dischargeStatementAsTypeAssertion(statement, context) {
  let dischargesStatementAsTypeAssertion = false;

  const { TypeAssertion } = elements;

  const typeAssertion = TypeAssertion.fromStatement(statement, context);

  if (typeAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Discharging the '${statementString}' statement's type assertion...`);

    const discharges = typeAssertion.discharge(context);  ///

    if (discharges !== null) {
      dischargesStatementAsTypeAssertion = true;
    }

    if (dischargesStatementAsTypeAssertion) {
      context.debug(`...discharged the '${statementString}' statement's type assertion.`);
    }
  }

  return dischargesStatementAsTypeAssertion;
}

export const dischargeStatements = [
  dischargeStatementAsTypeAssertion
];
