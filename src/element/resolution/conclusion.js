"use strict";

import { breakPointUtilities } from "occam-languages";

import Resolution from "../resolution";

import { define } from "../../elements";
import { instantiateConclusion } from "../../process/instantiate";
import { elide, declare, attempt, unserialise, instantiate } from "../../utilities/context";

const { breakable, breakPointFromJSON } = breakPointUtilities;

export default define(class Conclusion extends Resolution {
  getConclusionNode() {
    const node = this.getNode(),
          conclusionNode = node;  ///

    return conclusionNode;
  }

  verify = breakable(function (context, continuation) {
    let verifies = false;

    const conclusionString = this.getString();  ///

    context.trace(`Verifying the '${conclusionString}' conclusion...`);

    const nonsensical = this.isNonsensical();

    if (nonsensical) {
      context.debug(`Unable to verify the '${conclusionString}' conclusion because it is nonsense.`);

      return continuation(verifies);
    }

    return declare((context) => {
      return elide((context) => {
        let validates;

        attempt((context) => {
          validates = this.validate(context, (conclusion, context) => true);

          if (validates) {
            this.commit(context);
          }
        }, context);

        if (!validates) {
          return continuation(verifies);
        }

        verifies = true;

        if (verifies) {
          context.debug(`...verified the '${conclusionString}' conclusion.`);
        }

        return continuation(verifies);
      }, context);
    }, context);
  });

  static name = "Conclusion";

  static fromJSON(json, context) {
    return instantiate((context) => {
      return unserialise((json, context) => {
        const { string } = json,
              conclusionNode = instantiateConclusion(string, context),
              node = conclusionNode,  ///
              breakPoint = breakPointFromJSON(json),
              statement = statementFromConclusionNode(conclusionNode, context),
              conclusion = new Conclusion(context, string, node, breakPoint, statement);

        return conclusion;
      }, json, context);
    }, context);
  }
});

function statementFromConclusionNode(conclusionNode, context) {
  const statementNode = conclusionNode.getStatementNode(),
        statement = context.findStatementByStatementNode(statementNode);

  return statement;
}
