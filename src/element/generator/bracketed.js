"use strict";

import Generator from "../generator";

import { define } from "../../elements";
import { termFromTermNode } from "../../utilities/element";

export default define(class BracketedGenerator extends Generator {
  getBracketedGeneratorNode() {
    const node = this.getNode(),
          bracketedGeneratorNode = node;  ///

    return bracketedGeneratorNode;
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

        return forward(term, context, back);
      }, back);
    }, back);
  }
});
