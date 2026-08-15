"use strict";

import elements from "../elements";

import { derive } from "../utilities/state";

function dischargeStatementAsTypeAssertion(statement, generalContext, specificContext) {
  let dischargesStatementAsTypeAssertion = false;

  const { TypeAssertion } = elements;

  const context = generalContext, ///
        typeAssertion = TypeAssertion.fromStatement(statement, context);

  if (typeAssertion !== null) {
    const statementString = statement.getString();

    context.trace(`Discharging the '${statementString}' statement's type assertion...`);

    derive((state) => {
      const typeAssertionValidates = typeAssertion.validate(state, context, (typeAssertion, context) => {
        context = specificContext;  ///

        let validates = false;

        const discharges = typeAssertion.discharge(context);  ///

        if (discharges) {
          validates = true;
        }

        return validates;
      });

      if (typeAssertionValidates) {
        dischargesStatementAsTypeAssertion = true;
      }
    });

    if (dischargesStatementAsTypeAssertion) {
      context.debug(`...discharged the '${statementString}' statement's type assertion.`);
    }
  }

  return dischargesStatementAsTypeAssertion;
}

export const dischargeStatements = [
  dischargeStatementAsTypeAssertion
];
