"use strict";

import { arrayUtilities } from "necessary";
import { asynchronousUtilities } from "occam-languages";

import elements from "../../elements";
import ProofAssertion from "../proofAssertion";

import { define } from "../../elements";
import { unifySteps } from "../../process/unification";
import { derive, declare, attempt, reconcile } from "../../utilities/context";

const { asyncSome } = asynchronousUtilities,
      { backwardsSome } = arrayUtilities;

export default define(class Step extends ProofAssertion {
  constructor(context, string, node, breakPoint, statement, reference, signatureAssertion) {
    super(context, string, node, breakPoint, statement);

    this.reference = reference;
    this.signatureAssertion = signatureAssertion;
  }

  getReference() {
    return this.reference;
  }

  getSignatureAssertion() {
    return this.signatureAssertion;
  }

  getStepNode() {
    const node = this.getNode(),
          stepNode = node;  ///

    return stepNode;
  }

  getStatementNode() {
    const statement = this.getStatement(),
          statementNode = statement.getNode();

    return statementNode;
  }

  isQualified() {
    const qualified = ((this.reference !== null) || (this.signatureAssertion !== null));

    return qualified;
  }

  isUnqualified() {
    const qualified = this.isQualified(),
          unqualified = !qualified;

    return unqualified;
  }

  compareTermAndPropertyRelation(term, propertyRelation, context) {
    let comparesToTermAndPropertyRelation = false;

    const { PropertyAssertion } = elements,
          statement = this.getStatement(),
          propertyAssertion = PropertyAssertion.fromStatement(statement, context);

    if (propertyAssertion !== null) {
      comparesToTermAndPropertyRelation = propertyAssertion.compareTermAndPropertyRelation(term, propertyRelation, context);
    }

    return comparesToTermAndPropertyRelation;
  }

  compareSubproofOrProofAssertions(subproofOrProofAssertions, context) {
    let comparesToSubproofOrProofAssertions;

    const step = this; ///

    comparesToSubproofOrProofAssertions = backwardsSome(subproofOrProofAssertions, (subproofOrProofAssertion) => {
      const subproofOrProofAssertionComparesToStatement = subproofOrProofAssertion.compareStep(step, context);

      if (subproofOrProofAssertionComparesToStatement) {
        return true;
      }
    });

    return comparesToSubproofOrProofAssertions;
  }

  async verify(context) {
    let verifies = false;

    await this.break(context);

    const stepString = this.getString(); ///

    context.trace(`Verifying the '${stepString}' step...`);

    const statement = this.getStatement();

    if (statement !== null) {
      const qualified = this.isQualified(),
            stated = qualified; ///

      await (stated ? declare : derive)(async (context) => {
        const validates = this.validate(context);

        if (validates) {
          context = this.getContext();

          const unifiies = await this.unify(context);

          if (unifiies) {
            verifies = true;
          }
        }
      }, context)
    } else {
      context.debug(`Unable to verify the '${stepString}' step because it is nonsense.`);
    }

    if (verifies) {
      context.debug(`...verified the '${stepString}' step.`);
    }

    return verifies;
  }

  validate(context) {
    let validates = false;

    const stepString = this.getString(); ///

    context.trace(`Validating the '${stepString}' step...`);

    attempt((context) => {
      const statementValidates = this.validateStatement(context);

      if (statementValidates) {
        const referenceValidates = this.validateReference(context);

        if (referenceValidates) {
          const signatureAssertionValidates = this.validateSignatureAssertion(context);

          if (signatureAssertionValidates) {
            validates = true;
          }
        }
      }

      if (validates) {
        this.commit(context);
      }
    }, context);

    if (validates) {
      context.debug(`...validated the '${stepString}' step.`);
    }

    return validates;
  }

  validateStatement(context) {
    let statementValidates = false;

    const stepString = this.getString();

    context.trace(`Validating the '${stepString}' step's statement... `);

    let statement;

    statement = this.getStatement();

    statement = statement.validate(context);  ///

    if (statement !== null) {
      statementValidates = true;
    }

    if (statementValidates) {
      context.debug(`...validated the '${stepString}' step's statement. `);
    }

    return statementValidates;
  }

  validateReference(context) {
    let referenceValidates = false;

    if (this.reference !== null) {
      const stepString = this.getString(),  ///
            referenceString = this.reference.getString();

      context.trace(`Validating the '${stepString}' step's '${referenceString}' reference... `);

      const reference = this.reference.validate(context);

      if (reference !== null) {
        this.reference = reference;

        referenceValidates = true;
      }

      if (referenceValidates) {
        context.debug(`...validated the '${stepString}' step's '${referenceString}' reference. `);
      }
    } else {
      referenceValidates = true;
    }

    return referenceValidates;
  }

  validateSignatureAssertion(context) {
    let signatureAssertionValidates = false;

    if (this.signatureAssertion !== null) {
      const stepString = this.getString(),  ///
            signatureAssertionString = this.signatureAssertion.getString();

      context.trace(`Validating the '${stepString}' step's '${signatureAssertionString}' signature assertion... `);

      const signatureAssertion = this.signatureAssertion.validate(context);

      if (signatureAssertion !== null) {
        this.signatureAssertion = signatureAssertion;

        signatureAssertionValidates = true;
      }

      if (signatureAssertionValidates) {
        context.debug(`...validated the '${stepString}' step's '${signatureAssertionString}' signature assertion. `);
      }
    } else {
      signatureAssertionValidates = true;
    }

    return signatureAssertionValidates;
  }

  async unify(context) {
    let unifies = false;

    const stepString = this.getString(); ///

    context.trace(`Unifying the '${stepString}' step...`);

    const step = this;  ///

    await asyncSome(unifySteps, async (unifyStep) => {
      let stepUnifies;

      await reconcile(async (context) => {
        stepUnifies = await unifyStep(step, context);
      }, context);

      if (stepUnifies) {
        unifies = true;

        return true;
      }
    });

    if (unifies) {
      context.debug(`...unified the '${stepString}' step.`);
    }

    return unifies;
  }

  static name = "Step";
});
