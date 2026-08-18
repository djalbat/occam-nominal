"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { all } from "../utilities/continuation";
import { define } from "../elements";
import { desist, declare } from "../utilities/state";
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

  isMalformed() {
    const combinatoryNode = this.getCombinatoryNode(),
          malformed = combinatoryNode.isMalformed();

    return malformed;
  }

  verify(context, continuation) {
    let verifies = false;

    const combinatorString = this.getString();  ///

    context.trace(`Verifying the '${combinatorString}' combinator...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.debug(`Unable to verify the '${combinatorString}' combinator because it is malformed.`);

      return continuation(verifies, context);
    }

    declare((state) => {
      desist((state) => {
        const validates = this.validate(state, context, (ocmbinator, context) => true); ///

        if (validates) {
          verifies = true;
        }
      }, state);
    });

    if (verifies) {
      context.debug(`...verified the '${combinatorString}' combinator.`);
    }

    return continuation(verifies, context);
  }

  validate(state, context, continuation) {
    let validates;

    const specificContext = context,  ///
          combinatorString = this.getString();  ///

    context.trace(`Validating the '${combinatorString}' combinator...`);

    const combinator = this;

    attempt((context) => {
      const validateStatementAsCombinator = this.validateStatementAsCombinator.bind(this);

      validates = all([
        validateStatementAsCombinator
      ], state, context, (state, context) => {
        let validates;

        context = specificContext;  ///

        validates = continuation(combinator, context);

        return validates;
      });

      if (validates) {
        this.commit(context)
      }
    }, context);

    context = specificContext;  ///

    if (validates) {
      context.debug(`...validated the '${combinatorString}' combinator.`);
    }

    return validates;
  }

  validateStatementAsCombinator(state, context, continuation) {
    let statementValidatesAsCombinator;

    const combinatorString = this.getString();

    context.trace(`Validating the '${combinatorString}' combinator's statement...`);

    statementValidatesAsCombinator = validateStatementAsCombinator(this.statement, context, (context) => {
      let validates;

      validates = continuation(state, context);

      return validates;
    });

    if (statementValidatesAsCombinator) {
      context.debug(`...validated the '${combinatorString}' combinator's statement.`);
    }

    return statementValidatesAsCombinator;
  }

  unifyStatement(statement, context, continuation) {
    let statementUnifies = false;

    const statementString = statement.getString(),
          combinatorString = this.getString();  ///

    context.trace(`Unifying the '${statementString}' statement with the '${combinatorString}' combinator...`);

    const combinator = this, ///
          generalContext = this.getContext(), ///
          specifiContext = context,
          statementUnifiesWithCombinator = unifyStatementWithCombinator(statement, combinator, generalContext, specifiContext, (generalContext, specifiContext) => {
            let statementUnifiesWithCombinator;

            const context = specifiContext; ///

            statementUnifiesWithCombinator = continuation(statement, context);

            return statementUnifiesWithCombinator;
          });

    if (statementUnifiesWithCombinator) {
      statementUnifies = true;
    }

    if (statementUnifies) {
      context.debug(`...unified the '${statementString}' statement with the '${combinatorString}' combinator.`);
    }

    return statementUnifies;
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
