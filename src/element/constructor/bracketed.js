"use strict";

import { continuationUtilities } from "occam-languages";

import Constructor from "../constructor";

import { define } from "../../elements";
import { termFromTermNode } from "../../utilities/element";

const { breakable } = continuationUtilities;

export default define(class BracketedConstructor extends Constructor {
  getBracketedConstructorNode() {
    const node = this.getNode(),
          bracketedConstructorNode = node;  ///

    return bracketedConstructorNode;
  }

  async unifyTerm(term, context, validateForwards) {
    let termUnifies;

    const termString = term.getString();

    context.trace(`Unifying the '${termString}' term with the bracketed constructor...`);

    termUnifies = await super.unifyTerm(term, context, async (term, context) => {
      let validatesForwards = false;

      const bracketedTerm = term, ///
            bracketedTermNode = bracketedTerm.getNode(),
            singularTermNode = bracketedTermNode.getSingularTermNode();

      if (singularTermNode !== null) {
        const bracketlessTermNode = singularTermNode; ///

        let bracketlessTerm;

        bracketlessTerm = termFromTermNode(bracketlessTermNode, context);

        bracketlessTerm = await bracketlessTerm.validate(context, async (bracketlessTerm, context) => {  ///
          let validatesForwards;

          const type = bracketlessTerm.getType(),
                provisional = bracketlessTerm.isProvisional();

          bracketedTerm.setType(type);

          bracketedTerm.setProvisional(provisional);

          validatesForwards = await validateForwards(bracketedTerm, context);

          return validatesForwards;
        });

        if (bracketlessTerm !== null) {
          validatesForwards = true;
        }
      }

      return validatesForwards;
    });

    if (termUnifies) {
      context.debug(`...unified the '${termString}' term with the bracketed constructor.`);
    }

    return termUnifies;
  }

  static name = "BracketedConstructor";
});
