"use strict";

import { breakPointUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { all, exists } from "../../utilities/continuation";
import { instantiateTypeAssertion } from "../../process/instantiate";
import { typeFromJSON, typeToTypeJSON } from "../../utilities/json";
import { termFromTermAndSubstitutions } from "../../utilities/substitutions";
import { isDerived, isDeclared, isTransient } from "../../utilities/state";
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

  validate(state, context, continuation) {
    let validates;

    const typeAssertionString = this.getString();  ///

    context.trace(`Validating the '${typeAssertionString}' type assertion...`);

    let typeAssertion;

    const assertion = this.findAssertion(context);

    if (assertion !== null) {
      typeAssertion = assertion; ///

      context.debug(`The '${typeAssertionString}' type assertion is already present.`);

      validates = continuation(typeAssertion, context);
    } else {
      typeAssertion = this;

      const validateType = this.validateType.bind(this);

      validates = all([
        validateType
      ], state, context, (state, context) => {
        let validates;

        const validateWhenDeclared = this.validateWhenDeclared.bind(this),
              validateWhenDerived = this.validateWhenDerived.bind(this);

        validates = exists([
          validateWhenDeclared,
          validateWhenDerived
        ], state, context, (state, context) => {
          let validates;

          const assertion = typeAssertion;  ///

          this.assign(state, context);

          context.addAssertion(assertion);

          validates = continuation(typeAssertion, context);

          return validates;
        });

        return validates;
      });
    }

    if (validates) {
      context.debug(`...validated the '${typeAssertionString}' type assertion.`);
    }

    return validates;
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

  validateType(state, context, continuation) {
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
      typeValidates = continuation(state, context);
    }

    if (typeValidates) {
      context.debug(`...validated the '${typeAssertionString}' type assertion's type.`);
    }

    return typeValidates;
  }

  validateWhenDeclared(state, context, continuation) {
    let validatesWhenDeclared = false;

    const declared = isDeclared(state);

    if (declared) {
      const typeAssertionString = this.getString(); ///

      context.trace(`Validating the '${typeAssertionString}' declared type assertion...`);

      validatesWhenDeclared = this.term.validate(state, context, (term, context) => {
        let termValidates = false;

        const termType = term.getType(),
              termTypeEqualToType = termType.isEqualTo(this.type),
              termTypeSuperTypeOfType = termType.isSuperTypeOf(this.type);

        if (false) {
          ///
        } else if (termTypeEqualToType) {
          termValidates = true;
        } else if (termTypeSuperTypeOfType) {
          const termEstablished = term.isEstablished();

          if (termEstablished) {
            termValidates = true;
          }
        }

        if (termValidates) {
          this.term = term;

          termValidates = continuation(state, context);
        }

        return termValidates;
      });

      if (validatesWhenDeclared) {
        context.debug(`...validated the '${typeAssertionString}' declared type assertion.`);
      }
    }

    return validatesWhenDeclared;
  }

  validateWhenDerived(state, context, continuation) {
    let validatesWhenDerived = false;

    const derived = isDerived(state);

    if (derived) {
      const typeAssertionString = this.getString(); ///

      context.trace(`Validating the '${typeAssertionString}' derived type assertion...`);

      validatesWhenDerived = validateWhenDerived(this.term, this.type, context, (term, context) => {
        let validatesWhenDerived;

        this.term = term;

        validatesWhenDerived = continuation(state, context);

        return validatesWhenDerived;
      });

      if (validatesWhenDerived) {
        context.debug(`...validated the '${typeAssertionString}' derived type assertion.`);
      }
    }

    return validatesWhenDerived;
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

  assign(state, context) {
    const transient = isTransient(state);

    if (transient) {
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
    const { name } = json;

    if (this.name !== name) {
      return;
    }

    return instantiate((context) => {
      const { string } = json,
            typeAssertionNode = instantiateTypeAssertion(string, context),
            node = typeAssertionNode, ///
            breakPoint = breakPointFromJSON(json),
            term = termFromTypeAssertionNode(typeAssertionNode, context),
            type = typeFromJSON(json, context);

      context = null;

      const typeAssertion = new TypeAssertion(context, string, node, breakPoint, term, type);

      return typeAssertion;
    }, context);
  }

  static fromStatement(statement, context) {
    const statementNode = statement.getNode(),
          typeAssertion = typeAssertionFromStatementNode(statementNode, context);

    return typeAssertion;
  }
});

function validateWhenDerived(term, type, context, continuation) {
  let validatesWhenDerived;

  validatesWhenDerived = term.validate(state, context, (term, context) => {
    let termValidates = false;

    const termType = term.getType(),
          termTypeEqualToOrSubTypeOfType = termType.isEqualToOrSubTypeOf(type);

    if (termTypeEqualToOrSubTypeOfType) {
      const termEstablished = term.isEstablished();

      if (termEstablished) {
        termValidates = true;
      }
    }

    if (termValidates) {
      termValidates = continuation(term, context);
    }

    return termValidates;
  }, context, continuation);

  return validatesWhenDerived;
}
