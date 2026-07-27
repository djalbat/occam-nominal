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

  unifyTerm(term, context, continuation) {
    let termUnifiesWithBracketedConstructor;

    const termString = term.getString();

    context.trace(`Unifying the '${termString}' term with the bracketed constructor...`);

    termUnifiesWithBracketedConstructor = super.unifyTerm(term, context, (context) => {
      let termUnifies = false;

      const bracketedTerm = term, ///
            bracketedTermNode = bracketedTerm.getNode(),
            singularTermNode = bracketedTermNode.getSingularTermNode();

      if (singularTermNode !== null) {
        const bracketlessTermNode = singularTermNode, ///
              bracketlessTerm = termFromTermNode(bracketlessTermNode, context),
              validates = bracketlessTerm.validate(context, (bracketlessTerm, context) => {
                const type = bracketlessTerm.getType(),
                      provisional = bracketlessTerm.isProvisional();

                bracketedTerm.setType(type);

                bracketedTerm.setProvisional(provisional);

                return continuation(context);
              });

        if (validates) {
          termUnifies = true;
        }
      }

      return termUnifies;
    });

    if (termUnifiesWithBracketedConstructor) {
      context.debug(`...unified the '${termString}' term with the bracketed constructor.`);
    }

    return termUnifiesWithBracketedConstructor;
  }

  static name = "BracketedConstructor";
});
