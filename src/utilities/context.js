"use strict";

import KenonContext from "../context/kenon";
import MnemicContext from "../context/mnemic";
import NestedContext from "../context/nested";
import TheticContext from "../context/thetic";
import AmnesicContext from "../context/amnedic";
import AphasicContext from "../context/aphasic";
import BoundedContext from "../context/bounded";
import NominalContext from "../context/nominal";
import LiteralContext from "../context/literal";
import LiminalContext from "../context/liminal";
import PhanericContext from "../context/phaneric";
import IllativeContext from "../context/illative";
import BranchingContext from "../context/branching";
import ProlepticContext from "../context/proleptic";
import NominalFileContext from "../context/file/nominal";

import { mnemicContextFromJSON, mnemicContextsFromJSON, mnemicContextToMnemicContextJSON, mnemicContextsToMnemicContextsJSON } from "../utilities/json";

export function ground(innerFunction) {
  let context;

  const nominalContext = NominalContext.fromNothing();

  context = nominalContext; ///

  const literalContext = LiteralContext.fromNothing(context);

  context = literalContext;  ///

  return innerFunction(context);
}

export function pass(innerFunction, context) {
  const kenonContext = KenonContext.fromNothing(context);

  context = kenonContext;  ///

  return innerFunction(context);
}

export function waive(innerFunction, context) {
  const amnesicContext = AmnesicContext.fromNothing(context);

  context = amnesicContext;  ///

  return innerFunction(context);
}

export function declare(innerFunction, context) {
  const theticContext = TheticContext.fromNothing(context);

  context = theticContext;  ///

  return innerFunction(context);
}

export function derive(innerFunction, context) {
  const illativeContext = IllativeContext.fromNothing(context);

  context = illativeContext;  ///

  return innerFunction(context);
}

export function elide(innerFunction, context) {
  const aphasicContext = AphasicContext.fromNothing(context);

  context = aphasicContext;  ///

  return innerFunction(context);
}

export function enclose(innerFunction, context) {
  const boundedContext = BoundedContext.fromNothing(context);

  context = boundedContext;  ///

  return innerFunction(context);
}

export function anticipate(innerFunction, type, context) {
  const prolepticContext = ProlepticContext.fromType(type, context);

  context = prolepticContext;  ///

  return innerFunction(context);
}

export function encapsulate(innerFunction, constraints, context) {
  const boundedContext = BoundedContext.fromConstraints(constraints, context);

  context = boundedContext;  ///

  return innerFunction(context);
}

export function choose(innerFunction, context) {
  const branchingContext = BranchingContext.fromNothing(context);

  context = branchingContext;  ///

  return innerFunction(context);
}

export function descend(innerFunction, context) {
  const nestedContext = NestedContext.fromNothing(context);

  context = nestedContext;  ///

  return innerFunction(context);
}

export function ablate(innerFunction, context) {
  context = ablateContext(context); ///

  return innerFunction(context);
}

export function pare(innerFunction, context) {
  context = pareContext(context); ///

  return innerFunction(context);
}

export function attempt(innerFunction, context) {
  const unreleased = context.isUnreleased();

  if (unreleased) {
    const mnemicContext = MnemicContext.fromNothing(context);

    context = mnemicContext;  ///
  }

  return innerFunction(context);
}

export function reconcile(innerFunction, context) {
  const liminalContext = LiminalContext.fromNothing(context);

  context = liminalContext;  ///

  return innerFunction(context);
}

export function serialise(innerFunction, context) {
  const mnemicContext = context, ///
        mnemicContextJSON = mnemicContextToMnemicContextJSON(mnemicContext),
        contextJSON = mnemicContextJSON; ///

  context = contextJSON;  ///

  return innerFunction(context);
}

export function unserialise(innerFunction, json, context) {
  const mnemicContext = mnemicContextFromJSON(json, context);

  context = mnemicContext; ///

  return innerFunction(json, context);
}

export function unserialises(innerFunction, json, context) {
  const mnemicContexts = mnemicContextsFromJSON(json, context),
        contexts = mnemicContexts; ///

  return innerFunction(json, ...contexts);
}

export function instantiate(innerFunction, context) {
  const literalContext = LiteralContext.fromNothing(context);

  context = literalContext;  ///

  return innerFunction(context);
}

export function manifest(innerFunction, ...contexts) {
  const phanericContext = PhanericContext.fromContexts(contexts),
        context = phanericContext;  ///

  return innerFunction(context);
}

export function attempts(innerFunction, ...contexts) {
  contexts = contexts.map((context) => {  ///
    const unreleased = context.isUnreleased();

    if (unreleased) {
      const mnemicContext = MnemicContext.fromNothing(context);

      context = mnemicContext;  ///
    }

    return context;
  });

  return innerFunction(...contexts);
}

export function serialises(innerFunction, ...contexts) {
  const mnemicContexts = contexts, ///
        mnemicContextsJSON = mnemicContextsToMnemicContextsJSON(mnemicContexts),
        contextsJSON = mnemicContextsJSON; ///

  contexts = contextsJSON;  ///

  return innerFunction(...contexts);
}

export function ablates(innerFunction, ...contexts) {
  contexts = contexts.map((context) => {  ///
    context = ablateContext(context); ///

    return context;
  });

  return innerFunction(...contexts);
}

function pareContext(context) {
  let contextLiminalContext = LiminalContext.prototype.isPrototypeOf(context);

  while (contextLiminalContext) {
    context = context.getContext();

    contextLiminalContext = LiminalContext.prototype.isPrototypeOf(context)
  }

  return context;
}

function ablateContext(context) {
  const unreleased = context.isUnreleased();

  if (unreleased) {
    let phanericContext = null;

    const contextPhanericContext = PhanericContext.prototype.isPrototypeOf(context);

    if (contextPhanericContext) {
      phanericContext = context;  ///

      context = phanericContext.detach();
    }

    let contextGroundedContext = isContextGroundedContext(context);

    while (!contextGroundedContext) {
      context = context.getContext();

      contextGroundedContext = isContextGroundedContext(context);
    }

    if (phanericContext !== null) {
      phanericContext.attach(context);

      context = phanericContext;  ///
    }
  }

  return context;
}

function isContextGroundedContext(context) {
  const contextTheticContext = TheticContext.prototype.isPrototypeOf(context),
        contextIllativeContext = IllativeContext.prototype.isPrototypeOf(context),
        contextNominalFileContext = NominalFileContext.prototype.isPrototypeOf(context),
        contextGroundedContext = (contextTheticContext || contextIllativeContext || contextNominalFileContext);

  return contextGroundedContext;
}
