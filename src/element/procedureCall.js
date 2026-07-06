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
    const substitutions = context.getSubstitutions(),
          values = this.parameters.map((parameter) => {
            const value = parameter.findValue(substitutions);

            return value;
          });

    return values;
  }

  validate(context) {
    let validates = false;

    const procedureCallString = this.getString(); ///

    context.trace(`Validating the '${procedureCallString}' procedure call...`);

    const procedureName = this.getProcedureName(),
          procedure = context.findProcedureByProcedureName(procedureName);

    if (procedure !== null) {
      const procedureBoolean = procedure.isBoolean();

      if (procedureBoolean) {
        validates = true;
      } else {
        context.debug(`The '${procedureCallString}' procedure is not boolean.`);
      }
    } else {
      context.debug(`The '${procedureCallString}' procedure is not present.`);
    }

    if (validates) {
      context.debug(`...validated the '${procedureCallString}' procedure call.`);
    }

    return validates;
  }

  async unifyIndependently(context) {
    let unifiesIndependently = false;

    const procedureCallString = this.getString(); ///

    context.trace(`Unifying the '${procedureCallString}' procedure call independently...`);

    const procedureName = this.getProcedureName(),
          procedure = context.findProcedureByProcedureName(procedureName),
          values = this.findValues(context);

    let term = null;

    try {
      term = await procedure.callNominally(values);
    } catch (exception) {
      const message = exception.getMessage();

      context.info(message);
    }

    if (term !== null) {
      const boolean = term.isBoolean();

      if (!boolean) {
        context.info(`The '${procedureCallString}' procedure call did not return a boolean.`);
      } else {
        const primitiveValue = term.getPrimitiveValue();

        if (primitiveValue) {
          unifiesIndependently = true;
        }
      }
    }

    if (unifiesIndependently) {
      context.debug(`...unified the '${procedureCallString}' procedure call independently.`);
    }

    return unifiesIndependently;
  }

  async dischargeGivenTerm(term, context) {
    let dischargedGivenTerm = false;

    const termString = term.getString(),
          procedureCallString = this.getString(); ///

    context.trace(`Discharging the '${procedureCallString}' procedure call given the '${termString}' term...`);

    const unary = this.isUnary();

    if (!unary) {
      const procedureName = this.getProcedureName(),
            procedure = context.findProcedureByProcedureName(procedureName),
            value = Value.fromTerm(term, context),
            values = [
              value
            ];

      term = null;

      try {
        term = await procedure.callNominally(values);
      } catch (exception) {
        const message = exception.getMessage();

        context.info(message);
      }

      if (term !== null) {
        const boolean = term.isBoolean();

        if (!boolean) {
          context.info(`The '${procedureCallString}' procedure call did not return a boolean.`);
        } else {
          const primitiveValue = term.getPrimitiveValue();

          if (primitiveValue) {
            dischargedGivenTerm = true;
          }
        }
      }
    } else {
      context.debug(`The '${procedureCallString}' procedure call is not unary.`);
    }

    if (dischargedGivenTerm) {
      context.debug(`...discharged the '${procedureCallString}' procedure call given the '${termString}' term.`);
    }

    return dischargedGivenTerm;
  }

  static name = "ProcedureCall";

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

  static fromJSON(json, context) {
    return instantiate((context) => {
      const { string } = json,
            procedureCallNode = instantiateProcedureCall(string, context),
            node = procedureCallNode,  ///
            breakPoint = breakPointFromJSON(json),
            parameters = parametersFromProcedureCallNode(json, context),
            procedureReference = procedureReferenceFromProcedureCallNode(json, context);

      context = null;

      const procedureCall = new ProcedureCall(context, string, node, breakPoint, parameters, procedureReference);

      return procedureCall;
    }, context);
  }
});
