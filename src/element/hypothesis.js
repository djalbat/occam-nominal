"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { all } from "../utilities/continuation";
import { define } from "../elements";
import { declare } from "../utilities/state";
import { instantiateHypothesis } from "../process/instantiate";
import {attempt, serialise, unserialise, instantiate, enclose} from "../utilities/context";
import { statementFromHypothesisNode, procedureCallFromHypothesisNode } from "../utilities/element";

const { asynchronousAll } = continuationUtilities,
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

  verify = breakable(function (context, continuation) {
    let verifies = false;

    const hypothesisString = this.getString(); ///

    context.trace(`Verifying the '${hypothesisString}' hypothesis...`);

    const malformed = this.isMalformed();

    if (malformed) {
      context.debug(`Unable to verify the '${hypothesisString}' hypothesis because it is malformed.`);

      return continuation(verifies, context);
    }

    declare((state) => {
      const validates = this.validate(state, context, (conclusion, context) => true);

      if (validates) {
        verifies = true;
      }
    });

    if (verifies) {
      context.debug(`...verified the '${hypothesisString}' hypothesis.`);
    }

    return continuation(verifies, context);
  });

  discharge = breakable(function (context, continuation) {
    const hypothesisString = this.getString(); ///

    context.trace(`Discharging the '${hypothesisString}' hypothesis...`);

    const dischargeStatement = this.dischargeStatement.bind(this);

    return asynchronousAll([
      dischargeStatement
    ], context, (discharges) => {
      if (discharges) {
        context.debug(`...discharged the '${hypothesisString}' hypothesis.`);
      }

      return continuation(discharges, context);
    });
  });

  validate(state, context, continuation) {
    let validates;

    const hypothesisString = this.getString(),
          specificContext = context; ///

    context.trace(`Validating the '${hypothesisString}' hypothesis...`);

    const hypothesis = this;  ///

    attempt((context) => {
      const validateStatement = this.validateStatement.bind(this),
            validateProcedureCall = this.validateProcedureCall.bind(this);

      validates = all([
        validateStatement,
        validateProcedureCall
      ], state, context, (state, context) => {
        let validates;

        this.commit(context);

        context = specificContext;  ///

        validates = continuation(hypothesis, context);

        return validates;
      });
    }, context);

    context = specificContext;  ///

    if (validates) {
      context.debug(`...validated the '${hypothesisString}' hypothesis.`);
    }

    return validates;
  }

  validateStatement(state, context, continuation) {
    let statementValidates;

    if (this.statement !== null) {
      const hypothesisString = this.getString();  ///

      context.trace(`Validating the '${hypothesisString}' hypothesis's statement...`);

      statementValidates = this.statement.validate(state, context, (statement, context) => {
        let validates;

        this.statement = statement;

        validates = continuation(state, context);

        return validates;
      });

      if (statementValidates) {
        context.trace(`...validated the '${hypothesisString}' hypothesis's statement.`);
      }
    } else {
      statementValidates = continuation(state, context);
    }

    return statementValidates;
  }

  validateProcedureCall(state, context, continuation) {
    let procedureCallValidates;

    if (this.procedureCall !== null) {
      const resolutionString = this.getString();  ///

      context.trace(`Validating the '${resolutionString}' resolution's procedure call...`);

      procedureCallValidates = this.procedureCall.validate(state, context, (procedureCall, context) => {
        let validates;

        this.procedureCall = procedureCall;

        validates = continuation(state, context);

        return validates;
      });

      if (procedureCallValidates) {
        context.trace(`...validated the '${resolutionString}' resolution's procedure call.`);
      }
    } else {
      procedureCallValidates = continuation(state, context);
    }

    return procedureCallValidates;
  }

  dischargeStatement(context, continuation) {
    if (this.statement === null) {
      const statementDischarges = true;

      return continuation(statementDischarges, context);
    }

    const hypothesisString = this.getString();

    context.trace(`Discharging the '${hypothesisString}' hypothesis's statement...`);

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

  // dischargeGivenTerm(term, context) {
  //   let dischargesGivenTerm = false;
  //
  //   debugger
  //
  //   const termString = term.getString(),
  //         hypothesisString = this.getString(); ///
  //
  //   context.trace(`Discharging the '${hypothesisString}' hypothesis given the '${termString}' term...`);
  //
  //   const procedureCallDischargesGivenTerm = this.dischargeProcedureCallGivenTerm(term, context);
  //
  //   if (procedureCallDischargesGivenTerm) {
  //     dischargesGivenTerm = true;
  //   }
  //
  //   if (dischargesGivenTerm) {
  //     context.debug(`...discharged the '${hypothesisString}' hypothesis given the '${termString}' term.`);
  //   }
  //
  //   return dischargesGivenTerm;
  // }

  // dischargeProcedureCallGivenTerm(term, context) {
  //   let procedureCallDischarges = false;
  //
  //   if (this.procedureCall !== null) {
  //     const termString = term.getString(),
  //           hypothesisString = this.getString();
  //
  //     context.trace(`Discharging the '${hypothesisString}' hypothesis's procedure call given the '${termString}' term...`);
  //
  //     const discharges = this.procedureCall.dischargeGivenTerm(term, context);  ///
  //
  //     if (discharges) {
  //       procedureCallDischarges = true;
  //     }
  //
  //     if (procedureCallDischarges) {
  //       context.debug(`...discharged the '${hypothesisString}' hypothesis' procedure call given the '${termString}' term.`);
  //     }
  //   }
  //
  //   return procedureCallDischarges;
  // }

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
