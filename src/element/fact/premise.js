"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Fact from "../fact";

import { define } from "../../elements";
import { declare } from "../../utilities/state";
import { instantiatePremise } from "../../process/instantiate";
import { referenceFromPremiseNode, procedureCallFromPremiseNode } from "../../utilities/element";
import { attempt, reconcile, serialise, unserialise, instantiate } from "../../utilities/context";

const { cut, all } = continuationUtilities,
      { breakable, breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Premise extends Fact {
  getPremiseNode() {
    const node = this.getNode(),
          premiseNode = node; ///

    return premiseNode;
  }

  getStatementNode() {
    const premiseNode = this.getPremiseNode(),
          statementNode = premiseNode.getStatementNode();

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
    const premiseNode = this.getPremiseNode(),
          malformed = premiseNode.isMalformed();

    return malformed;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const premiseString = this.getString(); ///

    context.trace(`Verifying the '${premiseString}' premise...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.trace(`Unable to verify the '${premiseString}' premise because it is malformed.`);

      return back();
    }

    return declare((state) => {
      return this.validate(state, context, (premise, _, back) => {
        context.debug(`...verified the '${premiseString}' premise.`);

        return forward(context, back);
      }, (exception) => {
        if (exception) {
          return back(exception);
        }

        context.trace(`Unable to verify the '${premiseString}' premise.`);

        return back();
      });
    });
  });

  unifyIndependently = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const premiseString = this.getString(); ///

    context.trace(`Unifying the '${premiseString}' premise independently...`);

    return reconcile((context) => {
      const unifyStatementIndependently = this.unifyStatementIndependently.bind(this),
            unifyProcedureCallIndependently = this.unifyProcedureCallIndependently.bind(this);

      return all([
        unifyStatementIndependently,
        unifyProcedureCallIndependently
      ], context, ( _ , back) => {
        context.debug(`...unified the '${premiseString}' premise independently.`);

        return forward(context, back);
      }, (exception) => {
        if (exception) {
          return back(exception);
        }

        context.trace(`Unable to Unify the '${premiseString}' premise independently.`);

        return back();
      });
    }, context);
  });

  unifyFactOrSubproof = breakable(function (factOrSubproof, context, forward, back) {
    forward = cut(forward, back); ///

    const premiseString = this.getString(), ///
          factOrSubproofString = factOrSubproof.getString();

    context.trace(`Unifying the '${factOrSubproofString}' fact or subproof with the '${premiseString}' premise...`);

    const unifyFact = this.unifyFact.bind(this),
          unifySubproof = this.unifySubproof.bind(this);

    return all([
      unifyFact,
      unifySubproof
    ], factOrSubproof, context, (factOrSubproof, context, back) => {
      return forward(context, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to unify the '${factOrSubproofString}' fact or subproof with the '${premiseString}' premise.`);

      return back();
    });
  });

  validate(state, context, forward, back) {
    const premiseString = this.getString(); ///

    context.trace(`Validating the '${premiseString}' premise...`);

    return attempt((context) => {
      const validateStatement = this.validateStatement.bind(this),
            validateProcedureCall = this.validateProcedureCall.bind(this);

      return all([
        validateStatement,
        validateProcedureCall
      ], state, context, (state, context, back) => {
        const premise = this; ///

        this.commit(context);

        context.debug(`...validated the '${premiseString}' premise.`);

        return forward(premise, context, back);
      }, back);
    }, context);
  }

  unifyFact(factOrSubproof, context, forward, back) {
    const factOrSubproofFact = factOrSubproof.isFact();

    if (factOrSubproofFact) {
      return forward(factOrSubproof, context, back);
    }

    const fact = factOrSubproof,
          factString = fact.getString(),
          premiseString = this.getString(); ///

    context.trace(`Unifying the '${factString}' fact with the '${premiseString}' premise...`);

    const factContext = fact.getContext(),
          premiseContext = this.getContext(), ///
          generalContext = premiseContext, ///
          specificContext = factContext;  ///

    return reconcile((specificContext) => {
      const statement = fact.getStatement();

      return this.unifyStatement(statement, generalContext, specificContext, (generalContext, specificContext, back) => {
        specificContext.commit(context);

        context.debug(`...unified the '${factString}' fact with the '${premiseString}' premise.`);

        return forward(context, back);
      }, back);
    }, specificContext);
  }

  unifySubproof(factOrSubproof, context, forward, back) {
    const factOrSubproofSubproof = factOrSubproof.isBubproof();

    if (factOrSubproofSubproof) {
      return forward(factOrSubproof, context, back);
    }

    const subproof = factOrSubproof,  ///
          premiseString = this.getString(), ///
          subproofString = subproof.getString();

    context.trace(`Unifying the '${subproofString}' subproof with the '${premiseString}' premise...`);

    const subproofAssertion = this.findSubproofAssertion();

    if (subproofAssertion === null) {
      return back();
    }

    const premiseContext = this.getContext(), ///
          generalContext = premiseContext, ///
          specificContext = context;  ///

    return reconcile((context) => {
      return subproofAssertion.unifySubproof(subproof, generalContext, specificContext, (generalContext, specificContext, back) => {
        specificContext.commit(context);

        context.debug(`...unified the '${subproofString}' subproof with the '${premiseString}' premise.`);

        return forward(context, back);
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

  static name = "Premise";

  static fromJSON(json, context) {
    let premise;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              premiseNode = instantiatePremise(string, context),
              node = premiseNode,  ///
              breakPoint = breakPointFromJSON(json),
              statement = statementFromPremiseNode(premiseNode, context),
              reference = referenceFromPremiseNode(premiseNode, context),
              procedureCall = procedureCallFromPremiseNode(premiseNode, context);

        premise = new Premise(context, string, node, breakPoint, statement, reference, procedureCall);
      }, json, context);
    }, context);

    return premise;
  }
});

function statementFromPremiseNode(premiseNode, context) {
  const statementNode = premiseNode.getStatementNode(),
        statement = context.findStatementByStatementNode(statementNode);

  return statement;
}
