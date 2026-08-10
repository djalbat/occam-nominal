"use strict";

import { Element, continuationUtilities } from "occam-languages";

import { join, reconcile } from "../utilities/context";

const { asynchronousBackwardsEvery } = continuationUtilities;

export default class Binding extends Element {
  constructor(context, string, node, breakPoint, reference, statement) {
    super(context, string, node, breakPoint);

    this.reference = reference;
    this.statement = statement;
  }

  getReference() {
    return this.reference;
  }

  getStatement() {
    return this.statement;
  }

  getMetavariable() { return this.reference.getMetavariable(); }

  getStatementNode() { return this.statement.getStatementNode(); }

  validateReference(state, context, continuation) {
    let referenceValidates;

    const bindingString = this.getString();  ///

    context.trace(`Validating the '${bindingString}' binding's reference...`);

    referenceValidates = this.reference.validate(state, context, (reference, context) => {
      let validates;

      this.reference = reference;

      validates = continuation(state, context);

      return validates;
    });

    if (referenceValidates) {
      context.debug(`...validates the '${bindingString}' binding's reference.`);
    }

    return referenceValidates;
  }

  validateStatement(state, context, continuation) {
    let statementValidates;

    const bindingString = this.getString();  ///

    context.trace(`Validating the '${bindingString}' binding's statement...`);

    statementValidates = this.statement.validate(state, context, (statement, context) => {
      let validates;

      this.statement = statement;

      validates = continuation(state, context);

      return validates;
    });

    if (statementValidates) {
      context.debug(`...validates the '${bindingString}' binding's statement.`);
    }

    return statementValidates;
  }

  unifySchema(schema, context, continuation) {
    const bindingString = this.getString(),
          schemaString = schema.getString();

    context.trace(`Unifying the '${schemaString}' schema with the '${bindingString}' binding...`);

    const generalContext = context;  ///

    return reconcile((context) => {
      const label = schema.getLabel();

      return this.reference.unifyLabel(label, context, (labelUnifies) => {
        const specificContext = context;  ///

        if (!labelUnifies) {
          const schemaUnifies = false;

          return continuation(schemaUnifies);
        }

        const deduction = schema.getDeduction(),
              deducedStatement = this.findDeducedStatement(context);

        return this.unifyDeduction(deduction, deducedStatement, generalContext, specificContext, (deductionUnifies) => {
          let schemaUnifies = false;

          if (!deductionUnifies) {
            return continuation(schemaUnifies);
          }

          const conditional = this.isConditional(),
                schemaConditional = schema.isConditional();

          if (conditional !== schemaConditional) {
            context.trace(`Either the '${schemaString}' schema is unconditional whilst the '${bindingString}' binding is conditional or vice verse.`);

            return continuation(schemaUnifies);
          }

          const suppositions = schema.getSuppositions(),
                supposedStatements = this.findSupposedStatements(context);

          return this.unifySuppositions(suppositions, supposedStatements, generalContext, specificContext, (suppositionsUnify) => {
            if (suppositionsUnify) {
              schemaUnifies = true;
            }

            if (schemaUnifies) {
              context.debug(`...unified the '${schemaString}' schema with the '${bindingString}' binding.`);
            }

            return continuation(schemaUnifies);
          });
        });
      });
    }, context);
  }

  unifyDeduction(deduction, deducedStatement, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
      bindingString = this.getString(),  ///
      deductionString = deduction.getString();

    context.trace(`Unifying the '${deductionString}' deduction's statement  with the '${bindingString}' binding's '${bindingString}' statement...`);

    const statement = deduction.getStatement(),
      deductionContext = deduction.getContext(); ///

    specificContext = deductionContext; ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        return deducedStatement.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
          let deductionUnifies = false;

          if (statementUnifies) {
            specificContext.commit(context);

            deductionUnifies = true;
          }

          if (deductionUnifies) {
            context.debug(`...unified the '${deductionString}' deduction's statement with the '${bindingString}' binding's '${bindingString}' statement.`);
          }

          return continuation(deductionUnifies);
        });
      }, specificContext);
    }, specificContext, context);
  }

  unifySupposition(supposition, supposedStatement, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
      suppositionString = supposition.getString(),
      supposedStatementString = supposedStatement.getString();

    context.trace(`Unifying the '${suppositionString}' supposition's statement  with the '${supposedStatementString}' supposed statement...`);

    const statement = supposition.getStatement(),
      suppositionContext = supposition.getContext(); ///

    specificContext = suppositionContext; ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        return supposedStatement.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
          let suppositionUnifies = false;

          if (statementUnifies) {
            specificContext.commit(context);

            suppositionUnifies = true;
          }

          if (suppositionUnifies) {
            context.debug(`...unified the '${suppositionString}' supposition's statement  with the '${supposedStatementString}' supposed statement.`);
          }

          return continuation(suppositionUnifies);
        });
      }, specificContext);
    }, specificContext, context);
  }

  unifySuppositions(suppositions, supposedStatements, generalContext, specificContext, continuation) {
    const suppositionsLength = suppositions.length,
      supposedStatementsLength = supposedStatements.length;

    if (suppositionsLength !== supposedStatementsLength) {
      const suppositionsUnify = false;

      return continuation(suppositionsUnify);
    }

    let index = suppositionsLength; ///

    return asynchronousBackwardsEvery(suppositions, (supposition, continuation) => {
      index--;

      const supposedStatement = supposedStatements[index];

      return this.unifySupposition(supposition, supposedStatement, generalContext, specificContext, continuation);
    }, continuation);
  }
}