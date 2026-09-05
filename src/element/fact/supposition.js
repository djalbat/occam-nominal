"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Fact from "../fact";

import { define } from "../../elements";
import { declare } from "../../utilities/state";
import { instantiateSupposition } from "../../process/instantiate";
import { isolate, attempt, reconcile, serialise, unserialise, instantiate } from "../../utilities/context";

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
      return this.validate(state, context, (supposition, context, back) => {
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

  apply = breakable(function (factOrSubproof, context, forward, back) {
    forward = cut(forward, back); ///

    const suppositionString = this.getString(), ///
          factOrSubproofString = factOrSubproof.getString();

    context.trace(`Applying the '${suppositionString}' supposition to the '${factOrSubproofString}' fact or subproof...`);

    const unifyFact = this.unifyFact.bind(this),
          unifySubproof = this.unifySubproof.bind(this);

    return all([
      unifyFact,
      unifySubproof
    ], factOrSubproof, context, (factOrSubproof, context, back) => {
      context.debug(`...applied the '${suppositionString}' supposition to the '${factOrSubproofString}' fact or subproof.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to apply the '${suppositionString}' supposition to the '${factOrSubproofString}' fact or subproof.`);

      return back();
    });
  });

  applyIndependently = breakable( function(context, forward, back) {
    forward = cut(forward, back); ///

    const suppositionString = this.getString(); ///

    context.trace(`Applying the '${suppositionString}' supposition independently...`);

    const applyStatementIndependently = this.applyStatementIndependently.bind(this),
          applyProcedureReferenceIndependently = this.applyProcedureReferenceIndependently.bind(this);

    return all([
      applyStatementIndependently,
      applyProcedureReferenceIndependently
    ], context, (context , back) => {
      context.debug(`...applied the '${suppositionString}' supposition independently.`);

      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to apply the '${suppositionString}' supposition independently.`);

      return back();
    });
  });

  validate(state, context, forward, back) {
    const suppositionString = this.getString(); ///

    context.trace(`Validating the '${suppositionString}' supposition...`);

    return isolate((state, context, forward, back) => {
      return attempt((context) => {
        const validateStatement = this.validateStatement.bind(this),
              validateProcedureReference = this.validateProcedureReference.bind(this);

        return all([
          validateStatement,
          validateProcedureReference
        ], state, context, (state, context, back) => {
          this.commit(context);

          return forward(back);
        }, back);
      }, context);
    }, state, context, (state, context, back) => {
      const supposition = this; ///

      context.debug(`...validated the '${suppositionString}' supposition.`);

      return forward(supposition, context, back);
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
    let json;

    const context = this.getContext();

    serialise((context) => {
      const string = this.getString();

      let breakPoint;

      breakPoint = this.getBreakPoint();

      const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

      breakPoint = breakPointJSON;  ///

      json = {
        context,
        string,
        breakPoint
      };
    }, context);

    return json;
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
              reference = referenceFromSuppositionNode(suppositionNode, context),
              statement = statementFromSuppositionNode(suppositionNode, context),
              procedureReference = procedureReferenceFromSuppositionNode(suppositionNode, context);

        supposition = new Supposition(context, string, node, breakPoint, reference, statement, procedureReference);
      }, json, context);
    }, context);

    return supposition;
  }
});

function referenceFromSuppositionNode(suppositionNode, context) {
  const reference = null;

  return reference;
}

function statementFromSuppositionNode(suppositionNode, context) {
  const statementNode = suppositionNode.getStatementNode(),
        statement = context.findStatementByStatementNode(statementNode);

  return statement;
}

function procedureReferenceFromSuppositionNode(suppositionNode, context) {
  const procedureReferenceNode = suppositionNode.getProcedureReferenceNode(),
        procedureReference = context.findProcedureReferenceByProcedureReferenceNode(procedureReferenceNode);

  return procedureReference;
}
