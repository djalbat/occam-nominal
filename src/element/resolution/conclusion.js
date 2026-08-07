"use strict";

import { breakPointUtilities } from "occam-languages";

import Resolution from "../resolution";

import { define } from "../../elements";
import { declare, desist } from "../../utilities/state";
import { instantiateConclusion } from "../../process/instantiate";
import { unserialise, instantiate } from "../../utilities/context";

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

    declare((state) => {
      desist((state) => {
        const validates = this.validate(state, context, (conclusion, context) => true);

        if (validates) {
          verifies = true;
        }
      }, state);
    });

    if (verifies) {
      context.debug(`...verified the '${conclusionString}' conclusion.`);
    }

    return continuation(verifies);
  });

  static name = "Conclusion";

  static fromJSON(json, context) {
    let conclusion;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              conclusionNode = instantiateConclusion(string, context),
              node = conclusionNode,  ///
              breakPoint = breakPointFromJSON(json),
              statement = statementFromConclusionNode(conclusionNode, context);

        conclusion = new Conclusion(context, string, node, breakPoint, statement);
      }, json, context);
    }, context);

    return conclusion;
  }
});

function statementFromConclusionNode(conclusionNode, context) {
  const statementNode = conclusionNode.getStatementNode(),
        statement = context.findStatementByStatementNode(statementNode);

  return statement;
}
