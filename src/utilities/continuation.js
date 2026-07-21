"use strict";

import { asynchronousUtilities } from "necessary";
import { continuationUtilities } from "occam-languages";

const { forEach: asynchronousForEach,
        forwardsForEach: asynchronousForwardsForEach,
        backwardsForEach: asynchronousBackwardsForEach } = asynchronousUtilities;

export const { reduce, forEach, resolve } = continuationUtilities;

export function one(array, callback, ...callerArguments) {
  let success = false;

  const continuation = callerArguments.pop();

  let context = callerArguments.pop();

  const callerContext = context;  ///

  asynchronousForEach(array, (element, next, done) => {
    return callback(element, ...callerArguments, callerContext, (...callbackArguments) => {
      const passed = callbackArguments.shift();

      if (passed) {
        if (!success) {
          success = true;

          context = callbackArguments.shift();
        } else {
          success = false;

          context = callerContext;  ///

          done();

          return;
        }
      }

      next();
    });
  }, () => {
    return continuation(success, context);
  });
}

export function some(array, callback, ...callerArguments) {
  let success = false;

  const continuation = callerArguments.pop();

  let context = callerArguments.pop();

  const callerContext = context;  ///

  asynchronousForEach(array, (element, next, done) => {
    return callback(element, ...callerArguments, callerContext, (...callbackArguments) => {
      success = callbackArguments.shift();

      if (success) {
        context = callbackArguments.shift();

        done();

        return;
      }

      next();
    });
  }, () => {
    return continuation(success, context);
  });
}

export function each(array, callback, ...callerArguments) {
  let success = false;

  const continuation = callerArguments.pop();

  let context = callerArguments.pop();

  const callerContext = context;  ///

  asynchronousForEach(array, (element, next, done) => {
    return callback(element, ...callerArguments, context, (...callbackArguments) => {
      success = callbackArguments.shift();

      if (!success) {
        context = callerContext;  ///

        done();

        return;
      }

      context = callbackArguments.shift();

      next();
    });
  }, () => {
    return continuation(success, context);
  });
}

export function every(array, callback, ...callerArguments) {
  let success = true;

  const continuation = callerArguments.pop();

  let context = callerArguments.pop();

  const callerContext = context;  ///

  asynchronousForEach(array, (element, next, done) => {
    return callback(element, ...callerArguments, context, (...callbackArguments) => {
      success = callbackArguments.shift();

      if (!success) {
        context = callerContext;  ///

        done();

        return;
      }

      context = callbackArguments.shift();

      next();
    });
  }, () => {
    return continuation(success, context);
  });
}

export function match(arrayA, arrayB, callback, ...callerArguments) {
  const continuation = callerArguments.pop(),
        context = callerArguments.pop();

  const arrayALength = arrayA.length,
        arrayBLength = arrayB.length;

  if (arrayALength !== arrayBLength) {
    const matches = false;

    return continuation(matches, context);
  }

  let index = -1;

  return every(arrayA, (elementA, ...calleeArguments) => {
    index++;

    const elementB = arrayB[index];

    const continuation = calleeArguments.pop();

    let context = calleeArguments.pop();

    return callback(elementA, elementB, ...calleeArguments, context, (...callbackArguments) => {
      const success = callbackArguments.shift();

      context = callbackArguments.shift();

      return continuation(success, context);
    });
  }, ...callerArguments, context, (success, context) => {
    const matches = success;  ///

    return continuation(matches, context);
  });
}

export function filter(array, callback, ...callerArguments) {
  const deletedElements = [];

  const continuation = callerArguments.pop(),
        context = callerArguments.pop();

  let index = array.length;

  return backwardsForEach(array, (element, ...calleeArguments) => {
    index--;

    const continuation = calleeArguments.pop();

    let context = calleeArguments.pop();

    return callback(element, ...calleeArguments, context, (...callbackArguments) => {
      const success = callbackArguments.shift();

      if (!success) {
        const start = index,  ///
              deleteCount = 1,
              deletedElement = array.splice(start, deleteCount).pop();  ///

        deletedElements.unshift(deletedElement);  ///
      }

      context = callbackArguments.shift();

      return continuation(context);
    });
  }, ...callerArguments, context, (context) => {
    return continuation(deletedElements, context);
  });
}

export function extract(array, callback, ...callerArguments) {
  let deletedElement = undefined; ///

  const continuation = callerArguments.pop(),
        context = callerArguments.pop();

  let index = -1;

  return some(array, (element, ...calleeArguments) => {
    index++;

    const continuation = calleeArguments.pop();

    let context = calleeArguments.pop();

    return callback(element, ...calleeArguments, context, (...callbackArguments) => {
      const success = callbackArguments.shift();

      if (success) {
        const start = index,  ///
              deleteCount = 1;

        deletedElement = array.splice(start, deleteCount).pop() ///

        context = callbackArguments.shift();
      }

      return continuation(success, context);
    });
  }, ...callerArguments, context, (success, context) => {
    return continuation(deletedElement, context);
  });
}

export function forwardsEvery(array, callback, ...callerArguments) {
  let success = true;

  const continuation = callerArguments.pop();

  let context = callerArguments.pop();

  const callerContext = context;  ///

  asynchronousForwardsForEach(array, (element, next, done) => {
    return callback(element, ...callerArguments, context, (...callbackArguments) => {
      success = callbackArguments.shift();

      if (!success) {
        context = callerContext;  ///

        done();

        return;
      }

      context = callbackArguments.shift();

      next();
    });
  }, () => {
    return continuation(success, context);
  });
}

export function backwardsEvery(array, callback, ...callerArguments) {
  let success = true;

  const continuation = callerArguments.pop();

  let context = callerArguments.pop();

  const callerContext = context;  ///

  asynchronousBackwardsForEach(array, (element, next, done) => {
    return callback(element, ...callerArguments, context, (...callbackArguments) => {
      success = callbackArguments.shift();

      if (!success) {
        context = callerContext;  ///

        done();

        return;
      }

      context = callbackArguments.shift();

      next();
    });
  }, () => {
    return continuation(success, context);
  });
}

export function forwardsForEach(array, callback, ...callerArguments) {
  const continuation = callerArguments.pop();

  let context = callerArguments.pop();

  asynchronousForwardsForEach(array, (element, next, done) => {
    return callback(element, ...callerArguments, context, (...callbackArguments) => {
      context = callbackArguments.shift();

      next();
    });
  }, () => {
    return continuation(context);
  });
}

export function backwardsForEach(array, callback, ...callerArguments) {
  const continuation = callerArguments.pop();

  let context = callerArguments.pop();

  asynchronousBackwardsForEach(array, (element, next, done) => {
    return callback(element, ...callerArguments, context, (...callbackArguments) => {
      context = callbackArguments.shift();

      next();
    });
  }, () => {
    return continuation(context);
  });
}

export function all(callbacks, ...callerArguemnts) {
  return every(callbacks, (callback, ...callbackArguments) => {
    return callback(...callbackArguments);
  }, ...callerArguemnts);
}

export function exists(callbacks, ...callerArguemnts) {
  return some(callbacks, (callback, ...callbackArguments) => {
    return callback(...callbackArguments);
  }, ...callerArguemnts);
}
