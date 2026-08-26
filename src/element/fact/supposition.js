"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Fact from "../fact";

import { define } from "../../elements";
import { declare } from "../../utilities/state";
import { instantiateSupposition } from "../../process/instantiate";
import { attempt, reconcile, serialise, unserialise, instantiate } from "../../utilities/context";
import { referenceFromSuppositionNode, procedureCallFromSuppositionNode } from "../../utilities/element";

const { cut, all } = continuationUtilities,
      { breakable, breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Supposition extends Fact {
  getSuppositionNode() {
    const node = this.getNode(),
          suppositionNode = node; ///

    return suppositionNode;
  }

  getStatementNode() {
    const suppositionNode = this.getSuppositionNode(),
          statementNode = suppositionNode.getStatementNode();

    return statementNode;
  }

  findSubproofAssertion() {
    let subproofAssertion = null;

    const statementNode = this.getStatementNode();

    if (statementNode !== null) {
      const subproofAssertionNode = statementNode.getSubproofAssertionNode();

      if (subproofAssertionNode !== null) {
        const context = this.getContext();

        subproofAssertion = context.findAssertionByAssertionNode(subproofAssertionNode);
      }
    }

    return subproofAssertion;
  }

  isMalformed() {
    const suppositionNode = this.getSuppositionNode(),
          malformed = suppositionNode.isMalformed();

    return malformed;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const suppositionString = this.getString(); ///

    context.trace(`Verifying the '${suppositionString}' supposition...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.debug(`Unable to verify the '${suppositionString}' supposition because it is malformed.`);

      return back();
    }

    return declare((state) => {
      return this.validate(state, context, (supposition, _, back) => {
        context.debug(`...verified the '${suppositionString}' supposition.`);

        return forward(context, back);
      }, back);
    });
  });

  validate(state, context, forward, back) {
    const suppositionString = this.getString(); ///

    context.trace(`Validating the '${suppositionString}' supposition...`);

    return attempt((context) => {
      const validateStatement = this.validateStatement.bind(this),
            validateProcedureCall = this.validateProcedureCall.bind(this);

      return all([
        validateStatement,
        validateProcedureCall
      ], state, context, (state, context, back) => {
        const supposition = this; ///

        this.commit(context);

        context.debug(`...validated the '${suppositionString}' supposition.`);

        return forward(supposition, context, back);
      }, back);
    }, context);
  }

  unifyIndependently(context, forward, back) {
    forward = cut(forward, back); ///

    const suppositionString = this.getString(); ///

    context.trace(`Unifying the '${suppositionString}' supposition independently...`);

    return reconcile((context) => {
      const unifyStatementIndependently = this.unifyStatementIndependently.bind(this),
            unifyProcedureCallIndependently = this.unifyProcedureCallIndependently.bind(this);

      return all([
        unifyStatementIndependently,
        unifyProcedureCallIndependently
      ], context, ( _ , back) => {
        context.debug(`...unified the '${suppositionString}' supposition independently.`);

        return forward(context, back);
      }, back);
    }, context);
  }

  unifyFact(fact, context, forward, back) {
    const factString = fact.getString(),
          suppositionString = this.getString(); ///

    context.trace(`Unifying the '${factString}' fact with the '${suppositionString}' supposition...`);

    const factContext = fact.getContext(),
          suppositionContext = this.getContext(), ///
          generalContext = suppositionContext, ///
          specificContext = factContext;  ///

    return reconcile((specificContext) => {
      const statement = fact.getStatement();

      return this.unifyStatement(statement, generalContext, specificContext, (generalContext, specificContext, back) => {
        specificContext.commit(context);

        context.debug(`...unified the '${factString}' fact with the '${suppositionString}' supposition.`);

        return forward(context, back);
      }, back);
    }, specificContext);
  }

  unifySubproof(subproof, context, forward, back) {
    const suppositionString = this.getString(), ///
          subproofString = subproof.getString();

    context.trace(`Unifying the '${subproofString}' subproof with the '${suppositionString}' supposition...`);

    const subproofAssertion = this.findSubproofAssertion();

    if (subproofAssertion === null) {
      return back();
    }

    const suppositionContext = this.getContext(), ///
      generalContext = suppositionContext, ///
      specificContext = context;  ///

    return reconcile((context) => {
      return subproofAssertion.unifySubproof(subproof, generalContext, specificContext, (generalContext, specificContext, back) => {
        specificContext.commit(context);

        context.debug(`...unified the '${subproofString}' subproof with the '${suppositionString}' supposition.`);

        return forward(context, back);
      }, back);
    }, context);
  }

  unifyFactOrSubproof(factOrSubproof, context, forward, back) {
    forward = cut(forward, back); ///

    const factOrSubproofFact = factOrSubproof.isFact();

    if (factOrSubproofFact) {
      const fact = factOrSubproof;  ///

      return this.unifyFact(fact, context, forward, back);
    }

    const subproof = factOrSubproof;  ///

    return this.unifySubproof(subproof, context, forward, back);
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

  static name = "Supposition";

  static fromJSON(json, context) {
    let supposition;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              suppositionNode = instantiateSupposition(string, context),
              node = suppositionNode,  ///
              breakPoint = breakPointFromJSON(json),
              statement = statementFromSuppositionNode(suppositionNode, context),
              reference = referenceFromSuppositionNode(suppositionNode, context),
              procedureCall = procedureCallFromSuppositionNode(suppositionNode, context);

        supposition = new Supposition(context, string, node, breakPoint, statement, reference, procedureCall);
      }, json, context);
    }, context);

    return supposition;
  }
});

function statementFromSuppositionNode(suppositionNode, context) {
  const statementNode = suppositionNode.getStatementNode(),
    statement = context.findStatementByStatementNode(statementNode);

  return statement;
}
