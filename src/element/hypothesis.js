"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { declare } from "../utilities/state";
import { instantiateHypothesis } from "../process/instantiate";
import { isolate, attempt, serialise, unserialise, instantiate } from "../utilities/context";
import { statementFromHypothesisNode, procedureCallFromHypothesisNode } from "../utilities/element";

const { cut, all } = continuationUtilities,
      { breakable, breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Hypothesis extends Element {
  constructor(context, string, node, breakPoint, statement, procedureCall) {
    super(context, string, node, breakPoint);

    this.statement = statement;
    this.procedureCall = procedureCall;
  }

  getStatement() {
    return this.statement;
  }

  getProcedureCall() {
    return this.procedureCall;
  }

  getHypothesisNode() {
    const node = this.getNode(),
          hypothesisNode = node;  ///

    return hypothesisNode;
  }

  isMalformed() {
    const hypothesisNode = this.getHypothesisNode(),
          malformed = hypothesisNode.isMalformed();

    return malformed;
  }

  verify = breakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const specificContxt = context, ///
          hypothesisString = this.getString(); ///

    context.trace(`Verifying the '${hypothesisString}' hypothesis...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.trace(`Unable to verify the '${hypothesisString}' hypothesis because it is malformed.`);

      return back();
    }

    declare((state) => {
      return this.validate(state, context, (hypothesis, context, back) => {
        context = specificContxt; ///

        context.debug(`...verified the '${hypothesisString}' hypothesis.`);

        return forward(context, back);
      }, (exception) => {
        if (exception) {
          return back(exception);
        }

        context.trace(`Unable to verify the '${hypothesisString}' hypothesis.`);

        return back();
      });
    });
  });

  discharge = breakable(function (context, forward, back) {
    const hypothesisString = this.getString(); ///

    context.trace(`Discharging the '${hypothesisString}' hypothesis...`);

    const dischargeStatement = this.dischargeStatement.bind(this);

    return all([
      dischargeStatement
    ], context, (discharges) => {
      if (discharges) {
        context.debug(`...discharged the '${hypothesisString}' hypothesis.`);
      }

      return continuation(discharges, context);
    });
  });

  validate(state, context, forward, back) {
    const hypothesisString = this.getString();  ///

    context.trace(`Validating the '${hypothesisString}' hypothesis...`);

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
      const hypothesis = this;  ///

      context.debug(`...validated the '${hypothesisString}' hypothesis.`);

      return forward(hypothesis, context, back);
    }, back);
  }

  validateStatement(state, context, forward, back) {
    if (this.statement === null) {
      return forward(state, context, back);
    }

    const hypothesisString = this.getString();  ///

    context.trace(`Validating the '${hypothesisString}' hypothesis' statement...`);

    return this.statement.validate(state, context, (statement, context, back) => {
      this.statement = statement;

      context.trace(`...validated the '${hypothesisString}' hypothesis' statement.`);

      return forward(state, context, back);
    }, back);
  }

  validateProcedureCall(state, context, forward, back) {
    if (this.procedureCall === null) {
      return forward(state, context, back);
    }

    const hypothesisString = this.getString();  ///

    context.trace(`Validating the '${hypothesisString}' hypothesis' procedure call...`);

    return this.procedureCall.validate(state, context, (procedureCall, context, back) => {
      this.procedureCall = procedureCall;

      context.trace(`...validated the '${hypothesisString}' hypothesis' procedure call.`);

      return forward(state, context, back);
    }, back);
  }

  dischargeStatement(context, forward, back) {
    if (this.statement === null) {
      const statementDischarges = true;

      return continuation(statementDischarges, context);
    }

    const hypothesisString = this.getString();  ///

    context.trace(`Discharging the '${hypothesisString}' hypothesis' statement...`);

    const specificContext = context;  ///

    context = this.getContext();

    const generalCotnext = context; ///

    return this.statement.discharge(generalCotnext, specificContext, (statementDischarges) => {
      context = specificContext;  ///

      if (statementDischarges) {
        context.debug(`...discharged the '${hypothesisString}' hypothesis' statement.`);
      }

      return continuation(statementDischarges, context);
    });
  }

  dischargeGivenTerm(term, context, forward, back) {
    const termString = term.getString(),
          hypothesisString = this.getString(); ///

    context.trace(`Discharging the '${hypothesisString}' hypothesis given the '${termString}' term...`);

    this.dischargeProcedureCallGivenTerm(term, context, (context, back) => {
      context.debug(`...discharged the '${hypothesisString}' hypothesis given the '${termString}' term.`);

      return forward(context, back);
    }, back);
  }

  dischargeProcedureCallGivenTerm(term, context, forward, back) {
    if (this.procedureCall === null) {
      return back();
    }

    const termString = term.getString(),
          hypothesisString = this.getString();  ///

    context.trace(`Discharging the '${hypothesisString}' hypothesis' procedure call given the '${termString}' term...`);

    this.procedureCall.dischargeGivenTerm(term, context, (back) => {
      context.debug(`...discharged the '${hypothesisString}' hypothesis' procedure call given the '${termString}' term.`);

      return forward(context, back);
    }, back);
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

  static name = "Hypothesis";

  static fromJSON(json, context) {
    let hypothesis;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              hypothesisNode = instantiateHypothesis(string, context),
              node = hypothesisNode,  ///
              breakPoint = breakPointFromJSON(json),
              statement = statementFromHypothesisNode(hypothesisNode, context),
              procedureCall = procedureCallFromHypothesisNode(hypothesisNode, context);

        hypothesis = new Hypothesis(context, string, node, breakPoint, statement, procedureCall);
      }, json, context);
    }, context);

    return hypothesis;
  }
});
