"use strict";

import { Element, breakPointUtilities, continuationUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { join, reconcile } from "../utilities/context";
import { isDerived, isDeclared } from "../utilities/state";
import { instantiateAssumption } from "../process/instantiate";

const { all, exists, backwardsEvery } = continuationUtilities,
      { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Assumption extends Element {
  constructor(context, string, node, breakPoint, link, statement) {
    super(context, string, node, breakPoint);

    this.link = link;
    this.statement = statement;
  }

  getLink() {
    return this.link;
  }

  getStatement() {
    return this.statement;
  }

  getMetavariable() { return this.link.getMetavariable(); }

  getStatementNode() { return this.statement.getStatementNode(); }

  isConditional() { return this.statement.isConditional() }

  getAssumptionNode() {
    const node = this.getNode(),
          assumptionNode = node;  ///

    return assumptionNode;
  }

  isEqualTo(assumption) {
    const assumptionNode = assumption.getNode(),
          assumptionNodeMatches = this.matchAssumptionNode(assumptionNode),
          equalTo = assumptionNodeMatches;  ///

    return equalTo;
  }

  matchAssumptionNode(assumptionNode) {
    const node = assumptionNode, ///
          nodeMatches = this.matchNode(node),
          assumptionNodeMatches = nodeMatches; ///

    return assumptionNodeMatches;
  }

  findAssumption(context) {
    const assumptionNode = this.getAssumptionNode(),
          assumption = context.findAssumptionByAssumptionNode(assumptionNode);

    return assumption;
  }

  findDeducedStatement(context) { return this.statement.findDeducedStatement(context); }

  findSupposedStatements(context) { return this.statement.findSupposedStatements(context); }

  findSubproofAssertion(context) { return this.statement.findSubproofAssertion(context); }

  validate(state, context, forward, back) {
    let assumption;

    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' assumption...`);

    assumption = this.findAssumption(context);

    if (assumption !== null) {
      context.debug(`The '${assumptionString}' assumption is already present.`);

      return forward(assumption, context, back);
    }

    assumption = this;  ///

    const validateLink = this.validateLink.bind(this),
          validateStatement = this.validateStatement.bind(this);

    return all([
      validateLink,
      validateStatement
    ], state, context, (state, context, back) => {
      const validateWhenDeclared = this.validateWhenDeclared.bind(this),
            validateWhenDerived = this.validateWhenDerived.bind(this);

      return exists([
        validateWhenDeclared,
        validateWhenDerived
      ], state, context, (state, context, back) => {
        context.addAssumption(assumption);

        context.debug(`...validated the '${assumptionString}' assumption.`);

        return forward(assumption, context, back);
      }, back);
    }, back);
  }

  validateWhenDeclared(state, context, forward, back) {
    const declared = isDeclared(state);

    if (!declared) {
      return back();
    }

    const assumptionString = this.getString(); ///

    context.trace(`Validating the '${assumptionString}' declared assumption...`);

    ///

    context.debug(`...validated the '${assumptionString}' declared assumption.`);

    return forward(state, context, back);
  }

  validateWhenDerived(state, context, forward, back) {
    let validatesWhenDerived = false;

    const derived = isDerived(state);

    if (!derived) {
      return back();
    }

    const assumptionString = this.getString(); ///

    context.trace(`Validating the '${assumptionString}' derived assumption...`);

    const schemas = context.getSchemas();

    validatesWhenDerived = some(schemas, (schema, context) => {
      let success = false;

      this.unifySchema(schema, context, (schemaUnifies) => {
        if (schemaUnifies) {
          success = true;
        }
      });

      return success;
    }, context, (context) => true); ///

    if (validatesWhenDerived) {
      validatesWhenDerived = continuation(state, context);
    }

    if (validatesWhenDerived) {
      context.debug(`...validated the '${assumptionString}' derived assumption.`);
    }

    return validatesWhenDerived;
  }

  validateLink(state, context, forward, back) {
    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' assumption's link...`);

    return this.link.validate(state, context, (link, context, back) => {
      this.link = link;

      context.debug(`...validates the '${assumptionString}' assumption's link.`);

      return forward(state, context, back);
    }, back);
  }

  validateStatement(state, context, forward, back) {
    const assumptionString = this.getString();  ///

    context.trace(`Validating the '${assumptionString}' assumption's statement...`);

    return this.statement.validate(state, context, (statement, context, back) => {
      this.statement = statement;

      context.debug(`...validates the '${assumptionString}' assumption's statement.`);

      return forward(state, context, back);
    }, back);
  }

  unifySchema(schema, context, forward, back) {
    const assumptionString = this.getString(),
          schemaString = schema.getString();

    context.trace(`Unifying the '${schemaString}' schema with the '${assumptionString}' assumption...`);

    const generalContext = context;  ///

    return reconcile((context) => {
      const label = schema.getLabel();

      return this.link.unifyLabel(label, context, (labelUnifies) => {
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
            context.trace(`Either the '${schemaString}' schema is unconditional whilst the '${assumptionString}' assumption is conditional or vice verse.`);

            return continuation(schemaUnifies);
          }

          const suppositions = schema.getSuppositions(),
                supposedStatements = this.findSupposedStatements(context);

          return this.unifySuppositions(suppositions, supposedStatements, generalContext, specificContext, (suppositionsUnify) => {
            if (suppositionsUnify) {
              schemaUnifies = true;
            }

            if (schemaUnifies) {
              context.debug(`...unified the '${schemaString}' schema with the '${assumptionString}' assumption.`);
            }

            return continuation(schemaUnifies);
          });
        });
      });
    }, context);
  }

  unifyDeduction(deduction, deducedStatement, generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          assumptionString = this.getString(),  ///
          deductionString = deduction.getString();

    context.trace(`Unifying the '${deductionString}' deduction's statement  with the '${assumptionString}' assumption's '${assumptionString}' statement...`);

    const statement = deduction.getStatement(),
          deductionContext = deduction.getContext();

    specificContext = deductionContext; ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        return deducedStatement.unifyStatement(statement, generalContext, specificContext, (generalContext, specificContext, back) => {
          specificContext.commit(context);

          context.debug(`...unified the '${deductionString}' deduction's statement with the '${assumptionString}' assumption's '${assumptionString}' statement.`);

          return forward(generalContext, specificContext, back);
        }, back);
      }, specificContext);
    }, specificContext, context);
  }

  unifySupposition(supposition, supposedStatement, generalContext, specificContext, forward, back) {
    const context = specificContext,  ///
          suppositionString = supposition.getString(),
          supposedStatementString = supposedStatement.getString();

    context.trace(`Unifying the '${suppositionString}' supposition's statement  with the '${supposedStatementString}' supposed statement...`);

    const statement = supposition.getStatement(),
          suppositionContext = supposition.getContext();

    specificContext = suppositionContext; ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        return supposedStatement.unifyStatement(statement, generalContext, specificContext, (generalContext, specificContext, back) => {
          specificContext.commit(context);

          context.debug(`...unified the '${suppositionString}' supposition's statement  with the '${supposedStatementString}' supposed statement.`);

          return forward(generalContext, specificContext, back);
        }, back);
      }, specificContext);
    }, specificContext, context);
  }

  unifySuppositions(suppositions, supposedStatements, generalContext, specificContext, forward, back) {
    const suppositionsLength = suppositions.length,
          supposedStatementsLength = supposedStatements.length;

    if (suppositionsLength !== supposedStatementsLength) {
      const suppositionsUnify = false;

      return continuation(suppositionsUnify);
    }

    let index = suppositionsLength; ///

    return backwardsEvery(suppositions, (supposition, forward, back) => {
      index--;

      const supposedStatement = supposedStatements[index];

      return this.unifySupposition(supposition, supposedStatement, generalContext, specificContext, forward, back);
    }, forward, back);
  }

  toJSON() {
    let json;

    const string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    json = {
      string,
      breakPoint
    };

    return json;
  }

  static name = "Assumption";

  static fromJSON(json, context) {
    let assumption;

    instantiate((context) => {
      const { string } = json,
            assumptionNode = instantiateAssumption(string, context),
            node = assumptionNode,  ///
            breakPoint = breakPointFromJSON(json),
            link = linkFromAssumptionNode(assumptionNode, context),
            statement = statementFromAssumptionNode(assumptionNode, context);

      assumption = new Assumption(context, string, node, breakPoint, link, statement);
    }, context);

    return assumption;
  }
});

function linkFromAssumptionNode(assumptionNode, context) {
  const linkNode = assumptionNode.getLinkNode(context),
        link = context.findLinkByLinkNode(linkNode);

  return link;
}

function statementFromAssumptionNode(assumptionNode, context) {
  const statementNode = assumptionNode.getStatementNode(),
        statement = context.findStatementByStatementNode(statementNode);

  return statement;
}
