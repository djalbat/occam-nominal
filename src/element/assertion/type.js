"use strict";

import { breakPointUtilities } from "occam-languages";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { all, exists } from "../../utilities/continuation";
import { instantiateTypeAssertion } from "../../process/instantiate";
import { typeFromJSON, typeToTypeJSON } from "../../utilities/json";
import { termFromTermAndSubstitutions } from "../../utilities/substitutions";
import { variableAssignmentFromTypeAssertion } from "../../process/assign";
import { derive, isDerived, isDeclared, isTransient} from "../../utilities/state";
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

  validate(state, context, continuation) {
    let validates;

    const typeAssertionString = this.getString();  ///

    context.trace(`Validating the '${typeAssertionString}' type assertion...`);

    let assertion;

    assertion = this.findAssertion(context);

    if (assertion !== null) {
      const typeAssertion = assertion; ///

      context.debug(`The '${typeAssertionString}' type assertion is already present.`);

      validates = continuation(typeAssertion, context);
    } else {
      assertion = this;

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

          context.addAssertion(assertion);

          const typeAssertion = assertion; ///

          validates = continuation(typeAssertion, context);

          return validates;
        });

        return validates;
      });

      if (validates) {
        this.assign(state, context);
      }
    }

    if (validates) {
      context.debug(`...validated the '${typeAssertionString}' type assertion.`);
    }

    return validates;
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

      const termValidates = this.term.validate(state, context, (term, context) => {
        let validates = false;

        const termType = term.getType(),
              termTypeEqualToType = termType.isEqualTo(this.type),
              termTypeSuperTypeOfType = termType.isSuperTypeOf(this.type);

        if (false) {
          ///
        } else if (termTypeEqualToType) {
          validates = true;
        } else if (termTypeSuperTypeOfType) {
          const termEstablished = term.isEstablished();

          if (termEstablished) {
            validates = true;
          }
        }

        if (validates) {
          this.term = term;

          validates = continuation(state, context);
        }

        return validates;
      });

      if (termValidates) {
        validatesWhenDeclared = true;
      }

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

      validatesWhenDerived = validateWhenDerived(this.term, this.type, state, context, (term, context) => {
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

  unifyIndependently(generalContext, specificContext, continuation) {
    let unifiesIndependently = false;

    const context = specificContext, ///
          typeAssertionString = this.getString(); ///

    context.trace(`Unifying the '${typeAssertionString}' type assertion independently...`);

    const term = termFromTermAndSubstitutions(this.term, context);

    derive((state) => {
      validateWhenDerived(term, this.type, state, context, (term, context) => {
        let validatesWhenDerived;

        unifiesIndependently = true;

        validatesWhenDerived = true;

        return validatesWhenDerived;
      });
    });

    if (unifiesIndependently) {
      context.debug(`...unified the '${typeAssertionString}' type assertion independently.`);
    }

    return continuation(unifiesIndependently);
  }

  assign(state, context) {
    const derived = isDerived(state),
          transient = isTransient(state);

    if (derived || transient) {
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

function validateWhenDerived(term, type, state, context, continuation) {
  let validatesWhenDerived = false;

  const validate = term.validate(state, context, (term, context) => {
    let validates = false;

    const termType = term.getType(),
          termTypeEqualToOrSubTypeOfType = termType.isEqualToOrSubTypeOf(type);

    if (termTypeEqualToOrSubTypeOfType) {
      const termEstablished = term.isEstablished();

      if (termEstablished) {
        validates = true;
      }
    }

    if (validates) {
      validates = continuation(term, context);
    }

    return validates;
  });

  if (validate) {
    validatesWhenDerived = true;
  }

  return validatesWhenDerived;
}
