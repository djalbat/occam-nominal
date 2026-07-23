"use strict";

import { breakPointUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { exists } from "../../utilities/continuation";
import { instantiate } from "../../utilities/context";
import { instantiateTypeAssertion } from "../../process/instantiate";
import { typeFromJSON, typeToTypeJSON } from "../../utilities/json";
import { termFromTermAndSubstitutions } from "../../utilities/substitutions";
import { variableAssignmentFromTypeAssertion } from "../../process/assign";
import { termFromTypeAssertionNode, typeAssertionFromStatementNode } from "../../utilities/element";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class TypeAssertion extends Assertion {
  constructor(context, string, node, breakPoint, term, type) {
    super(context, string, node, breakPoint);

    this.term = term;
    this.type = type;
  }

  getTerm() {
    return this.term;
  }

  getType() {
    return this.type;
  }

  getTypeAssertionNBode() {
    const node = this.getNode(),
          typeAssertionNode = node; ///

    return typeAssertionNode;
  }

  validate(callback, context, continuation) {
    const typeAssertionString = this.getString();  ///

    context.trace(`Validating the '${typeAssertionString}' type assertion...`);

    const validAssertion = this.findValidAssertion(context);

    if (validAssertion !== null) {
      const typeAssertion = validAssertion; ///

      context.debug(`...the '${typeAssertionString}' type assertion is already valid.`);

      return callback(typeAssertion, context, continuation);
    }

    return this.validateType(context, (typeValidates, context) => {
      if (!typeValidates) {
        const typeAssertion = null;

        return callback(typeAssertion, context, continuation);
      }

      const validateWhenStated = this.validateWhenStated.bind(this),
            validateWhenDerived = this.validateWhenDerived.bind(this);

      return exists([
        validateWhenStated,
        validateWhenDerived
      ], callback, context, (validates, context) => {
        let typeAssertion = null;

        if (validates) {
          const assertion = this; ///

          typeAssertion = assertion;  ///

          this.assign(context);

          context.addAssertion(assertion);
        }

        if (validates) {
          context.debug(`...verified the '${typeAssertionString}' type assertion.`);
        }

        return continuation(typeAssertion, context);
      });
    });
  }

  discharge(context) {
    let discharges = false;

    const typeAssertionString = this.getString();  ///

    context.trace(`Discharging the '${typeAssertionString}' type assertion...`);

    const term = termFromTermAndSubstitutions(this.term, context);

    if (term !== null) {
      const termType = term.getType(),
            typeEqualToTermType = this.type.isEqualTo(termType);

      if (typeEqualToTermType) {
        const termEstablished = term.isEstablished();

        if (termEstablished) {
          discharges = true;
        }
      }
    }

    if (discharges) {
      context.debug(`...discharged the '${typeAssertionString}' type assertion.`);
    }

    return discharges;
  }

  validateType(context, continuation) {
    let typeValidates = false;

    const typeAssertionString = this.getString();  ///

    context.trace(`Validating the '${typeAssertionString}' type assertion's type...`);

    const nominalTypeName = this.type.getNominalTypeName(),
          type = context.findTypeByNominalTypeName(nominalTypeName);

    if (type !== null) {
      this.type = type;

      typeValidates = true;
    } else {
      const typeString = this.type.getString();

      context.debug(`The '${typeString}' type is not present.`);
    }

    if (typeValidates) {
      context.debug(`...validated the '${typeAssertionString}' type assertion's type.`);
    }

    return continuation(typeValidates, context);
  }

  validateWhenStated(callback, context, continuation) {
    const stated = context.isStated();

    if (!stated) {
      const validatesWhenStated = false;

      return continuation(validatesWhenStated, callback, context);
    }

    const typeAssertionString = this.getString(); ///

    context.trace(`Validating the '${typeAssertionString}' stated type assertion...`);

    return this.term.validate((term, context, continuation) => {
      let validatesWhenStated = false;

      const termType = term.getType(),
            termTypeEqualToType = termType.isEqualTo(this.type),
            termTypeSuperTypeOfType = termType.isSuperTypeOf(this.type);

      if (false) {
        ///
      } else if (termTypeEqualToType) {
        validatesWhenStated = true;
      } else if (termTypeSuperTypeOfType) {
        const termEstablished = term.isEstablished();

        if (termEstablished) {
          validatesWhenStated = true;
        }
      }

      if (!validatesWhenStated) {
        return continuation(validatesWhenStated, callback, context);
      }

      this.term = term;

      const typeAssertion = this; ///

      if (validatesWhenStated) {
        context.debug(`...validated the '${typeAssertionString}' stated type assertion.`);
      }

      return callback(typeAssertion, context, continuation);
    }, context, continuation);
  }

  validateWhenDerived(callback, context, continuation) {
    const stated = context.isStated();

    if (stated) {
      const validatesWhenDerived = false;

      return continuation(validatesWhenDerived, context, callback);
    }

    const typeAssertionString = this.getString(); ///

    context.trace(`Validating the '${typeAssertionString}' derived type assertion...`);

    validateWhenDerived(this.term, this.type, context, (term, context) => {
      let validatesWhenDerived = false;

      if (term !== null) {
        validatesWhenDerived = true;
      }

      if (validatesWhenDerived) {
        this.term = term;
      }

      if (validatesWhenDerived) {
        context.debug(`...validated the '${typeAssertionString}' derived type assertion.`);
      }

      return continuation(validatesWhenDerived, context);
    });
  }

  unifyIndependently(generalContext, specificContext) {

    debugger

    let unifiesIndependently = false;

    const context = specificContext, ///
          typeAssertionString = this.getString(); ///

    context.trace(`Unifying the '${typeAssertionString}' type assertion independently...`);

    let term;

    term = termFromTermAndSubstitutions(this.term, context);

    term = validateWhenDerived(term, this.type, context); //

    if (term !== null) {
      unifiesIndependently = true;
    }

    if (unifiesIndependently) {
      context.debug(`...unified the '${typeAssertionString}' type assertion independently.`);
    }

    return unifiesIndependently;
  }

  assign(context) {
    const stated = context.isStated();

    if (!stated) {
      return;
    }

    const typeAssertion = this, ///
          variableAssigment = variableAssignmentFromTypeAssertion(typeAssertion, context);

    context.addAssignment(variableAssigment);
  }

  toJSON() {
    const typeJSON = typeToTypeJSON(this.type),
          name = this.getName(),
          string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const type = typeJSON,
          json = {
            name,
            string,
            breakPoint,
            type
          };

    return json;
  }

  static name = "TypeAssertion";

  static fromJSON(json, context) {
    let typeAssertion = null;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        const { string } = json,
              typeAssertionNode = instantiateTypeAssertion(string, context),
              node = typeAssertionNode, ///
              breakPoint = breakPointFromJSON(json),
              term = termFromTypeAssertionNode(typeAssertionNode, context),
              type = typeFromJSON(json, context);

        context = null;

        typeAssertion = new TypeAssertion(context, string, node, breakPoint, term, type);
      }, context);
    }

    return typeAssertion;
  }

  static fromStatement(statement, context) {
    const statementNode = statement.getNode(),
          typeAssertion = typeAssertionFromStatementNode(statementNode, context);

    return typeAssertion;
  }
});

function validateWhenDerived(term, type, context, continuation) {
  if (term === null) {
    return continuation(term, context);
  }

  return term.validate((term, context, continuation) => {
    let termValidates = false;

    const termType = term.getType(),
          termTypeEqualToOrSubTypeOfType = termType.isEqualToOrSubTypeOf(type);

    if (termTypeEqualToOrSubTypeOfType) {
      const termEstablished = term.isEstablished();

      if (termEstablished) {
        termValidates = true;
      }
    }

    if (!termValidates) {
      term = null;
    }

    return continuation(term, context);
  }, context, continuation);
}
