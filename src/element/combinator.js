"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { desist, declare } from "../utilities/state";
import { instantiateCombinator } from "../process/instantiate";
import { statementFromCombinatorNode } from "../utilities/element";
import { unifyStatementWithCombinator } from "../process/unify";
import { validateStatementAsCombinator } from "../process/validate";
import { attempt, serialise, unserialise, instantiate } from "../utilities/context";

const { exists, isolate } = continuationUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Combinator extends Element {
  constructor(context, string, node, breakPoint, statement) {
    super(context, string, node, breakPoint);

    this.statement = statement;
  }

  getStatement() {
    return this.statement;
  }

  getCombinatoryNode() {
    const node = this.getNode(),
          combinatorNode = node;  ///

    return combinatorNode;
  }

  isMalformed() {
    const combinatoryNode = this.getCombinatoryNode(),
          malformed = combinatoryNode.isMalformed();

    return malformed;
  }

  verify(context, forward, back) {
    const includeType = false,
          cbmbinatorString = this.getString(includeType);  ///

    context.trace(`Verifying the '${cbmbinatorString}' cbmbinator...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.trace(`Unable to verify the '${cbmbinatorString}' cbmbinator because it is malformed.`);

      return back();
    }

    return declare((state) => {
      return desist((state) => {
        return this.validate(state, context, (cbmbinator, _ , back) => {
          context.debug(`...verified the '${cbmbinatorString}' cbmbinator.`);

          return forward(context, back);
        }, back);
      }, state);
    });
  }

  validate(state, context, forward, back) {
    const includeType = false,
          combinatorString = this.getString(includeType);  ///

    context.trace(`Validating the '${combinatorString}' combinator...`);

    return isolate((state, context, forward, back) => {
      return attempt((context) => {
        const validateStatementAsCombinator = this.validateStatementAsCombinator.bind(this);

        return exists([
          validateStatementAsCombinator
        ], state, context, (state, context, back) => {
          this.commit(context);

          return forward(back);
        }, back);
      }, context);
    }, state, context, (state, context, back) => {
      const combinator = this;  ///

      context.debug(`...validated the '${combinatorString}' combinator.`);

      return forward(combinator, context, back);
    }, back);
  }

  validateStatementAsCombinator(state, context, forward, back) {
    const includeType = false,
          combinatorString = this.getString(includeType);  ///

    context.trace(`Validating the '${combinatorString}' combinator's statement...`);

    return validateStatementAsCombinator(this.statement, context, (context, back) => {
      context.debug(`...validated the '${combinatorString}' combinator's statement.`);

      return forward(state, context, back);
    }, back);
  }

  unifyStatement(statement, context, forward, back) {
    const statementString = statement.getString(),
          combinatorString = this.getString();  ///

    context.trace(`Unifying the '${statementString}' statement with the '${combinatorString}' combinator...`);

    const combinator = this, ///
          generalContext = this.getContext(), ///
          specificContext = context; ///

    return unifyStatementWithCombinator(statement, combinator, generalContext, specificContext, ( _ , specificContext, back) => {
      const context = specificContext; ///

      context.debug(`...unified the '${statementString}' statement with the '${combinatorString}' combinator.`);

      return forward(statement, context, back);
    }, back);
  }

  toJSON() {
    const context = this.getContext();

    return serialise((context) => {
      const string = this.getString();

      let breakPoint;

      breakPoint = this.getBreakPoint();

      const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

      breakPoint = breakPointJSON;  ///

      const json = {
        context,
        string,
        breakPoint
      };

      return json;
    }, context);
  }

  static name = "Combinator";

  static fromJSON(json, context) {
    let combinator;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              combinatorNode = instantiateCombinator(string, context),
              node = combinatorNode,  ///
              breakPoint = breakPointFromJSON(json),
              statement = statementFromCombinatorNode(combinatorNode, context);

        combinator = new Combinator(context, string, node, breakPoint, statement);
      }, json, context);
    }, context);

    return combinator;
  }
});
