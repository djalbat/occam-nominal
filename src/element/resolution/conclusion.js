"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Resolution from "../resolution";

import { define } from "../../elements";
import { declare, desist } from "../../utilities/state";
import { instantiateConclusion } from "../../process/instantiate";
import { unserialise, instantiate } from "../../utilities/context";

const { cut } = continuationUtilities,
      { breakable, breakPointFromJSON } = breakPointUtilities;

export default define(class Conclusion extends Resolution {
  getConclusionNode() {
    const node = this.getNode(),
          conclusionNode = node;  ///

    return conclusionNode;
  }

  isMalformed() {
    const conclusionNode = this.getConclusionNode(),
          malformed = conclusionNode.isMalformed();

    return malformed;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const conclusionString = this.getString();  ///

    context.trace(`Verifying the '${conclusionString}' conclusion...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.trace(`Unable to verify the '${conclusionString}' conclusion because it is malformed.`);

      return back();
    }

    declare((state) => {
      desist((state) => {
        return this.validate(state, context, (conclusion, _ , back) => {
          context.debug(`...verified the '${conclusionString}' conclusion.`);

          return forward(context, back);
        }, (exception) => {
          if (exception) {
            return back(exception);
          }

          context.trace(`Unable to verify the '${conclusionString}' conclusion.`);

          return back();
        });
      }, state);
    });
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
