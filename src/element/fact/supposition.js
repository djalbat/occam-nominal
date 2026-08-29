"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Fact from "../fact";

import { define } from "../../elements";
import { declare } from "../../utilities/state";
import { instantiateSupposition } from "../../process/instantiate";
import { attempt, reconcile, serialise, unserialise, instantiate } from "../../utilities/context";
import { referenceFromSuppositionNode, procedureCallFromSuppositionNode } from "../../utilities/element";

const { cut, all, isolate } = continuationUtilities,
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

  verify = breakable( function(context, forward, back) {
    forward = cut(forward, back); ///

    const suppositionString = this.getString(); ///

    context.trace(`Verifying the '${suppositionString}' supposition...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.trace(`Unable to verify the '${suppositionString}' supposition because it is malformed.`);

      return back();
    }

    return declare((state) => {
      return this.validate(state, context, (supposition, _, back) => {
        context.debug(`...verified the '${suppositionString}' supposition.`);

        return forward(context, back);
      }, (exception) => {
        if (exception) {
          return back(exception);
        }

        context.trace(`Unable to verify the '${suppositionString}' supposition.`);

        return back();
      });
    });
  });

  unifyIndependently = breakable( function(context, forward, back) {
    forward = cut(forward, back); ///

    const suppositionString = this.getString(); ///

    context.trace(`Unifying the '${suppositionString}' supposition independently...`);

    const unifyStatementIndependently = this.unifyStatementIndependently.bind(this),
          unifyProcedureCallIndependently = this.unifyProcedureCallIndependently.bind(this);

    return all([
      unifyStatementIndependently,
      unifyProcedureCallIndependently
    ], context, (context , back) => {
      context.debug(`...unified the '${suppositionString}' supposition independently.`);

      return forward(context, back);
    }, back);
  });

  unifyFactOrSubproof = breakable(function (factOrSubproof, context, forward, back) {
    forward = cut(forward, back); ///

    const suppositionString = this.getString(), ///
          factOrSubproofString = factOrSubproof.getString();

    context.trace(`Unifying the '${factOrSubproofString}' fact or subproof with the '${suppositionString}' supposition...`);

    const unifyFact = this.unifyFact.bind(this),
          unifySubproof = this.unifySubproof.bind(this);

    return all([
      unifyFact,
      unifySubproof
    ], factOrSubproof, context, (factOrSubproof, context, back) => {
      context.debug(`Unified the '${factOrSubproofString}' fact or subproof with the '${suppositionString}' supposition.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to unify the '${factOrSubproofString}' fact or subproof with the '${suppositionString}' supposition.`);

      return back();
    });
  });

  validate(state, context, forward, back) {
    forward = cut(forward, back); ///

    const suppositionString = this.getString(); ///

    context.trace(`Validating the '${suppositionString}' supposition...`);

    return isolate((state, context, forward, back) => {
      return attempt((context) => {
        const validateStatement = this.validateStatement.bind(this),
              validateProcedureCall = this.validateProcedureCall.bind(this);

        return all([
          validateStatement,
          validateProcedureCall
        ], state, context, (state, context, back) => {
          this.commit(context);

          return forward(back);
        }, back);
      }, context);
    }, state, context, (state, context, back) => {
      context.debug(`...validated the '${suppositionString}' supposition.`);

      return forward(state, context, back);
    }, back);
  }

  unifyFact(factOrSubproof, context, forward, back) {
    const factOrSubproofFact = factOrSubproof.isFact();

    if (!factOrSubproofFact) {
      return forward(factOrSubproof, context, back);
    }

    const fact = factOrSubproof,  ///
          factString = fact.getString(),
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

        return forward(factOrSubproof, context, back);
      }, back);
    }, specificContext);
  }

  unifySubproof(factOrSubproof, context, forward, back) {
    const factOrSubproofSubproof = factOrSubproof.isBubproof();

    if (!factOrSubproofSubproof) {
      return forward(factOrSubproof, context, back);
    }

    const subproof = factOrSubproof,  ///
          suppositionString = this.getString(), ///
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

        return forward(factOrSubproof, context, back);
      }, back);
    }, context);
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
