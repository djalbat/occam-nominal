"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { instantiateCombinator } from "../process/instantiate";
import { statementFromCombinatorNode } from "../utilities/element";
import { unifyStatementWithCombinator } from "../process/unify";
import { validateStatementAsCombinator } from "../process/validate";
import { attempt, serialise, unserialise, instantiate } from "../utilities/context";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";

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

  validate(context) {
    let validates = false;

    const combinatorString = this.getString();  ///

    context.trace(`Validating the '${combinatorString}' combinator...`);

    attempt((context) => {
      const statementValidates = this.validateStatement(context);

      if (statementValidates) {
        validates = true;
      }

      if (validates) {
        this.commit(context);
      }
    }, context)

    if (validates) {
      context.debug(`...validated the '${combinatorString}' combinator.`);
    }

    return validates;
  }

  validateStatement(context) {
    let statementValidates = false;

    const combinatorString = this.getString();  ///

    context.trace(`Validating the '${combinatorString}' combinator's statement...`);

    const statementValidatesAsCombinator = validateStatementAsCombinator(this.statement, context);

    if (statementValidatesAsCombinator) {
      statementValidates = true;
    }

    if (statementValidates) {
      context.debug(`...validated the '${combinatorString}' combinator's statement.`);
    }

    return statementValidates;
  }

  unifyStatement(statement, context) {
    let statementUnifies = false;

    const statementString = statement.getString(),
          combinatorString = this.getString();  ///

    context.trace(`Unifying the '${statementString}' statement with the '${combinatorString}' combinator...`);

    const combinator = this, ///
          combinatorContext = combinator.getContext(),
          generalContext = combinatorContext, ///
          specifiContext = context, ///
          statementUnifiesWithCombinator = unifyStatementWithCombinator(statement, combinator, generalContext, specifiContext);

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
