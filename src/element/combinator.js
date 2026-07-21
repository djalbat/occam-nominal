"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiateCombinator } from "../process/instantiate";
import { statementFromCombinatorNode } from "../utilities/element";
import { unifyStatementWithCombinator } from "../process/unify";
import { validateStatementAsCombinator } from "../process/validate";
import { attempt, serialise, unserialise, instantiate } from "../utilities/context";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

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

  verify(context, continuation) {
    const combinatorString = this.getString();  ///

    context.trace(`Verifying the '${combinatorString}' combinator...`);

    attempt((context) => {
      return this.validateStatement(context, (statementValidates, context) => {
        let verifies = false;

        if (statementValidates) {
          verifies = true;
        }

        if (verifies) {
          this.commit(context);

          context.debug(`...verified the '${combinatorString}' combinator.`);
        }

        return continuation(verifies, context);
      });
    }, context)
  }

  validateStatement(context, continuation) {
    const combinatorString = this.getString();  ///

    context.trace(`Validating the '${combinatorString}' combinator's statement...`);

    return validateStatementAsCombinator(this.statement, context, (statementValidatesAsCombinator, context) => {
      let statementValidates = false;

      if (statementValidatesAsCombinator) {
        statementValidates = true;
      }

      if (statementValidates) {
        context.debug(`...validated the '${combinatorString}' combinator's statement.`);
      }

      return continuation(statementValidates, context);
    });
  }

  unifyStatement(statement, context, continuation) {
    const statementString = statement.getString(),
          combinatorString = this.getString();  ///

    context.trace(`Unifying the '${statementString}' statement with the '${combinatorString}' combinator...`);

    const combinator = this, ///
          combinatorContext = combinator.getContext(),
          generalContext = combinatorContext, ///
          specifiContext = context; ///

    return unifyStatementWithCombinator(statement, combinator, generalContext, specifiContext, (statementUnifiesWithCombinator, generalContext, specifiContext) => {
      const context = specifiContext; ///

      let statementUnifies = false;

      if (statementUnifiesWithCombinator) {
        statementUnifies = true;
      }

      if (statementUnifies) {
        context.debug(`...unified the '${statementString}' statement with the '${combinatorString}' combinator.`);
      }

      return continuation(statementUnifies, context);
    });
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
