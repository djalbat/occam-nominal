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

  unifyTerm(term, state, context, continuation) {
    let termUnifiesWithBracketedConstructor;

    termUnifiesWithBracketedConstructor = super.unifyTerm(term, context, (term, context) => {
      let termUnifies = false;

      const termNode = term.getNode(),
            singularTermNode = termNode.getSingularTermNode();

      if (singularTermNode !== null) {
        const bracketlessTermNode = singularTermNode, ///
              bracketlessTerm = termFromTermNode(bracketlessTermNode, context),
              bracketlessTermValidates = bracketlessTerm.validate(state, context, (bracketlessTerm, context) => {
                let validates;

                const type = bracketlessTerm.getType(),
                      provisional = bracketlessTerm.isProvisional();

                term.setType(type);

                term.setProvisional(provisional);

                validates = continuation(term, context);

                return validates;
              });

        if (bracketlessTermValidates) {
          termUnifies = true;
        }
      }

      return termUnifies;
    });

    return termUnifiesWithBracketedConstructor;
  }

  static name = "BracketedConstructor";
});
