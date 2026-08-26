"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import Value from "../value";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateProcedureCall } from "../process/instantiate";
import { parametersFromProcedureCallNode, procedureReferenceFromProcedureCallNode } from "../utilities/element";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class ProcedureCall extends Element {
  constructor(context, string, node, breakPoint, parameters, procedureReference) {
    super(context, string, node, breakPoint);

    this.parameters = parameters;
    this.procedureReference = procedureReference;
  }

  getParameters() {
    return this.parameters;
  }

  getProcedureReference() {
    return this.procedureReference;
  }

  getProcedureCallNode() {
    const node = this.getNode(),
          procedureCallNode = node;

    return procedureCallNode;
  }

  getProcedureName() { return this.procedureReference.getProcedureName(); }

  isUnary() {
    const parametersLength = this.parameters.length,
          unary = (parametersLength === 1);

    return unary;
  }

  findValues(context) {
    const inferredSubstitutions = context.getInferredSubstitutions(),
          substitutions = inferredSubstitutions, ///
          values = this.parameters.map((parameter) => {
            const value = parameter.findValue(substitutions);

            return value;
          });

    return values;
  }

  validate(state, context, forward, back) {
    const procedureCallString = this.getString(); ///

    context.trace(`Validating the '${procedureCallString}' procedure call...`);

    const procedureName = this.getProcedureName(),
          procedure = context.findProcedureByProcedureName(procedureName);

    if (procedure === null) {
      context.debug(`The '${procedureCallString}' procedure is not present.`);

      return back();
    }

    const procedureBoolean = procedure.isBoolean();

    if (!procedureBoolean) {
      context.debug(`The '${procedureCallString}' procedure is not boolean.`);

      return back();
    }

    const procedureCall = this; ///

    context.debug(`...validated the '${procedureCallString}' procedure call.`);

    return forward(procedureCall, context, back);
  }

  unifyIndependently(generalContext, specificContext, forward, back) {
    const context = specificContext,
          procedureCallString = this.getString(); ///

    context.trace(`Unifying the '${procedureCallString}' procedure call independently...`);

    const procedureName = this.getProcedureName(),
          procedure = context.findProcedureByProcedureName(procedureName),
          values = this.findValues(context);

    return procedure.callNominally(values, (value, back) => {
      const boolean = value.isBoolean();

      if (!boolean) {
        context.info(`The '${procedureCallString}' procedure call did not return a boolean.`);

        return back();
      }

      const primitiveValue = value.getPrimitiveValue();

      if (!primitiveValue) {
        return back();
      }

      context.trace(`...unified the '${procedureCallString}' procedure call independently.`);

      return forward(generalContext, specificContext, back);
    }, back);
  }

  dischargeGivenTerm(term, context, forward, back) {
    const termString = term.getString(),
          procedureCallString = this.getString(); ///

    context.trace(`Discharging the '${procedureCallString}' procedure call given the '${termString}' term...`);

    const unary = this.isUnary();

    if (!unary) {
      context.debug(`The '${procedureCallString}' procedure call is not unary.`);

      return back();
    }

    const procedureName = this.getProcedureName(),
          procedure = context.findProcedureByProcedureName(procedureName),
          value = Value.fromTerm(term, context),
          values = [
            value
          ];

    return procedure.callNominally(values, (value, back) => {
      const boolean = value.isBoolean();

      if (!boolean) {
        context.info(`The '${procedureCallString}' procedure call did not return a boolean.`);

        return back();
      }

      const primitiveValue = value.getPrimitiveValue();

      if (!primitiveValue) {
        return back();
      }

      context.debug(`...discharged the '${procedureCallString}' procedure call given the '${termString}' term.`);

      return forward(back);
    }, back);
  }

  toJSON() {
    const string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const json = {
      string,
      breakPoint
    };

    return json;
  }

  static name = "ProcedureCall";

  static fromJSON(json, context) {
    let procedureCall;

    instantiate((context) => {
      const { string } = json,
            procedureCallNode = instantiateProcedureCall(string, context),
            node = procedureCallNode,  ///
            breakPoint = breakPointFromJSON(json),
            parameters = parametersFromProcedureCallNode(json, context),
            procedureReference = procedureReferenceFromProcedureCallNode(json, context);

      context = null;

      procedureCall = new ProcedureCall(context, string, node, breakPoint, parameters, procedureReference);
    }, context);

    return procedureCall;
  }
});
