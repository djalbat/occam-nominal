"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { all } from "../utilities/continuation";
import { define } from "../elements";
import { declare } from "../utilities/state";
import { instantiateLabel } from "../process/instantiate";
import { labelFromLabelNode, metavariableFromLabelNode } from "../utilities/element";
import { join, ablate, attempt, reconcile, serialise, unserialise, instantiate} from "../utilities/context";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Label extends Element {
  constructor(context, string, node, breakPoint, metavariable) {
    super(context, string, node, breakPoint);

    this.metavariable = metavariable;
  }

  getMetavariable() {
    return this.metavariable;
  }

  getLabelNode() {
    const node = this.getNode(),
          labelNode = node; ///

    return labelNode;
  }

  getMetavariableNode() { return this.metavariable.getNode(); }

  matchLabelNode(labelNode) {
    const node = labelNode, ///
          nodeMatches = this.matchNode(node),
          labelNodeMatches = nodeMatches; ///

    return labelNodeMatches;
  }

  matchMetavariableNode(metavariableNode) { return this.metavariable.matchMetavariableNode(metavariableNode); }

  compareReference(reference) {
    const metavariable = reference.getMetavariable(),
          metavariableComparesToMetavariable = this.compareMetavariable(metavariable),
          comparesToReference = metavariableComparesToMetavariable; ///

    return comparesToReference;
  }

  compareMetavariable(metavariable) { return this.metavariable.compareMetavariable(metavariable); }

  verify(continuation) {
    let verifies = false;

    const context = this.getContext(),
          labelString = this.getString(); ///

    context.trace(`Verifying the '${labelString}' label...`);

    const labelNode = this.getLabelNode(),
          labelPresent = context.isLabelPresentByLabelNode(labelNode);

    if (!labelPresent) {
      declare((state) => {
        const validates = this.validate(state, context, (label, context) => true);

        if (validates) {
          verifies = true;
        }
      });
    } else {
      context.debug(`The '${labelString}' label is already present.`);
    }

    if (verifies) {
      context.debug(`...verified the '${labelString}' label.`);
    }

    return continuation(verifies);
  }

  validate(state, context, continuation) {
    let validates;

    const labelString = this.getString(),  ///
          specificContext = context;  ///

    context.trace(`Validating the '${labelString}' label...`);

    const label = this; ///

    context = this.getContext();

    attempt((context) => {
      const validateMetavariable = this.validateMetavariable.bind(this);

      validates = all([
        validateMetavariable
      ], state, context, (state, context) => {
        let validates;

        this.commit(context);

        context = specificContext;  ///

        validates = continuation(label, context);

        return validates;
      });
    }, context);

    context = specificContext;  ///

    if (validates) {
      context.debug(`...validated the '${labelString}' label.`);
    }

    return validates;
  }

  validateMetavariable(state, context, continuation) {
    let metavariableValidates;

    const labelString = this.getString(); ///

    context.trace(`Validating the '${labelString}' label's metavariable...`);

    metavariableValidates = this.metavariable.validate(state, context, (metavariable, context) => {
      let validates;

      this.metavariable = metavariable;

      validates = continuation(state, context);

      return validates;
    });

    if (metavariableValidates) {
      context.debug(`...validated the '${labelString}' label's metavariable.'`);
    }

    return metavariableValidates;
  }

  unifyReference(reference, context, continuation) {
    const labelString = this.getString(), ///
          referenceString = reference.getString();

    context.trace(`Unifying the '${referenceString}' reference with the '${labelString}' label...`);

    const labelContext = this.getContext(), ///
          referenceContext = reference.getContext(),
          generalContext = labelContext, ///
          specificContext = referenceContext;  ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        const metavariable = reference.getMetavariable();

        return this.unifyMetavariable(metavariable, generalContext, specificContext, (metavariableUnifies) => {
          let referenceUnifies = false;

          if (metavariableUnifies) {
            specificContext.commit(context);

            referenceUnifies = true;
          }

          if (referenceUnifies) {
            context.debug(`...unified the '${referenceString}' reference with the '${labelString}' label.`);
          }

          return continuation(referenceUnifies);
        });
      }, specificContext);
    }, specificContext, context);
  }

  unifyMetavariable(metavariable, generalContext, specificContext, continuation) {
    const context = specificContext,  ///
          labelString = this.getString(), ///
          metavariableString = metavariable.getString();

    context.trace(`Unifying the '${metavariableString}' metavariable with the '${labelString}' label...`);

    return this.metavariable.unifyMetavariableIntrinsically(metavariable, generalContext, specificContext, (metavariableUnifiesIntrinsically) => {
      let metavariableUnifies = false;

      if (metavariableUnifiesIntrinsically) {
        metavariableUnifies = true;
      }

      if (metavariableUnifies) {
        context.debug(`...unified the '${metavariableString}' metavariable with the '${labelString}' label.`);
      }

      return continuation(metavariableUnifies);
    });
  }

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

  static name = "Label";

  static fromJSON(json, context) {
    let label;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              labelNode = instantiateLabel(string, context),
              node = labelNode, ///
              breakPoint = breakPointFromJSON(json),
              metavariable = metavariableFromLabelNode(labelNode, context);

        label = new Label(context, string, node, breakPoint, metavariable);
      }, json, context);
    }, context);

    return label;
  }

  static fromLabelString(labelString, context) {
    let label;

    ablate((context) => {
      instantiate((context) => {
        const string = labelString,  ///
              labelNode = instantiateLabel(string, context);

        label = labelFromLabelNode(labelNode, context);
      }, context);
    }, context);

    return label;
  }
});
