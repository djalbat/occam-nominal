"use strict";

import { Element } from "occam-languages";
import { arrayUtilities } from "necessary";

import elements from "../elements";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateTerm } from "../process/instantiate";
import { stripBracketsFromTerm } from "../utilities/brackets";
import { equivalenceStringFromTerms } from "../utilities/string";

const { first, second, compress } = arrayUtilities;

export default define(class Equivalence extends Element {
  constructor(context, string, node, breakPoint, terms) {
    super(context, string, node, breakPoint);

    this.terms = terms;
  }

  getTerms() {
    return this.terms;
  }

  getGroundedTerms(definedVariables, groundedTerms, context) {
    this.terms.forEach((term) => {
      const termGrounded = term.isGrounded(definedVariables, context);

      if (termGrounded) {
        const termMatchesGroundedTerm = groundedTerms.some((groundedTerm) => {
          const groundedTermNode = groundedTerm.getNode(),
                groundedTermNodeMatches = term.matchTermNode(groundedTermNode);

          if (groundedTermNodeMatches) {
            return true;
          }
        })

        if (!termMatchesGroundedTerm) {
          const groundedTerm = term;

          groundedTerms.push(groundedTerm);
        }
      }
    });
  }

  getInitiallyGroundedTerms(context) {
    const initiallyGroundedTerms = this.terms.reduce((initiallyGroundedTerms, term) => {
      const termInitiallyGrounded = term.isInitiallyGrounded(context);

      if (termInitiallyGrounded) {
        const initiallyGroundedTerm = term; ///

        initiallyGroundedTerms.push(initiallyGroundedTerm);
      }

      return initiallyGroundedTerms;
    }, []);

    return initiallyGroundedTerms;
  }

  getImplicitlyGroundedTerms(definedVariables, context) {
    const implicitlyGroundedTerms = this.terms.reduce((implicitlyGroundedTerms, term) => {
      const termImplicitlyGrounded = term.isImplicitlyGrounded(definedVariables, context);

      if (termImplicitlyGrounded) {
        const implicitlyGroundedTerm = term; ///

        implicitlyGroundedTerms.push(implicitlyGroundedTerm);
      }

      return implicitlyGroundedTerms;
    }, []);

    return implicitlyGroundedTerms;
  }

  isDisjointFrom(equivalence) {
    const disjointFrom = equivalence.everyTerm((term) => {
      const termEquates = this.equateTerm(term);

      if (!termEquates) {
        return true;
      }
    });

    return disjointFrom;
  }

  isInitiallyGrounded(context) {
    const initiallyGroundedTerms = this.getInitiallyGroundedTerms(context),
          initiallyGroundedTermsLength = initiallyGroundedTerms.length,
          initiallyGrounded = (initiallyGroundedTermsLength > 0);

    return initiallyGrounded;
  }

  isImplicitlyGrounded(definedVariables, context) {
    const implicitlyGroundedTerms = this.getImplicitlyGroundedTerms(definedVariables, context),
          implicitlyGroundedTermsLength = implicitlyGroundedTerms.length,
          implicitlyGrounded = (implicitlyGroundedTermsLength > 0);

    return implicitlyGrounded;
  }

  equateTerm(term) {
    const termA = term, ///
          termEquates = this.someTerm((term) => {
            const termB = term, ///
                  termAEqualToTermB = termA.isEqualTo(termB);

            if (termAEqualToTermB) {
              return true;
            }
          });

    return termEquates;
  }

  equateTerms(terms) {
    const termsEquate = terms.every((term) => {
      const termEquates = this.equateTerm(term);

      if (termEquates) {
        return true;
      }
    });

    return termsEquate;
  }

  matchTermNode(termNode) {
    const termNodeMatches = this.terms.some((term) => {
      const termNodeMatches = term.matchTermNode(termNode);

      if (termNodeMatches) {
        return true;
      }
    });

    return termNodeMatches;
  }

  combineTerms(terms) {
    const combinedTerms = [
      ...this.terms,
      ...terms
    ];

    compress(combinedTerms, (combinedTermA, combinedTermB) => {
      const combinedTermEqualToCombinedTermB = combinedTermA.isEqualTo(combinedTermB);

      if (!combinedTermEqualToCombinedTermB) {
        return true;
      }
    });

    return combinedTerms;
  }

  mergedWith(equivalence, context) {
    let terms;

    terms = equivalence.getTerms();

    const combinedTerms = this.combineTerms(terms);

    terms = combinedTerms;  ///

    terms = reinstantiateTerms(terms, context); ///

    equivalence = equivalenceFromTerms(terms, context);

    return equivalence;
  }

  someOtherTerm(termNode, callback) {
    const terms = this.terms.filter((term) => {
            const termNodeMatches = term.matchTermNode(termNode);

            if (!termNodeMatches) {
              return true;
            }
          }),
          result = terms.some(callback);

    return result;
  }

  someTerm(callback) { return this.terms.some(callback); }

  everyTerm(callback) { return this.terms.every(callback); }

  static name = "Equivalence";

  static fromEquality(equality, context) {
    let equivalence;

    let terms;

    terms = equality.getTerms();

    terms = terms.map((term) => { ///
      term = stripBracketsFromTerm(term, context);

      return term;
    });

    terms = reinstantiateTerms(terms, context); ///

    const firstTerm = first(terms),
          secondTerm = second(terms),
          firstTermEqualToSecondTerm = firstTerm.isEqualTo(secondTerm);

    if (firstTermEqualToSecondTerm) {
      const term = firstTerm; ///

      terms = [
        term
      ];
    }

    equivalence = equivalenceFromTerms(terms, context);

    return equivalence;
  }
});

function equivalenceFromTerms(terms, context) {
  const { Equivalence } = elements,
        equivalenceString = equivalenceStringFromTerms(terms),
        string = equivalenceString, ///
        node = null,
        breakPoint = null;

  const equivalence = new Equivalence(context, string, node, breakPoint, terms);

  return equivalence;
}

function reinstantiateTerms(terms, context) {
  terms = terms.map((term) => { ///
    term = reinstantiateTerm(term, context);  ///

    return term;
  });

  return terms;
}

function reinstantiateTerm(term, context) {
  const { Term } = elements;

  instantiate((context) => {
    const string = term.getString(),
          termNode = instantiateTerm(string, context),
          node = termNode,  ///
          breakPoint = null,
          type = null,
          provisional = null;

    context = null;

    term = new Term(context, string, node, breakPoint, type, provisional);
  }, context);

  return term;
}

