"use strict";

import Assertion from "../assertion";

import { define } from "../../elements";
import { instantiate } from "../../utilities/context";
import { instantiateTypeAssertion } from "../../process/instantiate";
import { typeFromJSON, typeToTypeJSON } from "../../utilities/json";
import { termFromTermAndSubstitutions } from "../../utilities/substitutions";
import { variableAssignmentFromTypeAssertion } from "../../process/assign";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../../utilities/breakPoint";
import { termFromTypeAssertionNode, typeAssertionFromStatementNode } from "../../utilities/element";

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

  validate(context) {
    let typeAssertion = null;

    const typeAssertionString = this.getString();  ///

    context.trace(`Validating the '${typeAssertionString}' type assertion...`);

    let validates = false;

    const validAssertion = this.findValidAssertion(context);

    if (validAssertion) {
      validates = true;

      typeAssertion = validAssertion; ///

      context.debug(`...the '${typeAssertionString}' type assertion is already valid.`);
    } else {
      const typeValidates = this.validateType(context);

      if (typeValidates) {
        const stated = context.isStated();

        let validatesWhenStated = false,
          validatesWhenDerived = false;

        if (stated) {
          validatesWhenStated = this.validateWhenStated(context);
        } else {
          validatesWhenDerived = this.validateWhenDerived(context);
        }

        if (validatesWhenStated || validatesWhenDerived) {
          validates = true;
        }
      }

      if (validates) {
        const assertion = this; ///

        typeAssertion = assertion;  ///

        this.assign(context);

        context.addAssertion(assertion);
      }
    }

    if (validates) {
      context.debug(`...verified the '${typeAssertionString}' type assertion.`);
    }

    return typeAssertion;
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

  validateType(context) {
    let typeValidates;

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

    return typeValidates;
  }

  validateWhenStated(context) {
    let validatesWhenStated = false;

    const typeAssertionString = this.getString(); ///

    context.trace(`Validating the '${typeAssertionString}' stated type assertion...`);

    const term = this.term.validate(context, (term, context) => {
      let validatesForwards = false;

      const termType = term.getType(),
            termTypeEqualToType = termType.isEqualTo(this.type),
            termTypeSuperTypeOfType = termType.isSuperTypeOf(this.type);

      if (false) {
        ///
      } else if (termTypeEqualToType) {
        validatesForwards = true;
      } else if (termTypeSuperTypeOfType) {
        const termEstablished = term.isEstablished();

        if (termEstablished) {
          validatesForwards = true;
        }
      }

      return validatesForwards;
    });

    if (term !== null) {
      this.term = term;

      validatesWhenStated = true;
    }

    if (validatesWhenStated) {
      context.debug(`...validated the '${typeAssertionString}' stated type assertion.`);
    }

    return validatesWhenStated;
  }

  validateWhenDerived(context) {
    let validatesWhenDerived = false;

    const typeAssertionString = this.getString(); ///

    context.trace(`Validating the '${typeAssertionString}' derived type assertion...`);

    const term = validateWhenDerived(this.term, this.type, context);

    if (term !== null) {
      this.term = term;

      validatesWhenDerived = true;
    }

    if (validatesWhenDerived) {
      context.debug(`...validated the '${typeAssertionString}' derived type assertion.`);
    }

    return validatesWhenDerived;
  }

  unifyIndependently(generalContext, specificContext) {
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

function validateWhenDerived(term, type, context) {
  if (term !== null) {
    term = term.validate(context, (term, context) => {
      let validatesForwards = false;

      const termType = term.getType(),
            termTypeEqualToOrSubTypeOfType = termType.isEqualToOrSubTypeOf(type);

      if (termTypeEqualToOrSubTypeOfType) {
        const termEstablished = term.isEstablished();

        if (termEstablished) {
          validatesForwards = true;
        }
      }

      return validatesForwards;
    });
  }

  return term;
}
