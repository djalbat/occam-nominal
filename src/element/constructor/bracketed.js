"use strict";

import Constructor from "../constructor";

import { define } from "../../elements";
import { termFromTermNode } from "../../utilities/element";

export default define(class BracketedConstructor extends Constructor {
  getBracketedConstructorNode() {
    const node = this.getNode(),
      bracketedConstructorNode = node;  ///

    return bracketedConstructorNode;
  }

  unifyTerm(term, state, context, forward, back) {
    return super.unifyTerm(term, context, (term, context, back) => {
      const termNode = term.getNode(),
            singularTermNode = termNode.getSingularTermNode();

      if (singularTermNode === null) {
        return back();
      }

      const bracketlessTermNode = singularTermNode, ///
            bracketlessTerm = termFromTermNode(bracketlessTermNode, context);

      return bracketlessTerm.validate(state, context, (bracketlessTerm, context, back) => {
        const type = bracketlessTerm.getType(),
              provisional = bracketlessTerm.isProvisional();

        term.setType(type);

        term.setProvisional(provisional);

        return forward(term, state, context, back);
      }, back);
    }, back);
  }
});
