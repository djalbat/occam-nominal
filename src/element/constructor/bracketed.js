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
    const termString = term.getString();

    context.trace(`Unifying the '${termString}' term with the bracketed constructor...`);

    return super.unifyTerm(term, context, (termUnifies) => {
      if (!termUnifies) {
        return continuation(termUnifies);
      }

      const bracketedTerm = term, ///
            bracketedTermNode = bracketedTerm.getNode(),
            singularTermNode = bracketedTermNode.getSingularTermNode();

      if (singularTermNode === null) {
        const termUnifies = false;

        return continuation(termUnifies);
      }

      const bracketlessTermNode = singularTermNode, ///
            bracketlessTerm = termFromTermNode(bracketlessTermNode, context);

      return bracketlessTerm.validate(context, (bracketlessTerm, context) => {
        if (bracketlessTerm === null) {
          const termUnifies = false;

          return continuation(termUnifies);
        }

        let termUnifies;

        const type = bracketlessTerm.getType(),
              provisional = bracketlessTerm.isProvisional();

        bracketedTerm.setType(type);

        bracketedTerm.setProvisional(provisional);

        termUnifies = true;

        if (termUnifies) {
          context.debug(`...unified the '${termString}' term with the bracketed constructor.`);
        }

        return continuation(termUnifies);
      });
    });
  }

  static name = "BracketedConstructor";
});
