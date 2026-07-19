"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiateLabel } from "../process/instantiate";
import { labelFromLabelNode, metavariableFromLabelNode } from "../utilities/element";
import { attempt, reconcile, serialise, unserialise, instantiate} from "../utilities/context";

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
    const context = this.getContext(),
          labelString = this.getString(); ///

    context.trace(`Verifying the '${labelString}' label...`);

    const labelNode = this.getLabelNode(),
          labelPresent = context.isLabelPresentByLabelNode(labelNode);

    if (labelPresent) {
      const verifies = false;

      context.debug(`The '${labelString}' label is already present.`);

      return continuation(verifies);
    }

    this.validate((validates) => {
      let verifies = false;

      if (validates !== null) {
        verifies = true;
      }

      if (verifies) {
        context.debug(`...verified the '${labelString}' label.`);
      }

      return continuation(verifies);
    });
  }

  validate(continuation) {
    const context = this.getContext(),
          labelString = this.getString(); ///

    context.trace(`Validating the '${labelString}' label...`);

    attempt((context) => {
      this.validateMetavariable(context, (metavariableValidates) => {
        let validates = false;

        if (metavariableValidates) {
          validates = true;
        }

        if (validates) {
          this.commit(context);

          context.debug(`...validated the '${labelString}' label.`);
        }

        return continuation(validates);
      });
    }, context);
  }

  validateMetavariable(context, continuation) {
    let metavariableValidates = false;

    const labelString = this.getString(); ///

    context.trace(`Validating the '${labelString}' label's metavariable...`);

    return this.metavariable.validate(context, (metavariable) => {
      if (metavariable !== null) {
        this.metavariable = metavariable;

        metavariableValidates = true;
      }

      if (metavariableValidates) {
        context.debug(`...validated the '${labelString}' label's metavariable.'`);
      }

      return continuation(metavariableValidates);
    });
  }

  unifyReference(reference, context, continuation) {
    const labelString = this.getString(), ///
          referenceString = reference.getString();

    context.trace(`Unifying the '${referenceString}' reference with the '${labelString}' label...`);

    const labelContext = this.getContext(), ///
          referenceContext = reference.getContext(),
          generalContext = labelContext, ///
          specificContext = referenceContext;  ///

    reconcile((specificContext) => {
      const metavariable = reference.getMetavariable();

      return this.unifyMetavariable(metavariable, generalContext, specificContext, (metavariableUnifies) => {
        let referenceUnifies = false;

        if (metavariableUnifies) {
          referenceUnifies = true;
        }

        if (referenceUnifies) {
          context.debug(`...unified the '${referenceString}' reference with the '${labelString}' label.`);
        }

        return continuation(referenceUnifies);
      });
    }, specificContext);
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

    instantiate((context) => {
      const string = labelString,  ///
            labelNode = instantiateLabel(string, context);

      label = labelFromLabelNode(labelNode, context);
    }, context);

    return label;
  }
});
