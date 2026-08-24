"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Resolution from "../resolution";

import { define } from "../../elements";
import { desist, declare } from "../../utilities/state";
import { instantiateDeduction } from "../../process/instantiate";
import { unserialise, instantiate } from "../../utilities/context";

const { cut } = continuationUtilities,
      { breakable, breakPointFromJSON } = breakPointUtilities;

export default define(class Deduction extends Resolution {
  getDeductionNode() {
    const node = this.getNode(),
          deductionNode = node; ///

    return deductionNode;
  }

  isMalformed() {
    const deductionNode = this.getDeductionNode(),
          malformed = deductionNode.isMalformed();

    return malformed;
  }

  verify = breakable(function (context, forward, back) {
    const deductionString = this.getString();  ///

    context.trace(`Verifying the '${deductionString}' deduction...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.debug(`Unable to verify the '${deductionString}' deduction because it is malformed.`);

      return back();
    }

    declare((state) => {
      desist((state) => {
        return this.validate(state, context, cut((deduction, _ , back) => {
          context.debug(`...verified the '${deductionString}' deduction.`);

          return forward(context, back);
        }, back), back);
      }, state);
    });
  });

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
