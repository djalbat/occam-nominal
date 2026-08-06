"use strict";

import { breakPointUtilities } from "occam-languages";

import Resolution from "../resolution";

import { define } from "../../elements";
import { desist, declare } from "../../utilities/state";
import { instantiateDeduction } from "../../process/instantiate";
import { attempt, unserialise, instantiate } from "../../utilities/context";

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

    let validates;

    attempt((context) => {
      declare((state) => {
        desist((state) => {
          validates = this.validate(state, context, (decudtion, context) => true);
        }, state);

        if (validates) {
          this.commit(context);
        }
      });
    }, context);

    if (!validates) {
      return continuation(verifies);
    }

    verifies = true;

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
    return instantiate((context) => {
      return unserialise((json, context) => {
        const { string } = json,
              deductionNode = instantiateDeduction(string, context),
              node = deductionNode,  ///
              breakPoint = breakPointFromJSON(json),
              statement = statementFromDeductionNode(deductionNode, context),
              deduction = new Deduction(context, string, node, breakPoint, statement);

        return deduction;
      }, json, context);
    }, context);
  }
});

function statementFromDeductionNode(deductionNode, context) {
  const statementNode = deductionNode.getStatementNode(),
        statement = context.findStatementByStatementNode(statementNode);

  return statement;
}
