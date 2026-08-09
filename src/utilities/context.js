"use strict";

import LexicContext from "../context/lexic";
import CladicContext from "../context/cladic";
import KrasicContext from "../context/krasic";
import MnemicContext from "../context/mnemic";
import MetexicContext from "../context/metexic";
import TemenicContext from "../context/temenic";
import EdaphicContext from "../context/edaphic";
import LiminalContext from "../context/liminal";
import PhanericContext from "../context/phaneric";
import ProlepticContext from "../context/proleptic";
import NominalFileContext from "../context/file/nominal";

import { mnemicContextFromJSON, mnemicContextsFromJSON, mnemicContextToMnemicContextJSON, mnemicContextsToMnemicContextsJSON } from "../utilities/json";

export function ground(innerFunction) {
  let context;

  const edaphicContext = EdaphicContext.fromNothing();

  context = edaphicContext; ///

  const lexicContext = LexicContext.fromNothing(context);

  context = lexicContext;  ///
  return innerFunction(context);
}

export function enclose(innerFunction, context) {
  const temenicContext = TemenicContext.fromNothing(context);

  context = temenicContext;  ///

  return innerFunction(context);
}

export function anticipate(innerFunction, type, context) {
  const prolepticContext = ProlepticContext.fromType(type, context);

  context = prolepticContext;  ///

  return innerFunction(context);
}

export function encapsulate(innerFunction, constraints, context) {
  const temenicContext = TemenicContext.fromConstraints(constraints, context);

  context = temenicContext;  ///

  return innerFunction(context);
}

export function choose(innerFunction, context) {
  const cladicContext = CladicContext.fromNothing(context);

  context = cladicContext;  ///

  return innerFunction(context);
}

export function ablate(innerFunction, context) {
  context = ablateContext(context); ///

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
  const lexicContext = LexicContext.fromNothing(context);

  context = lexicContext;  ///

  return innerFunction(context);
}

export function participate(innerFunction, ...contexts) {
  const metexicContext = MetexicContext.fromContexts(contexts),
        context = metexicContext;  ///

  return innerFunction(context);
}

export function join(innerFunction, ...contexts) {
  const krasicContext = KrasicContext.fromContexts(contexts),
    context = krasicContext;  ///

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

function ablateContext(context) {
  const unreleased = context.isUnreleased();

  if (unreleased) {
    let contextNominalFileContext = NominalFileContext.prototype.isPrototypeOf(context);

    while (!contextNominalFileContext) {
      context = context.getContext();

      contextNominalFileContext = NominalFileContext.prototype.isPrototypeOf(context);
    }
  }

  return context;
}
