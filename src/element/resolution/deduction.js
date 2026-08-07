"use strict";

import { breakPointUtilities } from "occam-languages";

import Resolution from "../resolution";

import { define } from "../../elements";
import { desist, declare } from "../../utilities/state";
import { instantiateDeduction } from "../../process/instantiate";
import { unserialise, instantiate } from "../../utilities/context";

const { breakable, breakPointFromJSON } = breakPointUtilities;

export default define(class Deduction extends Resolution {
  getDeductionNode() {
    const node = this.getNode(),
          deductionNode = node; ///

    return deductionNode;
  }

  verify = breakable(function (context, continuation) {
    let verifies = false;

    const decudtionString = this.getString();  ///

    context.trace(`Verifying the '${decudtionString}' decudtion...`);

    const nonsensical = this.isNonsensical();

    if (nonsensical) {
      context.debug(`Unable to verify the '${decudtionString}' decudtion because it is nonsense.`);

      return continuation(verifies);
    }

    declare((state) => {
      desist((state) => {
        const validates = this.validate(state, context, (conclusion, context) => true);

        if (validates) {
          verifies = true;
        }
      }, state);
    });

    if (verifies) {
      context.debug(`...verified the '${decudtionString}' decudtion.`);
    }

    return continuation(verifies);
  });

  unifyStatement(statement, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          deductionString = this.getString(), ///
          statementString = statement.getString();

    context.trace(`Unifying the '${statementString}' statement with the '${deductionString}' deduction's statement...`);

    return this.statement.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
      if (statementUnifies) {
        context.debug(`...unified the '${statementString}' statement with the '${deductionString}' deduction's statement.`);
      }

      return continuation(statementUnifies);
    });
  }

  static name = "Deduction";

  static fromJSON(json, context) {
    let deduction;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              deductionNode = instantiateDeduction(string, context),
              node = deductionNode,  ///
              breakPoint = breakPointFromJSON(json),
              statement = statementFromDeductionNode(deductionNode, context);

        deduction = new Deduction(context, string, node, breakPoint, statement);
      }, json, context);
    }, context);

    return deduction;
  }
});

function statementFromDeductionNode(deductionNode, context) {
  const statementNode = deductionNode.getStatementNode(),
        statement = context.findStatementByStatementNode(statementNode);

  return statement;
}
